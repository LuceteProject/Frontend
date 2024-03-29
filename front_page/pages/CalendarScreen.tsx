import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchData } from '../utils/APIs';
import Icon from 'react-native-vector-icons/Ionicons';
import CalModal from '../components/CalendarModal';

const Stack = createNativeStackNavigator();

const Screen = ({ navigation }: any) => {
    const cal_type = {
        'All': { key: 'full', color: '#8F00FF', selectedDotColor: 'red' },
        'Team': { key: 'team', color: '#00C2FF', selectedDotColor: 'blue' },
        'Personal': { key: 'each', color: '#FFA800', selectedDotColor: 'blue' },
    }
    const [schedules, setSchedules] = useState([]);
    /* mode 변경 어떻게 해야할지 아직 모르겠음 
    우선 DB에서 팀 일정만 불러오기
    */
    /* API variables */
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchCalendarData = async () => {
            const userInfoJson = JSON.parse(await EncryptedStorage.getItem('user-info') || 'null');
            const userId = userInfoJson.user_id; //바꿔야함
            const response = await fetchData(`api/v1/schedules/userID/${userId}`); //확인 필요
            setSchedules(response);
        };
        fetchCalendarData();
        setLoading(false);
    }, []);


    const ListSample = (props: any) => {
        //const start = props.data.start.toISOString().split('T')[0];
        // date format
        return (
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: "#ffffff",
                }}>
                <Text
                    style={{
                        padding: 14,
                        fontSize: 15,
                        textAlign: 'left'
                    }}>
                    <Text style={{ padding: 2 }}>{props.data.title} : {props.data.content}{"\n"}</Text>
                    <Text style={{ padding: 2 }}>{props.data.start} ~ {props.data.end}</Text>
                </Text>
            </View>
        );
    }



    const Main = () => {
        const today = new Date();
        const [selected, setSelected] = useState(today.toISOString().split('T')[0]);
        /* 일정 추가 Modal 창 */
        const [modalVisible, setModalVisible] = useState(false);
        const [modalKey, setModalKey] = useState(0);
        // 모달 닫힐 때 modalVisible 값을 false로 업데이트
        const handleCloseModal = () => {
            setModalVisible(false);
            setModalKey((prevKey) => prevKey + 1); //for re-rendering
        };

        return (
            <>
                <TouchableOpacity
                    // FBA (일정 추가)
                    activeOpacity={0.5}
                    onPress={() => {
                        setModalVisible(true);
                        setModalKey((prevKey) => prevKey + 1); //for re-rendering
                    }}
                    style={styles.touchableOpacityStyle}
                >
                    <Icon name="add-circle" size={60} color="#B77DE4"/>
                </TouchableOpacity>
                <CalModal visible={modalVisible} key={modalKey} callback={handleCloseModal} />

                <Calendar
                    style={{
                        height: 360,
                    }}
                    theme={{
                        dotColor: '#B77DE4',
                        selectedDayBackgroundColor: '#B77DE4',
                        arrowColor: '#B77DE4',

                    }}
                    enableSwipeMonths={true}
                    /* 
                    dayComponent={({ date, state }: any) => {
                        return (
                            <TouchableOpacity>
                                <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    */
                    monthFormat={'yyyy년 MM월'}
                    markingType={'multi-dot'} //multi-period 표현문제 직면 뚜둥탁
                    markedDates={{
                        // {} API에서 받아오기
                        [selected]: {
                            selected: true,
                        },
                        // 아래는 sample 예시들
                        '2023-05-25': { dots: [cal_type.All], },
                        '2023-05-26': { dots: [cal_type.Team, cal_type.Personal] }
                    }}
                    onDayPress={day => {
                        //console.log('selected day', day);
                        setSelected(day.dateString);

                    }
                    }
                    onDayLongPress={day => {
                        //console.log('long selected day', day);
                        setSelected(day.dateString);
                        setModalVisible(true);
                    }}
                />
                {/* 추후 구현하기 - 모드 별로 보이는 일정 다르게
                <View
                    style={styles.modeButton}>
                    <Button
                        title="모드 변경"
                        onPress={() => {
                            Alert.alert('모드가 변경되었습니다.');
                            // API 데이터 다시 받아와서 흩뿌리기
                        }}
                    />

                </View>
                
                */}
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }} />

                    <View style={{ backgroundColor: '#fff' }}>
                        {schedules.map((item: any, index: number) => (
                            <ListSample key={index} data={item} />
                        ))}
                        {ListSample.length > 1 ? <Image source={require('../img/calendar.png')} style={styles.img} /> : <></>}
                    </View>
            </>
        );
    };

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerRight: () => (
                        <>
                            <TouchableOpacity
                                // Notification icon - components 분리할 수 있으면 뺴기
                                onPress={() => {
                                    navigation.push('Notification');
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
                    name="CalendarTab"
                    component={Main}
                    options={{
                        title: '캘린더',
                    }
                    }
                />
            </Stack.Navigator>

        </>
    );

}
/* page return */
export default Screen;

/* style 형식 지정은 여기에서 */
const styles = StyleSheet.create({
    /* 
    항목 이름 : {
            속성이름 : 값
    },

    컴포넌트 별 구분 가능
    */
    img: {
        width: 35,
        height: 35,

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modeButton: {
        marginTop: 5,
        height: 40,
        //justifyContent: 'space-around', //공백이 있는 양쪽정렬
        backgroundColor: '#fff',

    },
    viewstyle: {
        flexDirection: "row", //content 정렬
        padding: 10,
        backgroundColor: "white",
        alignItems: "flex-start",
    },
    btn: {
        width: 200,
        height: 30,
        backgroundColor: '#B77DE4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '90%',
        margin: 12,
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
        //padding: 10,
    },
    fontTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    fontNormal: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        zIndex: 100, // 다른 컴포넌트보다 위로
    },
    floatingButtonStyle: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
    },
});
