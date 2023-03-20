// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();

const Screen = () => {

    /* 
    Values from API 
    */

    /* For Data fetch from server
      useEffect(() => {
        const fetchContentData = async () => {
          try {
              setLoading(true);
              const response = await axios.get();
              setPosts(response.data);
              setLoading(false);
          } catch (err) {
              
          }
      };
      
      fetchContentData();
      }, []);
      */

    const clickHandler = () => {
        Alert.alert("pressed!");
    }

    // 게시판
    const Main = ({ navigation }: any) => {
        return (
            <>
                <View
                    style={{
                        marginTop: 50,
                        alignItems: 'center'

                    }}>

                    <Text
                        style={{
                            marginTop: 30,
                            marginBottom: 30,
                        }}>
                        출결 기록 페이지
                    </Text>

                </View>
                <TouchableOpacity
                    /* 관리자에게만 보이게 권한 설정 */
                    activeOpacity={0.7}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.touchableOpacityStyle}>
                    <Icon name="qr-code" size={60} color="#000"
                        style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity>
 

            </>

        );
    }



    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
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

                    // only in iOS - headerBackTitleVisible='false'
                }}
            >
                <Stack.Screen
                    name="main"
                    component={Main}
                />



            </Stack.Navigator>

        </>
    );
}
export default Screen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f5f5f9',
    },
    container: {
        // for empty space in iOS
        height: 5
    },
    title: {
        fontSize: 24,
    },
    /* 밑에 두개 floating button style
    이거 왜 가운데에 안오냐 ....? ㅁㄹ...*/
    touchableOpacityStyle: {
        position: 'absolute',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
       backgroundColor: '#fff'
    },
});