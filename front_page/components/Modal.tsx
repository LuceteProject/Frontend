import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Button, TextInput, Modal, FlatList, Pressable } from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox, Dialog } from '@rneui/themed';
/* Modal 컴포넌트화 하기
[Modal]
로그인/비밀번호 - 아이디찾기, 중복확인, 비밀번호 확인, 가입신청 완료
클라우드 - 파일 다운로드 안내
클립보드 - 복사

*/
/* 정보 안내 */

const BasicModal = (text: string) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

/* 선택항목 
팀 선택, 기수, 역할 선택
투두리스트 항목 관리

*/
const CalendarAddModal = (props : any) => {
  const [modalVisible, setModalVisible] = useState(false);
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
  // 이거 한 묶음으로 관리
  const [title, onChangeTitle] = useState('');
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [place, setPlace] = useState('');
  const [memo, setMemo] = useState('');

  return (
    <Modal
      animationType="slide"
      visible={props.visible}

      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View>
        <Icon name="calendar" size={30} color="#000" />
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
          height: 150,
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
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
            }}>시작일</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'normal',
              marginTop: 15,
            }}>
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
            style={{
              fontSize: 23,
              fontWeight: 'bold',
            }}>종료일</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'normal',
              marginTop: 15,
            }}>
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
      <Button title='확인' onPress={
        () => {
          Alert.alert('Success');
          setModalVisible(!modalVisible);
        }
                        /* submit DATA to API */} />
      <Button title='취소' onPress={
        () => { setModalVisible(!modalVisible); }} />
    </Modal>
  );

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    margin: 12,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    //padding: 10,
},
});

export { BasicModal, CalendarAddModal };