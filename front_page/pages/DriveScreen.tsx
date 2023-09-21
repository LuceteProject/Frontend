import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';


const deviceHeight = (Dimensions.get('window').height);
const deviceWidth = Dimensions.get('window').width;

const Screen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
          <WebView
              style={styles.webview}
              source={{ uri: 'https://www.google.com/' }} />
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    webview: {
      flex: 1,
      width: deviceWidth,
      height: deviceHeight,
    },
});

export default Screen;