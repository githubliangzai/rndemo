package com.rndemo0_68_0.demo;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Time: 2022/7/19
 * Author: leizuliang
 * Description:
 */
public class CommonModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;

    public CommonModule(ReactApplicationContext reactContext) {
        this.mReactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "CommonModule";
    }

    @ReactMethod
    public void startDemoActivity() {
        Intent intent = new Intent(mReactContext, DemoActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mReactContext.startActivity(intent);
    }
}
