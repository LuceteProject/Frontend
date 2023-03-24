import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Button, TextInput, Modal } from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();

const Screen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [text, onChangeText] = useState('');
    const [title, onChangeTitle] = useState('');

    /* mode 변경 어떻게 해야할지 아직 모르겠음 
    우선 DB에서 팀 일정만 불러오기
    */

    /* 
        const [mode, setMode] = useState(true);
    const changeMode = () => {
        let [items, setItems] = useState();
        //setMode(true? false:true);
        Alert.alert("pressed!");

    }
        useEffect(() => {
            changeMode();
            //list 받아오기
        }, [mode]);
    
    */

    const ListSample = (props: any) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                <Text>{props.time}</Text>
                <Text>{props.text}</Text>
            </View>
        );

    }
    const AddPlan = () => {
        const [date, setDate] = useState(new Date());
        const [place, setPlace] = useState('');
        const [memo, setMemo] = useState('');
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <Text> Write new plan </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTitle}
                        placeholder={'제목'}
                        value={title}
                    />
                </View>
                <View
                    id='inputDates'
                    style={{
                        margin: 10,
                        backgroundColor: '#000',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'space-around'

                    }}>
                    <TouchableOpacity
                        id='startTime'
                        onPress={() => {
                            return <DatePicker date={date} onDateChange={setDate} />
                        }}>
                        <Text>Sample Date</Text>
                        <Text>Sample Time</Text>
                    </TouchableOpacity>
                    <Icon name="arrow-forward" size={40} color="#fff" />
                    <TouchableOpacity
                        id='endTime'
                        onPress={() => {
                            return <DatePicker date={date} onDateChange={setDate} />
                        }}>
                        <Text>Sample Date2</Text>
                        <Text>Sample Time2</Text>
                    </TouchableOpacity>

                </View>
                <View
                    style={{
                        alignItems: 'stretch',
                        justifyContent: 'space-around',
                        padding: 10,
                    }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPlace}
                        placeholder={'장소'}
                        value={place}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setMemo}
                        placeholder={'메모'}
                        value={memo}
                    />
                </View>
            </Modal>

        )
    };

    const Main = ({ navigation }: any) => {
        return (
            <>
                <TouchableOpacity
                    // 일정 추가 버튼
                    activeOpacity={0.7}
                    onPress={() => {
                        setModalVisible(true);

                    }}
                    style={styles.touchableOpacityStyle}
                >
                    <Icon name="add-circle" size={60} color="#000"
                    //style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity>
                <Calendar
                    style={{
                        height: 300,

                    }}
                    enableSwipeMonths={true}
                    dayComponent={({ date, state }: any) => {
                        return (
                            <View>
                                <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                            </View>
                        );
                    }}
                    monthFormat={'yyyy년 MM월'}
                    markingType={'period'}
                    markedDates={{
                        // {} API에서 받아오기
                        ['2023-03-15']: { selected: true, disableTouchEvent: true, selectedColor: 'skyblue' }
                    }}
                    onDayPress={day => {
                        console.log('selected day', day);
                        () => {
                            // 아래 리스트에 일정 받아오기
                        };
                    }
                    }
                    onDayLongPress={day => {
                        console.log('long selected day', day);
                        // 일정 추가?
                    }}


                />

                {/* Agenda 오브젝트 쓰고 싶은데 어떻게 쓰는건지 공부해야함
                <Agenda
                    // The list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key has to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded

                    // Callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={month => {
                        console.log('trigger items loading');
                    }}
                    // Callback that fires when the calendar is opened or closed
                    onCalendarToggled={calendarOpened => {
                        console.log(calendarOpened);
                    }}
                    // Callback that gets called on day press
                    onDayPress={day => {
                        console.log('day pressed');
                    }}
                    // Callback that gets called when day changes while scrolling agenda list
                    onDayChange={day => {
                        console.log('day changed');
                    }}
                    // Initially selected day


                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // Specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => {
                        return <View />;
                    }}
                    // Specify how each date should be rendered. day can be undefined if the item is not first in that day
                    renderDay={(day, item) => {
                        return <View />;
                    }}
                    // Specify how empty date content with no items should be rendered
                    renderEmptyDate={() => {
                        return <View />;
                    }}
                    // Specify how agenda knob should look like
                    renderKnob={() => {
                        return <View />;
                    }}
                    // Override inner list with a custom implemented component

                    hideKnob={true}
                    // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                    showClosingKnob={false}
                    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                    markedDates={{

                    }}
                    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                    disabledByDefault={true}
                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
                    onRefresh={() => console.log('refreshing...')}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView

                /> */}

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

                <View>
                    <ListSample time='08:00' text='세부내용 1' />
                    <ListSample time='09:00' text='세부내용 2' />
                    <ListSample time='10:00' text='세부내용 3' />
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
                    name="Main"
                    component={Main}
                    options={{
                        title: 'Calendar',
                    }
                    }
                />
                <Stack.Screen
                    name="AddPlan"
                    component={AddPlan}
                    options={{
                        title: 'Calendar',
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
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        padding: 10,
    },
    searchbtn: {
        height: 40,
        width: '10%',
        margin: 12,
        marginLeft: 0,
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
        padding: 10,
    },
    /* 밑에 두개 floating button style
이거 왜 가운데에 안오냐 ....? ㅁㄹ...*/
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: '#fff'
    },
});
