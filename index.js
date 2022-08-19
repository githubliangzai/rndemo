/**
 * @format
 */

// import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ScrollView,
    FlatList,
    NativeModules
} from 'react-native';

// const ErrorUtils = require('ErrorUtils');
global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.log("出错了:"+isFatal + ", " + error);
});

const ProductItemViewModelManager = NativeModules.ProductItemViewModelManager;
const ToastAndroid =  NativeModules.ToastAndroid;
const isHermes = () => !!global.HermesInternal;
class RNHighScores extends React.Component {

    state = { productName: "" };

    render() {
        var product = this.props
        var mainImage = 'https://imgs.pupuapi.com/' + product.main_image
        console.log(mainImage)
        return (
            <View style={productCartStyles.container}>

                <View style={productCartStyles.leftContainer}>
                    <Image
                        style={productCartStyles.mainImageContainer}
                        source={{ uri: mainImage }}
                    />
                </View>

                <View style={productCartStyles.rightContainer}>
                    <Text style={productCartStyles.productTitle}>{product.name}</Text>
                    <Text style={productCartStyles.subTitle}>{product.sub_title}</Text>
                    <View style={productCartStyles.emptySpace}></View>
                    <View style={productCartStyles.tagContainer}>
                        <Text style={productCartStyles.tagView}>标签</Text>
                        <View style={productCartStyles.emptyTagSpace}></View>
                        <Text style={productCartStyles.tagView}>标签</Text>
                        <View style={productCartStyles.emptyTagSpace}></View>
                        <Text style={productCartStyles.tagView}>标签</Text>
                    </View>
                    <View style={productCartStyles.rightBottomContainer}>
                        <Text style={productCartStyles.productTitle}>价格:{product.price / 100.0}</Text>
                        <View style={productCartStyles.emptyTagSpace}></View>
                        <Text style={productCartStyles.productTitle}>数量:{product.amount}</Text>
                        <View style={productCartStyles.emptyTagSpace}></View>
                        <Button
                            title="加购"
                            style={productCartStyles.productAddButton}
                            // onPress={() => ProductItemViewModelManager.addProduct(product.product_id, product.amount)}
                            onPress={()=>{ToastAndroid.show("isHermes:"+isHermes(),ToastAndroid.SHORT)}}
                        />
                    </View>
                </View>

            </View>
        );
    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log(this.props.detailContent, 'this--->>componentWillReceiveProps');
    //     console.log(nextProps.detailContent, 'next--->>componentWillReceiveProps')
    //     productName = nextProps.name
    // }

}

const productCartStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F7F7F7',
        flexDirection: "row",
        removeClippedSubviews: true,
    },
    leftContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: 5,
        // backgroundColor: '#FF00FF'
    },
    mainImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 110,
        marginLeft: 5,
        // backgroundColor: '#FF0000'
    },
    rightContainer: {
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 10,
        paddingVertical: 10,
        // backgroundColor: '#FFFF00',
        flexShrink: 1
    },
    productTitle: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        color: '#333333',
        // backgroundColor: '#00FF00',
        fontSize: 14,
    },
    subTitle: {
        fontSize: 12,
        color: '#BBBBBB',
    },
    tagContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: '#EAFAF4',
        flexShrink: 1
    },
    tagView: {
        // marginHorizontal: 10,
        fontSize: 13,
        color: '#17B356',
        borderRadius: 15,
        borderColor: 'black',
        backgroundColor: '#EAFAF4',
        paddingHorizontal: 5
    },
    emptyTagSpace: {
        width: 10,
    },
    emptySpace: {

    },
    rightBottomContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#777777',
        // flexShrink: 0
    },
    amountText: {
        fontSize: 12,
        color: '#BBBBBB',
    },
    productAddButton: {
        
    }
});

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

class ScrollViewTest extends React.Component{
    render(){
        return (
            <ScrollView>
              <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Text style={{ fontSize: 96 }}>If you like</Text>
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Text style={{ fontSize: 96 }}>Scrolling down</Text>
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Text style={{ fontSize: 96 }}>What's the best</Text>
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Text style={{ fontSize: 96 }}>Framework around?</Text>
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Image source={logo} />
              <Text style={{ fontSize: 80 }}>React Native</Text>
            </ScrollView>
          )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  
  const FlatListBasics = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        <AbcTestView/>
      </View>
    );
  }
  
  export default FlatListBasics;

// Module name
AppRegistry.registerComponent('RNHighScores', () => RNHighScores);
AppRegistry.registerComponent('ScrollViewTest', () => ScrollViewTest);
AppRegistry.registerComponent('FlatListTest', () => FlatListBasics);

AppRegistry.registerComponent(appName, () => App);
