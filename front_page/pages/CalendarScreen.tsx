import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Button, TextInput, Modal, FlatList } from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox, Dialog } from '@rneui/themed';

const Stack = createNativeStackNavigator();

const Screen = ({ navigation }: any) => {

    const [text, onChangeText] = useState('');

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

    const Main = () => {
        const [selected, setSelected] = useState('');
        // 일정 추가 Modal 창
        const [modalVisible, setModalVisible] = useState(false);
        const [modalVisibleButton, setModalVisibleButton] = useState(false);
        const DATA = [
            {
                id: 0,
                title: '전체',
            },
            {
                id: 1,
                title: '팀',
            },
        ];
        /* 일정 추가 -> 캘린더 선택 */
        //1) 캘린더 선택
        const [visibleCalType, setVisibleCalType] = useState(false);
        const toggleDialogCalType = () => {
            setVisibleCalType(!visibleCalType);
        };
        const [checked, setChecked] = useState(1);
        const [btnName, setBtnName] = useState('캘린더 선택');
        const afterButtonSelected = (index: string) => {
            setBtnName(index);
        }
        //2) 알림 설정
        const [btnAlarmName, setBtnAlarmName] = useState('알림 설정');
        const afterButtonAlarmSelected = (index: string) => {
            setBtnAlarmName(index);
        }
        const [visibleAlarmType, setVisibleAlarmType] = useState(false);
        const toggleDialogAlarmType = () => {
            setVisibleAlarmType(!visibleAlarmType);
        };

        const [title, onChangeTitle] = useState('');
        const [openStart, setOpenStart] = useState(false);
        const [openEnd, setOpenEnd] = useState(false);
        const [dateStart, setDateStart] = useState(new Date());
        const [dateEnd, setDateEnd] = useState(new Date());
        const [place, setPlace] = useState('');
        const [memo, setMemo] = useState('');

        return (
            <>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                    style={{
                        backgroundColor: '#F0EEEE',
                        height:'60%',
                        //width:'100%'
                    }}>

                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTitle}
                        placeholder={'제목'}
                        value={title}
                    />

                    <View
                        id='inputDates'
                        style={{
                            padding: 10,
                            backgroundColor: '#F0EEEE',
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            justifyContent: 'space-around',

                        }}>
                        <TouchableOpacity
                            // time 모듈 따로 빼서 정리 필요할듯
                            id='startTime'
                            style={{

                            }}
                            onPress={() => setOpenStart(true)}>
                            <Text style={styles.fontTitle}>시작일</Text>
                            <Text style={styles.fontNormal}>
                                {/*근데 어차피 이거 api로 넘겨줘야하는거라 포맷팅 하는 부분 따로 빼는게 나을지도 */}
                                {(dateStart.getMonth() + 1).toString()}월&nbsp;
                                {dateStart.getDate().toString()}일{'\n'}
                                {dateStart.getHours().toString()} : {dateStart.getMinutes().toString()}
                            </Text>
                        </TouchableOpacity>

                        <Icon name="arrow-forward" size={40} color="#000" style={{ paddingTop: 30, paddingBottom: 30 }} />
                        <TouchableOpacity
                            id='endTime'
                            onPress={() => {
                                setOpenEnd(true);
                            }}>
                            <Text
                                style={styles.fontTitle}>종료일</Text>
                            <Text
                                style={styles.fontNormal}>
                                {(dateEnd.getMonth() + 1).toString()}월&nbsp;
                                {dateEnd.getDate().toString()}일{'\n'}
                                {dateEnd.getHours().toString()} : {dateEnd.getMinutes().toString()}
                            </Text>
                        </TouchableOpacity>
                        <DatePicker
                            // one for start time
                            modal
                            open={openStart}
                            date={dateStart}
                            onConfirm={(date) => {
                                setOpenStart(false);
                                setDateStart(date);
                            }}
                            onCancel={() => {
                                setOpenStart(false);
                            }}
                        />
                        <DatePicker
                            // one for end time
                            modal
                            open={openEnd}
                            date={dateEnd}
                            onConfirm={(dateEnd) => {
                                //console.log(dateEnd);
                                setOpenEnd(false);
                                setDateEnd(dateEnd);
                            }}
                            onCancel={() => {
                                setOpenEnd(false);
                            }}
                        />
                    </View>
                    <View
                        id='notification'
                        style={{
                            margin: 10,
                            //backgroundColor: '#F0EEEE',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Button
                            title={btnName}
                            color='#D070fB' // color need
                            onPress={() => {
                                toggleDialogCalType();
                                console.log("pressed");
                            }}
                        />
                        <Dialog
                            isVisible={visibleCalType}
                            onBackdropPress={toggleDialogCalType}
                        >
                            <Dialog.Title title='캘린더 종류를 선택하세요' />
                            {['전체 캘린더', '팀 캘린더'].map((l, i) => (
                                <CheckBox
                                    key={i}
                                    title={l}
                                    containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    checked={checked === i + 1}
                                    onPress={() => { setChecked(i + 1); afterButtonSelected(l); }}
                                />
                            ))}

                            <Dialog.Actions>
                                <Dialog.Button
                                    title="확인"
                                    onPress={() => {
                                        //console.log(`Option ${checked} was selected!`);
                                        toggleDialogCalType();

                                    }}
                                />
                                <Dialog.Button title="취소" onPress={() => {
                                    setBtnName('캘린더 선택');
                                    toggleDialogCalType();
                                }} />
                            </Dialog.Actions>
                        </Dialog>
                        <Button
                            title={btnAlarmName}
                            color='#B77DE4' // color need
                            onPress={() => {
                                toggleDialogAlarmType();
                            }}
                        />
                        <Dialog
                            isVisible={visibleAlarmType}
                            onBackdropPress={toggleDialogAlarmType}
                        >
                            <Dialog.Title title="알림" />
                            {['일정 시작 시간', '10분 전', '1시간 전', '1일 전'].map((l, i) => (
                                <CheckBox
                                    key={i}
                                    title={l}
                                    containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    checked={checked === i + 1}
                                    onPress={() => { setChecked(i + 1); afterButtonAlarmSelected(l); }}
                                />
                            ))}

                            <Dialog.Actions>
                                <Dialog.Button
                                    title="확인"
                                    onPress={() => {
                                        //console.log(`Option ${checked} was selected!`);
                                        toggleDialogAlarmType();

                                    }}
                                />
                                <Dialog.Button title="취소" onPress={() => {
                                    toggleDialogAlarmType();
                                    setBtnAlarmName('알림 설정');
                                }} />
                            </Dialog.Actions>
                        </Dialog>


                    </View>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />

                    <View
                        style={{
                            alignItems: 'stretch',
                            justifyContent: 'space-around',
                            padding: 10,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="location" size={20} color="#000" />
                            <Text style={{ fontSize: 15 }}>장소</Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            onChangeText={setPlace}
                            placeholder={'장소'}
                            value={place}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="reader" size={20} color="#000" />
                            <Text style={{ fontSize: 15 }}>메모</Text>
                        </View>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            maxLength={100}
                            style={{
                                width: '90%',
                                marginLeft: 12,
                                //marginRight: 12,
                                borderRadius: 5,
                                backgroundColor: '#D9D9D9',
                            }}
                            onChangeText={setMemo}
                            onEndEditing={() => { }
                            }
                            placeholder={'메모'}
                            value={memo}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-end'}}>
                        <Button title='확인' color='#B77DE4' // color need 
                            onPress={
                                () => {
                                    Alert.alert('Success');
                                    setModalVisible(!modalVisible);
                                }
                        /* submit DATA to API */} />
                        <Button title='취소' color='#B77DE4' // color need
                            onPress={
                                () => { setModalVisible(!modalVisible); }} />
                    </View>

                </Modal>
                <TouchableOpacity
                    // FBA (일정 추가)
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
                        '2023-04-15': { selected: true, disableTouchEvent: true, selectedColor: 'skyblue' },
                        [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' }
                    }}
                    onDayPress={day => {
                        console.log('selected day', day);
                        setSelected(day.dateString);
                    }
                    }
                    onDayLongPress={day => {
                        console.log('long selected day', day);
                        setModalVisible(true);
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
                                    navigation.navigate('Notification');
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
                {/*
                <Stack.Screen
                    name="AddPlan"
                    component={AddPlan}
                    options={{
                        title: 'Calendar',
                    }
                    }
                />

            
                 */}


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
