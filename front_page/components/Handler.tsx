import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Notification from '../pages/Notification';
// error !
const NotificationHandler = ({ navigation }: any) => {
    console.log("pressed!!!");
    //navigation.navigate('Notifications');
}

export { NotificationHandler };

const styles = StyleSheet.create({
    /* 
    항목 이름 : {
            속성이름 : 값
    },

    컴포넌트 별 구분 가능
    */
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
});
