// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import ManagePage from './ManageAttendance';

const Stack = createNativeStackNavigator();

const Page = () => {

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

    
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                setLoading(true);
                const serverUrl = 'https://lucetemusical.com/api/v1/attendances';
                const response = await axios.get(serverUrl);
                setAttendanceData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('데이터를 가져오는 데 실패했습니다.', err);
            }
        };

        fetchAttendanceData();
    }, []);
    

    const clickHandler = () => {
        Alert.alert("pressed!");
    }
    
    // 게시판
    const Main = ({ navigation }: any) => {
        return (
            <>
                <View
                    //View for select the sub menu
                    /* 이거 뭔가 그럴듯해 보이게 스타일 지정하기!! */
                    style={
                        {
                            margin: 10,
                            flexDirection: 'row', //정렬 방향
                            justifyContent: 'space-around'
                        }
                    }>
                    <TouchableOpacity onPress={clickHandler}>
                        {/* 비활성화일때 텍스트 효과 바꾸기 */}
                        <Text style = {{color:'#B77DE4'}}>출석 확인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            navigation.navigate('출석기록확인');
                        }}>
                        <Text>출석 기록</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 50
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
                        출석이 확인되었습니다. (상황에 따라 값 변경)
                        {/* {message} 위 QR코드를 출결 관리자에게 보여주세요. */}
                    </Text>
                </View>
                <TouchableOpacity
                    /* 관리자에게만 보이게 권한 설정 */
                    activeOpacity={0.7}
                    onPress={() => {
                        navigation.navigate('출결관리');
                    }}
                    style={styles.touchableOpacityStyle}>
                    <View 
                    style={styles.floatingButtonStyle}
                    >
                        <Icon name="people" size={40} color="#000"/>
                    </View>
                    
                </TouchableOpacity>
 

            </>

        );
    }

    // 출결 목록 확인
    const CheckRecord = ({ navigation }: any) => {
        return (
            <View
            style = {{
                flex: 1
            }}>
                <View
                    //View for select the sub menu
                    style={
                        {
                            margin: 10,
                            flexDirection: 'row', //정렬 방향
                            justifyContent: 'space-around'
                        }
                    }>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {/* 비활성화일때 텍스트 효과 바꾸기 */}
                        <Text>출석 확인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={clickHandler}>
                        <Text style = {{color: '#B77DE4',}}>출석 기록</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                style = {{
                    flex: 1
                }}>
                    <View style = {{
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        {attendanceData.map((item, key) => (
                            <AttendanceRecord state = {item.state} time = {item.time}/>
                        ))}
                        
                    </View>
                    
                </ScrollView>
                <Button title="Go back" color={'#B77DE4'} onPress={() => navigation.goBack()} />

            </View>
        );
    }

    const AttendanceRecord = (props) => {
        
        var text = '';
        var color = '';

        switch (props.state){
            case '0' : //결석
                text = '결석';
                color = '#d0d0d0';
                break;
            case '1' : //출석
                text = '출석';
                color = '#B77DE4';
                break;
        }

        return (
            <>
                <View style = {styles.AttendanceRecordStyle}>
                    <Text>{props.time}</Text>
                    <View style = {[styles.AttendanceCheckStyle, {backgroundColor: color}]}>
                        <Text style = {{color: '#ffffff', fontWeight: 'bold'}}>{text}</Text>
                    </View>
                </View>
            </>
        )
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
                    name="출석 확인"
                    component={Main}
                />
                <Stack.Screen
                    name="출석기록확인"
                    component={CheckRecord}
                    options={
                        {
                            presentation: 'containedModal',
                            animation: 'none'
                        }
                    }
                />
                <Stack.Screen
                    name="출결관리"
                    component={ManagePage}
                />


            </Stack.Navigator>

        </>
    );
}
export default Page;


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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
       backgroundColor: '#fff',
       borderRadius: 100,
       width: 50,
       height: 50,
       alignItems: 'center',
       justifyContent: 'center',
       elevation: 5,
    },
    AttendanceRecordStyle: {
        backgroundColor: "#ffffff",
        height: 50,
        marginBottom: 8,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 5,
    },
    AttendanceCheckStyle: {
        width: 50,
        height: 25,
        backgroundColor: '#B77DE4',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/*
const attendanceData = [
        {id: 1, state: '1', time: '2023-09-23'},
        {id: 2, state: '0', time: '2023-09-23'},
        {id: 3, state: '1', time: '2023-09-23'},
        {id: 4, state: '1', time: '2023-09-23'},
        {id: 5, state: '0', time: '2023-09-23'},
    ];
*/