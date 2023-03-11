//Nav Bar 사용해야 하는데 실행 오류
import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';

const MainMenu = ()=> {
  
    return (
      <View style={styles.container}>
        <Text>MainScreen</Text>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainMenu;