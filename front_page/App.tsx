// In App.js in a new project

import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerToggleButton
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import MemberList from './pages/MemberList';
import BoardList from './pages/BoardList';
import PersonalSetting from './pages/PersonalSetting';
import TodoList from './pages/TodoList';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const CustomDrawerContent = (props: any) => {
  //이거 props API에서 받아온 값 넣으면 되는지 확인
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          //flexDirection: "row", //content 정렬
          padding: 30,
          backgroundColor: "white",
          alignItems: "center",

          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
<View
        style={{
          //flexDirection: "row", //content 정렬
          padding: 30,
          backgroundColor: "white",
          alignItems: "center",

          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
</View>
        <Text
          /* 받아오는 값은 ${user_num} 이런식으로? */
          style={{ color: '#000', fontSize: 14 }}>
          User Num </Text>
        <Text
          style={{ color: '#000', fontSize: 14 }}>
          User name</Text>
        <Text
          style={{ color: '#000', fontSize: 12 }}>
          Message</Text>
      </View>
      <DrawerItemList {...props} />

      <View>
        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
const Tabs = ()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="부원목록" component={MemberList} />
      <Tab.Screen name="캘린더" component={BoardList} />
      <Tab.Screen name="투두리스트" component={TodoList} />
      <Tab.Screen name="드라이브" component={BoardList} />
    </Tab.Navigator>
  );
}

const DrawerGenerator = () => {
  return (
    <>

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        defaultStatus='closed'

        screenOptions={{
          drawerType: 'back',
          drawerPosition: 'right',
          headerRight: () => <DrawerToggleButton />,
          headerLeft: () => false,
          drawerStyle: {
            /* drawer 열었을 때 배경 스타일
            참조 - https://reactnavigation.org/docs/drawer-navigator#drawercontentstyle
             */
            backgroundColor: '#c6cbef',
            width: 240,
          },
          drawerActiveTintColor: 'white'
        }}>
        <Drawer.Screen name="부원목록" component={MemberList} />
        <Drawer.Screen name="캘린더" component={MemberList} />
        <Drawer.Screen name="투두리스트" component={MemberList} />
        <Drawer.Screen name="드라이브" component={MemberList} />
        <Drawer.Screen name="게시판" component={BoardList} />
        <Drawer.Screen name="출석체크" component={MemberList} />
        <Drawer.Screen name="환경설정" component={PersonalSetting} />
        <Drawer.Group
          /* Optional key - 일반 회원과 관리자 화면 구분할때 사용 예정*/
          navigationKey='user'
          screenOptions={{ headerStyle: { backgroundColor: 'white' } }}
        >

          <Drawer.Screen name="출결관리" component={MemberList} />

        </Drawer.Group>

      </Drawer.Navigator>
    </>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

export default App;