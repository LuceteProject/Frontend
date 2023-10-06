import {StyleSheet, Dimensions, Modal, Button, TouchableOpacity, Image, View} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import WebView from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "react-native-gesture-handler";


const deviceHeight = (Dimensions.get('window').height);
const deviceWidth = Dimensions.get('window').width;

const Screen = ({ navigation }: any) => {
  const [isWebViewVisible, setWebViewVisible] = useState(true);
  
  const handleCloseWebView = () => {
    setWebViewVisible(false);
  };

  const handleOpenWebView = () => {
    setWebViewVisible(true);
  };

  const onPageFocus = useCallback(() => {
    setWebViewVisible(true);
    }, []);

  useFocusEffect(onPageFocus);
  
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isWebViewVisible}
      >
        <WebView source={{ uri: `https://drive.google.com/drive/shared-with-me` }}  style={{ flex: 1,}}/>
        <Button title="닫기" onPress={handleCloseWebView} />
      </Modal>
    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default Screen;