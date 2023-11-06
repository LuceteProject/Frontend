// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity } from 'react-native'
import { fetchData } from '../utils/APIs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { convertCodeToValue } from '../components/CodeConverter';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const Stack = createNativeStackNavigator();

const Page = () => {
    const [user, setUser] = useState();
    const [timer, setTimer] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState([]);
    const [allUserData, setAllUserData] = useState([]);
    const [dateFiltered, setDateFiltered] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        const fetchAllUserData = async () => {
            try {
                const responseAllUser = await axios.get('https://lucetemusical.com/api/v1/users');
                const userAllData = responseAllUser.data;
                setAllUserData(userAllData);
                console.log('유저데이터 가져오기 성공');
            }catch (error) {
                console.error('전체 유저 데이터를 가져오는 동안 오류 발생:', error);
            }
        };

        const fetchData = async () => {
            try {
                const responseAttendance = await axios.get('https://lucetemusical.com/api/v1/attendances');
                const attendanceData = responseAttendance.data;
                console.log('출결데이터 가져오기 성공');

                
                // 사용자 정보를 가져오는 모든 Axios 요청을 Promise.all로 묶습니다.
                const combinedData = await Promise.all(attendanceData.map(async (attendanceItem) => {
                const userId = attendanceItem.userId; // attendanceData에 user_id가 있다고 가정합니다
    
                try {
                    // URL 템플릿 리터럴을 사용하여 user_id를 포함시킵니다.
                    const responseUserInfo = await axios.get(`https://lucetemusical.com/api/v1/users/${userId}`);
                    const userData = responseUserInfo.data;
                    
        
                    // attendanceItem 및 userData를 병합합니다.
                    return {
                    ...attendanceItem,
                    ...userData,
                    };
                } catch (error) {
                    console.error('사용자 데이터를 가져오는 동안 오류 발생:', error);
                    return attendanceItem; // 오류가 발생한 경우 기존의 출결 항목을 사용합니다.
                }
                }));
        
                // 이제 combinedData에 출결 데이터와 사용자 정보가 모두 포함되어 있습니다.
                setAttendanceData(combinedData);
            } catch (error) {
                console.error('출결 데이터를 가져오는 동안 오류 발생:', error);
            }
        };
        
        const dateFilter = () => {
            function filterDate(e) {
                if(e.date.substring(0,10) === timeToString(timer).substring(0,10)) {
                    return true;
                }
            }
            const dateData = attendanceData.filter(filterDate);
            setDateFiltered(dateData);
        }
    
        fetchAllUserData();
        fetchData();
        dateFilter();
        console.log(timer);
        
    }, [timer]);

    useEffect(() => {
        currentTimer();
        console.log('currentTimer 호출됨');
    },[]);

    
      

    const currentTimer = () => {
        const date = new Date();
        setTimer(date);
    };

    const timeToString = (date) => {
        const year = String(date.getFullYear()).padStart(4, "0");
        const month = String(date.getMonth()+1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return (`${year}-${month}-${day}`);
    };

    const changeDate = (num) => {
        var newDay = new Date(timer);
        newDay.setDate(timer.getDate()+num);
        setTimer(newDay);
    }
    
    
    const clickHandler = () => {
        Alert.alert("pressed!");
    };

    const confirmDateModal = (date) => {
        setTimer(date);
        setDatePickerVisibility(false);
    };

    // 게시판
    const Main = ({ navigation }: any) => {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#ffffff'
                    }}>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmDateModal}
                        onCancel={() => {setDatePickerVisibility(false)}}
                        date={timer}
                    />
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
                        }}
                        onPress={() => {changeDate(-1)}}
                        >
                            <Icon name="caret-back-circle" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style = {{
                            height: "100%",
                            justifyContent: 'center'
                        }}
                        onPress={()=>{setDatePickerVisibility(true)}}
                        >
                        <Text style = {{color: '#ffffff', fontSize: 25, fontWeight: 'bold'}}>{timeToString(timer)}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                        style={{
                            marginLeft: 15
                        }}
                        onPress={() => {changeDate(1)}}
                        >
                            <Icon name="caret-forward-circle" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        
                    </View>
                    <ScrollView
                    style = {{
                        paddingHorizontal: 10
                    }}>
                        {dateFiltered.map((item, key) => (
                            <Record team = {convertCodeToValue(item.teamCode, 'team_code')} generation = {item.semester} name = {item.name} state = {convertCodeToValue(item.point, 'point')}/>
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
                        <StackedRecordBlock code = '0'/>
                        <StackedRecordBlock code = '1'/>
                        <StackedRecordBlock code = '2'/>
                        <StackedRecordBlock code = '3'/>
                        <StackedRecordBlock code = '4'/>
                        <StackedRecordBlock code = '5'/>
                        <StackedRecordBlock code = '6'/>
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
                }}>
                    <View style = {{flex:1, alignItems: 'center'}}>
                        <Text>{props.team}</Text>
                    </View>
                    <View style = {{flex:2, alignItems: 'center'}}>
                        <Text>{props.generation}기 {props.name}</Text>
                    </View>
                    <View style = {{flex:1, alignItems: 'center'}}>
                        <Text>{props.state}</Text>
                    </View>
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
                        <Text style = {{color: '#000000'}}>{props.generation}기 {props.name}</Text>
                    </View>
                </View>
            </>
        )
    }

    const StackedRecordBlock = (props) => {

        function filterCode(e) {
            if(e.teamCode === parseInt(props.code)) {
                return true
            }
        }

        const blockData = allUserData.filter(filterCode);

        return (
            <>
                <View
                style = {[styles.positionStyle]}>
                    <Text style = {{fontWeight:"bold", fontSize: 18, color: '#000000'}}>{convertCodeToValue(props.code, 'team_code')}</Text>
                </View>
                
                {blockData.map((item, key)=>(
                <StackRecord position = {convertCodeToValue(item.permissionCode, 'permission_code')} generation = {item.semester} name = {item.name}/>
                ))}
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

