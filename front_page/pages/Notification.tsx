import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native'

import { Tab } from '@rneui/themed';

const Page = () => {
    const [index, setIndex] = React.useState(0);

    return (
        <>
            <Tab value={index} onChange={setIndex} dense>
                <Tab.Item>알림</Tab.Item>
                <Tab.Item>쪽지함</Tab.Item>
            </Tab>
        </>
    )
}

export default Page;

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
