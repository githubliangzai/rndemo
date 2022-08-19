/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import CodePush from 'react-native-code-push';
import * as packageInfo from './package.json';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const CommonModule = NativeModules.CommonModule;

function codePushStatusDidChange(syncStatus) {
  switch (syncStatus) {
    case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
      console.log("提示", "CHECKING_FOR_UPDATE");
      break;
    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
      tconsole.log("提示", "DOWNLOADING_PACKAGE");
      break;
    case CodePush.SyncStatus.AWAITING_USER_ACTION:
      console.log("提示", "AWAITING_USER_ACTION");
      break;
    case CodePush.SyncStatus.INSTALLING_UPDATE:
      console.log("提示", "INSTALLING_UPDATE");
      break;
    case CodePush.SyncStatus.UP_TO_DATE:
      console.log("提示", "UP_TO_DATE");
      alert("当前已经是最新版本");
      break;
    case CodePush.SyncStatus.UPDATE_IGNORED:
      console.log("提示", "UPDATE_IGNORED");
      break;
    case CodePush.SyncStatus.UPDATE_INSTALLED:
      console.log("提示", "UPDATE_INSTALLED");
      alert("最新版本已安装")
      break;
    case CodePush.SyncStatus.UNKNOWN_ERROR:
      console.log("提示", "UNKNOWN_ERROR");
      break;
  }
}

function codePushDownloadDidProgress(progress) {
  console.log(`codePushDownloadDidProgress:${progress}`);
}

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

let App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //检查更新方法
  const checkForUpdate = () => {
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: {
        appendReleaseDescription: true, //是否显示更新description，默认为false
        descriptionPrefix: '更新内容：', //更新说明的前缀。 默认是” Description:
        mandatoryContinueButtonLabel: '立即更新', //强制更新的按钮文字，默认为continue
        mandatoryUpdateMessage: '', //- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
        optionalIgnoreButtonLabel: '稍后', //非强制更新时，取消按钮文字,默认是ignore
        optionalInstallButtonLabel: '后台更新', //非强制更新时，确认文字. Defaults to “Install”
        optionalUpdateMessage: '有新版本了，是否更新？', //非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.
        title: '更新提示', //要显示的更新通知的标题. Defaults to “Update available”.
      },}, codePushStatusDidChange.bind(this), codePushDownloadDidProgress.bind(this));
    // CodePush.sync({
    //   installMode: CodePush.InstallMode.IMMEDIATE,
    // },(status: CodePush.SyncStatus)=>{
    //   switch (status) {
    //     case CodePush.SyncStatus.UP_TO_DATE:{
    //       Alert.alert("提示","当前已经是最新版本")
    //     }
    //     break;
    //     case CodePush.SyncStatus.UPDATE_INSTALLED:{
    //       Alert.alert("提示","最新版本已安装")
    //     }
    //     break;

    //     default:
    //     break
    //   }

    //   console.log(status)
    // },()=>{

    // });
  };
  //清除更新
  const clear = () => {
    CodePush.clearUpdates();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step 1">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="Step 2">
            Run 'yarn start' in the command line under project root dir and then run application with IDE.
          </Section>
          <Section title="Step 3">
            Click r to apply the lastest edits.
          </Section>
          <Section title="项目名称">
            <Text style={styles.highlight}>{packageInfo.name}</Text>
          </Section>
          <Section title="版本号">
            <Text style={styles.highlight}>{packageInfo.version}</Text>
          </Section>
          <Section title="Version Info">
            <Button title='检查更新' onPress={checkForUpdate} />
            <Button title='清除更新' onPress={clear} />
          </Section>
          <View style={{height:10}}></View>
          <Button style={{ marginTop: 10 }} title="打开Demo" onPress={() => {
            CommonModule.startDemoActivity();
          }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
App = CodePush(codePushOptions)(App);
export default App;
