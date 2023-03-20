import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, Button } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

/* 각 sub-menu는 ~page로 끝나게 */
import MemberPage from './MemberList';
import AttendancePage from './Attendance';
import PersonalSetting from './PersonalSetting';


const Stack = createNativeStackNavigator();

/* functional execution */
const Screen = () => {
  // Profile Information update
  const ProfilePart = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row", //content 정렬
            padding: 10,
            backgroundColor: "white",
            alignItems: "center",

            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          <Image
            //for test, use logo imgs
            source={require('../img/logo.jpg')}
            style={{
              //{size}
              width: 80,
              height: 80,
              borderRadius: 50,
              margin: 5
            }}
          />
          <View>
            <Text
              /* 받아오는 값은 ${user_num} 이런식으로? */
              style={{
                color: '#000',
                fontSize: 16,
              }}>
              기수</Text>
            <Text
              style={{ color: '#000', fontSize: 16 }}>
              어떤 팀 이땡땡</Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                paddingTop: 10
              }}>
              Message</Text>
          </View>

        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }} />
      </>
    );
  }

  /* Error 해결 필요 */
  const ListPart = ({ navigation }: any) => {
    return (
      <>
        <Button
          title="Go to MemberList"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('MemberList');
          }}
        />
        <Button
          title="Go to Attendance"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.push('Attendance');
          }}
        />
        <Button
          title="Go to Personal setting"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.push('PersonalSetting');
          }}
        />
      </>
    );
  }

  //Profile 첫 화면
  const Main = ({ navigation }: any) => {
    return (
      <>
        <ProfilePart />
        {/*설정 목록 아래에 */}

        {/*
        <ListPart />
        왜 저기 들어가면 실행이 안되냐잉... */}
        <Button
          title="Go to Attendance"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.push('Attendance');
          }}
        />
        <Button
          title="Go to MemberList"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('MemberList');
          }}
        />
        <Button
          title="Go to Personal setting"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.push('Personal Setting');
          }}
        />
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

          ),
          /* 없어도 되지 않을까?*/
          //headerShown: false
          // only in iOS - headerBackTitleVisible='false'
        }}
      >
        <Stack.Screen
          name="Main"
          component={Main}
          options={
            {
              headerShown: true
            }
          }
        />
        <Stack.Screen
          name="Attendance"
          component={AttendancePage}

        />
        <Stack.Screen
          name="MemberList"
          component={MemberPage}

        />
        <Stack.Screen
          name="Personal Setting"
          component={PersonalSetting}
        />


      </Stack.Navigator>
    </>
  )
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
  /* 
  Profile item 
  프로필 사진, 이름, 전화번호, 이메일 스타일 지정필요
  */
});
