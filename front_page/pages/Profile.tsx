import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

/* 사용할 컴포넌트 여기에서 import */
// Ex: import { NavigationContainer } from '@react-navigation/native';

/* functional execution */
const Profile = () => {
    // Profile Information update
    const PItem = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: "row", //content 정렬
                        padding: 30,
                        backgroundColor: "white",
                        alignItems: "center",

                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}>
                    <View
                        style={{
                            //flexDirection: "row", //content 정렬
                            padding: 30,
                            backgroundColor: "white",
                            alignItems: "center",

                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}>
                    </View>
                    <Text
                        /* 받아오는 값은 ${user_num} 이런식으로? */
                        style={{ color: '#000', fontSize: 14 }}>
                        User Num </Text>
                    <Text
                        style={{ color: '#000', fontSize: 14 }}>
                        User name</Text>
                    <Text
                        style={{ color: '#000', fontSize: 12 }}>
                        Message</Text>
                </View>
            </>
        );
    }

    const List = (props: any) => {
        return (
            <>
            
            </>
        );
    }


    return (
        <>
            <PItem />
        </>
    )
}


/* style 형식 지정은 여기에서 */
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
    /* 
    Profile item 
    프로필 사진, 이름, 전화번호, 이메일 스타일 지정필요
    */
});

/* page return */
export default Profile;
