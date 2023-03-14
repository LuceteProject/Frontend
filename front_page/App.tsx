// In App.js in a new project

import React, { useEffect } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

// Navigator
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

// 현재 사용하는 navigator
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <>
            <Icon name="notifications" size={30} color="#000"
              style={{
                // 둥근 원 테두리, 근데 배경 없으면 필요없을듯?
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: '#fff'
              }

              } />

          </>

        ),
        tabBarActiveTintColor: '#900',

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // icon URL : https://ionic.io/ionicons/
          if (route.name === 'Calender') {
            iconName = focused
              ? 'calendar'
              : 'calendar-outline';
          }
          else if (route.name === 'Board') {
            iconName = focused ? 'list' : 'list-outline';
          }
          else if (route.name === 'Todo') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          }
          else if (route.name === 'Drive') {
            iconName = focused ? 'cloud' : 'cloud-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          //@ts-ignore
          return <Icon name={iconName} size={size} color={color} />;
        },


      })}>
      <Tab.Screen name="Board" component={BoardList} />
      <Tab.Screen name="Todo" component={TodoList} />
      <Tab.Screen name="Calender" component={MemberList}/>
      <Tab.Screen name="Drive" component={TodoList} />
      <Tab.Screen name="Profile" component={BoardList} />


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
          drawerActiveTintColor: 'white',


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

/* main part */
const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

export default App;