import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Button, TextInput, Modal, FlatList, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox, Dialog } from '@rneui/themed';
import { Pressable } from 'react-native';

const CalModal = ({ visible, callback }: any) => {
    const today = new Date();
    const [selected, setSelected] = useState(today.toISOString().split('T')[0]);
    // 일정 추가 Modal 창
    const [modalVisible, setModalVisible] = useState(visible);


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

    useEffect(() => {
        // 일정 추가 버튼 눌렀을때, 일정 시각이 선택한 날짜로 바뀌게 변경
        // 2023-05-11T14:09:12.825Z 형식의 new Date() 문자열 concat해서 2023-05-11만 남게 하면 될듯?
        setDateStart(new Date(selected));
        setDateEnd(new Date(selected));

    }, [selected]);

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={callback}
            style={{
                backgroundColor: '#F0EEEE',
                height: '60%',
                //width:'100%'
            }}>
            <TextInput
                style={{
                    padding: 7
                }}
            />
            <View style={{marginTop: 35}}></View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                placeholder={'제목'}
                value={title}
            />

            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
            }}/>
            <View
                id='inputDates'
                style={{
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    
                    alignItems: 'center',
                    justifyContent: 'space-around',

                }}>
                <TouchableOpacity
                    // time 모듈 따로 빼서 정리 필요할듯
                    id='startTime'
                    style={{height: 140, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => setOpenStart(true)}>
                    <Text style={styles.fontTitle}>시작일</Text>
                    <Text style={styles.fontNormal}>
                        {/*근데 어차피 이거 api로 넘겨줘야하는거라 포맷팅 하는 부분 따로 빼는게 나을지도 */}
                        {(dateStart.getMonth() + 1).toString()}월&nbsp;
                        {dateStart.getDate().toString()}일
                    </Text>
                    <Text style={styles.fontNormal}>
                        {dateStart.getHours().toString()} : {dateStart.getMinutes().toString()}
                    </Text>
                </TouchableOpacity>

                <Icon name="arrow-forward" size={40} color="#000" style={{ paddingTop: 30, paddingBottom: 30, right: 2}} />
                <TouchableOpacity
                    id='endTime'
                    style={{height: 140, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                        setOpenEnd(true);
                    }}>
                    <Text style={styles.fontTitle}>종료일</Text>
                    <Text style={styles.fontNormal}>
                        {(dateEnd.getMonth() + 1).toString()}월&nbsp;
                        {dateEnd.getDate().toString()}일
                    </Text>
                    <Text style={styles.fontNormal}>
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
                    marginLeft: 35,
                    marginRight: 35,
                    marginBottom: 10,
                    paddingBottom: 10,
                    //backgroundColor: '#F0EEEE',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <Button
                    title={btnName}
                    color='#B77DE4' // color need
                    
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
                    
                }}>
                <View style={{ flexDirection: 'row',
                    paddingTop: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 20,
                    }}>
                    <Icon name="location" size={25} color="#000" />
                    <Text style={{ fontSize: 20 }}>장소</Text>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setPlace}
                    placeholder={'장소'}
                    value={place}
                />
                <View style={{ 
                    flexDirection: 'row',
                    paddingTop: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 20,
                    }}>
                    <Icon name="reader" size={25} color="#000" />
                    <Text style={{ fontSize: 20 }}>메모</Text>
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
            <View style={{padding: 20}}></View>
            <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-around',
                flex: 1,
                alignItems: 'flex-end'}}>

                <Pressable
                    onPress={callback}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#B77DE4' : 'white',
                        }, styles.btn]}>
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>취소</Text>
                </Pressable>
                <Pressable
                    onPress={
                        () => {
                            Alert.alert('Success');
                            //setModalVisible(!modalVisible);
                            callback();
                        }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#B77DE4' : 'white',
                        }, styles.btn]}>
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>확인</Text>
                </Pressable>


            </View>

        </Modal>
    )
}

export default CalModal;


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
        top: 20,
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
        height: 44,
        backgroundColor: '#B77DE4',
        alignItems: 'center',
        justifyContent: 'center'
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
        paddingTop: 4,
        paddingBottom: 4
    },
    fontNormal: {
        fontSize: 18,
        fontWeight: 'normal',
        paddingTop: 4,
        paddingBottom: 4
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
