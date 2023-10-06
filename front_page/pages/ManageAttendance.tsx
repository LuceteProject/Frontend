// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity } from 'react-native'
import { fetchData } from '../utils/APIs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {attendances} from '../types';


const Stack = createNativeStackNavigator();

const Page = () => {
    const [user, setUser] = useState();
    //const [attendanceData, setAttendanceData] = useState([]);

    useEffect(()=> {
        const getUser = async () => {
            const userInfoJson = JSON.parse(await EncryptedStorage.getItem('user-info') || 'null');
            setUser(userInfoJson.user_id);
        }
        getUser();
    }, []);

    
    /*
    const fetchAttendanceData = async () => {
        try {
            const serverUrl = 'https://lucetemusical.com/api/v1/attendances';

            //Get 요청 보내기
            const response = await fetch(serverUrl);

            // HTTP 응답 코드를 확인, 데이터 가져오기
            if (response.ok) {
                const data = await response.json();
                setAttendanceData(data); // 데이터를 상태에 저장
            } else {
                // 에러 처리
                console.error('데이터를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('데이터를 가져오는 데 오류가 발생했습니다.', error);
        }
    };

    useEffect(() => {
        fetchAttendanceData(); // 페이지가 로드될 때 한 번 호출
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
                        flex: 1,
                        backgroundColor: '#ffffff'
                    }}>
                    <View
                    style = {{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        padding:10,
                    }}>
                        <Text style = {{fontWeight: 'bold'}}>출결기록 관리</Text>
                        <View 
                        style = {{
                            flexDirection: 'row',
                        }}>
                            <PageBtn title = "일일출결관리"/>
                            <PageBtn title = "누적출결관리"
                            navigation = {()=> {navigation.navigate('stackedAttend')}}
                            />
                        </View>
                        
                    </View>
                    <View 
                    style = {{
                        height: 55,
                        backgroundColor: '#B77DE4',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity 
                        style={{
                            marginRight: 15
                        }}>
                            <Icon name="caret-back-circle" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        
                        <Text style = {{color: '#ffffff', fontSize: 25, fontWeight: 'bold'}}>2023-09-23</Text>
                        <TouchableOpacity
                        style={{
                            marginLeft: 15
                        }}>
                            <Icon name="caret-forward-circle" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        
                    </View>
                    <ScrollView
                    style = {{
                        paddingHorizontal: 10
                    }}>
                        {attendanceData.map((item, key) => (
                            <Record team = {item.id} generation = {item.userId} name = {item.point} state = {item.date}/>
                        ))}
                    </ScrollView>
                    

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

    const StackedAttend = ({ navigation }: any) => {
        return(
            <>
                <ScrollView>
                    <View
                    style = {{
                        flex: 1,
                        backgroundColor: '#ffffff'
                    }}>
                        <View
                        style = {{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            padding:10,
                            borderBottomWidth: 1
                        }}>
                            <Text style = {{fontWeight: 'bold'}}>출결기록 관리</Text>
                            <View 
                            style = {{
                                flexDirection: 'row',
                            }}>
                                <PageBtn 
                                title = "일일출결관리"
                                navigation = {() => navigation.pop()}/>
                                <PageBtn title = "누적출결관리"/>
                            </View>
                            
                            
                        </View>
                        <View
                        style = {[styles.positionStyle]}>
                            <Text style = {{fontWeight:"bold", fontSize: 18, color: '#000000'}}>회장</Text>
                        </View>
                        
                        {attendanceData.map((item, key)=>(
                        <StackRecord position = {item.id} point = {item.point}/>
                        ))}
                        
                        <View
                        style = {[styles.positionStyle]}>
                            <Text style = {{fontWeight:"bold", fontSize: 18, color: '#000000'}}>극본팀</Text>
                        </View>
                        <View
                        style = {[styles.positionStyle]}>
                            <Text style = {{fontWeight:"bold", fontSize: 18, color: '#000000'}}>무대팀</Text>
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }

    const PageBtn = (props) => {
        return (
            <>
                <TouchableOpacity 
                style = {{
                    borderWidth: 2,
                    borderColor: '#B77DE4',
                    padding: 3,
                    paddingHorizontal: 10,
                    borderRadius: 100, 
                    marginRight: 5, 
                }}
                onPress={props.navigation}>
                    <Text style = {{color: '#B77DE4', fontWeight: 'bold'}}>{props.title}</Text>
                </TouchableOpacity>
            </>
        )
    }

    const Record = (props) =>{
        return(
            <>
                <View
                style = {{
                    height: 60,
                    borderBottomColor: '#d0d0d0',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <Text>{props.team}</Text>
                    <Text>{props.generation}기 {props.name}</Text>
                    <Text>{props.state}</Text>
                </View>
            </>
        )
    }

    const StackRecord = (props) => {
        return (
            <>
                <View
                style = {{
                    flexDirection: 'row',
                    padding: 20,
                    paddingBottom: 10,
                }}>
                    <View 
                    style = {{
                        borderRadius: 100,
                        backgroundColor: '#d0d0d0',
                        height: 60,
                        width: 60
                    }}/>
                    <View 
                    style = {{
                        flexDirection:'column',
                        padding: 10,
                        alignItems: 'stretch',
                        flex: 1
                    }}>
                        <Text style = {{color: '#B77DE4', fontSize: 15}}>{props.position}</Text>
                        <View
                        style = {{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-between'
                        }}>
                            <Text style = {{color: '#000000'}}>{props.generation}기 {props.name}</Text>
                            <Text style = {{color: '#000000', right: 0}}>퇴출점수: {props.point}</Text>
                        </View>
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
                    name="main"
                    component={Main}
                />

                <Stack.Screen
                    name="stackedAttend"
                    component={StackedAttend}
                    options={
                        {
                            animation: 'none'
                        }
                    }
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
    positionStyle: {
        borderBottomColor: '#d0d0d0',
        borderBottomWidth: 1,
        padding: 10,
        paddingTop:15,
        paddingBottom: 5
    }
});


const attendanceData = [
    {id: 1, state: '출결완료', team: '팀 루케테', generation: '1', name: '홍길동', position: '팀장', point: '3'},
    {id: 2, state: '무단결석', team: '팀 리액트', generation: '3', name: '김땡땡', position: '팀원', point: '0'},
    {id: 3, state: '병결', team: '팀 루케테', generation: '1', name: '박출결', position: '팀원', point: '1'},
    {id: 4, state: '출결완료', team: '팀 안드로이드', generation: '2', name: '최하눌', position: '팀장', point: '13'},
    {id: 5, state: '출결완료', team: '팀 리액트', generation: '3', name: '5글자이름', position: '팀원', point: '0'},
];
