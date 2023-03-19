// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();

const Screen = () => {

    /* 
    Values from API 
    */
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

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
                    //View for select the sub menu
                    style={
                        {
                            margin: 10,
                            flexDirection: 'row', //정렬 방향
                            justifyContent: 'space-around'
                        }
                    }>
                    <TouchableOpacity onPress={clickHandler}>
                        {/* 비활성화일때 텍스트 효과 바꾸기 */}
                        <Text>출석 확인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clickHandler}>
                        <Text>출석 기록</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        marginTop: 50,
                        alignItems: 'center'

                    }}>
                    <QRCode
                        //value값을 api에 맞춰서 setting 가능!! -> 출석 방식에 맞추면 될듯
                        value="http://www.naver.com"
                        //size를 화면 비율에 맞출 수 있는 방법? 
                        size={250}
                        logoBackgroundColor='transparent'
                    />
                    <Text
                        style={{
                            marginTop: 30,
                            marginBottom: 30,
                        }}>
                        출석이 확인되었습니다. (상황에 따라 값 변경)</Text>
                    <Button
                        title='내 출석 기록 확인(삭제예정)'
                        onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            navigation.navigate('출석기록확인');
                          }}
                    />
                </View>


            </>

        );
    }

    // 출결 목록 확인
    const CheckRecord = ({ navigation }: any) => {
        return (
            <View>
                <Text>출석 기록 확인</Text>
                <Button title="Go back" onPress={() => navigation.goBack()} />

            </View>
        );
    }

    return (
        <>
            <Stack.Navigator
                screenOptions={{
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
                    name="출석 확인"
                    component={Main}
                />
                <Stack.Screen
                    name="출석기록확인"
                    component={CheckRecord}
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

});