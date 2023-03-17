import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

/* functional execution */
const ProfileScreen = () => {
    // Profile Information update
    const ProfileScreen = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: "row", //content 정렬
                        padding: 10,
                        backgroundColor: "white",
                        alignItems: "center",

                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}>
                    <Image
                    //for test, use logo imgs
                    source={require('../img/logo.jpg')}
                    style={{
                       //{size}
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        margin: 5
                    }}
                    />
                    <View>
                    <Text
                        /* 받아오는 값은 ${user_num} 이런식으로? */
                        style={{ 
                            color: '#000', 
                            fontSize: 16,
                            }}>
                        기수</Text>
                    <Text
                        style={{ color: '#000', fontSize: 16 }}>
                        어떤 팀 이땡땡</Text>
                    <Text
                        style={{ 
                            color: '#000', 
                            fontSize: 14 ,
                            paddingTop: 10
                            }}>
                        Message</Text>
                    </View>
                    
                </View>
                <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }} />
            </>
        );
    }

    const ListScreen = (props: any) => {
        return (
            <>

            </>
        );
    }

    const Main = ({ navigation }: any) => {
        return (
            <>
                <ProfileScreen />
                {/*설정 목록 아래에 */}
            </>);
    }

    return (
        <>
<Stack.Navigator
        screenOptions={{
          /* 없어도 되지 않을까?
          headerRight: () => (
            <>
              <TouchableOpacity
                // Notification icon - components 분리할 수 있으면 뺴기
                onPress={() => {
                  Alert.alert("pressed!");
                }}>
                <Icon name="notifications" size={30} color="#000"
                  style={{
                    // 둥근 원 테두리, 근데 배경 없으면 필요없을듯?
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </>

          )
          */
          //headerShown: false
          // only in iOS - headerBackTitleVisible='false'
        }}
      >
        <Stack.Screen
          name="Profile"
          component={Main}
        />


      </Stack.Navigator>
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
export default ProfileScreen;
