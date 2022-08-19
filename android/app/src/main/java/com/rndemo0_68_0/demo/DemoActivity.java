package com.rndemo0_68_0.demo;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.facebook.react.ReactRootView;
import com.google.gson.Gson;
import com.rndemo0_68_0.MainApplication;
import com.rndemo0_68_0.R;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Time: 2022/7/19
 * Author: leizuliang
 * Description:
 */
public class DemoActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private ProductAdapter mProductAdapter;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);
        mRecyclerView = findViewById(R.id.rv);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mProductAdapter = new ProductAdapter(this, new ArrayList<>());
        mRecyclerView.setAdapter(mProductAdapter);
        mReactRootView = (ReactRootView) ((LinearLayout)findViewById(R.id.ll_rct)).getChildAt(0);
        mReactRootView.startReactApplication(MainApplication.app.getReactNativeHost().getReactInstanceManager(), "FlatListTest");
        findViewById(R.id.tv_title).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "click title", Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    protected void onDestroy() {
        mReactRootView.unmountReactApplication();
        super.onDestroy();
    }

    @Override
    protected void onResume() {
        super.onResume();
        final List<Product> products = new ArrayList<>();
//        for (int i = 0; i < 100; i++) {
//            Product product = new Product();
//            products.add(product);
//        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                String json = null;
                try {
                    InputStream inputStream = getAssets().open("products.json");
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                    byte[] buff = new byte[1024];
                    int len = 0;
                    while ((len = inputStream.read(buff)) != -1) {
                        byteArrayOutputStream.write(buff, 0, len);
                    }
                    json = byteArrayOutputStream.toString();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                Gson gson = new Gson();
                final ProductResponse productResponse = gson.fromJson(json, ProductResponse.class);
                final List<Product> list = productResponse.data.products;
                final int listSize = list.size();
                for (int i = 0; i < 1000; i++) {
                    int j = i % listSize;
                    Product p = list.get(j).copy();
                    p.name = i + p.name;
                    products.add(p);
                }
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mProductAdapter.setProducts(products);
                    }
                });
            }
        }).start();


    }

    public static class Product {
        public String product_id;
        public String store_product_id;
        public String main_image;
        public String name;
        public String sub_title;
        public int price;
        public int amount;

        public Bundle toBundle() {
            Bundle bundle = new Bundle();
            bundle.putString("product_id", product_id);
            bundle.putString("store_product_id", store_product_id);
            bundle.putString("main_image", main_image);
            bundle.putString("name", name);
            bundle.putString("sub_title", sub_title);
            bundle.putInt("price", price);
            bundle.putInt("amount", amount);
            return bundle;
        }

        public Product() {

        }

        public Product copy() {
            Product p = new Product();
            p.product_id = product_id;
            p.store_product_id = store_product_id;
            p.main_image = main_image;
            p.name = name;
            p.sub_title = sub_title;
            p.price = price;
            p.amount = amount;
            return p;
        }
    }

    public static class Data {
        private List<Product> products;
    }

    public static class ProductResponse {
        private Data data;
    }


    public static class ProductAdapter extends RecyclerView.Adapter<ProductVH> {

        private Context mContext;
        private List<Product> mProducts;
        private LayoutInflater mLayoutInflater;

        public ProductAdapter(Context context, List<Product> products) {
            this.mContext = context;
            this.mProducts = products;
            mLayoutInflater = LayoutInflater.from(mContext);
        }

        public void setProducts(List<Product> products) {
            this.mProducts = products;
            notifyDataSetChanged();
        }

        @NonNull
        @Override
        public ProductVH onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            ProductVH productVH = new ProductVH(mLayoutInflater.inflate(R.layout.rv_item_product, null));
            productVH.reactRootView.startReactApplication(MainApplication.app.getReactNativeHost().getReactInstanceManager(), "RNHighScores");
            return productVH;
        }

        @Override
        public void onBindViewHolder(@NonNull ProductVH holder, int position) {
            holder.reactRootView.setAppProperties(mProducts.get(position).toBundle());
        }

        @Override
        public int getItemCount() {
            return mProducts.size();
        }
    }

    public static class ProductVH extends RecyclerView.ViewHolder {
        public ReactRootView reactRootView;

        public ProductVH(@NonNull View itemView) {
            super(itemView);
            reactRootView = (ReactRootView) ((LinearLayout) itemView.findViewById(R.id.ll_rct)).getChildAt(0);
        }
    }

}
