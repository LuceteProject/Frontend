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

/* Menu 이름은 ~Screen으로 끝나게 */
import BoardScreen from './pages/BoardScreen';
import TodoScreen from './pages/TodoScreen';
import ProfileScreen from './pages/ProfileScreen';
import CalendarScreen from './pages/CalendarScreen';
// import DriveScreen from './pages/DriveScreen';
/* 나중에 지워야 할 것 */
import MemberScreen from './pages/MemberList';
import Notification from './pages/Notification';

//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { notification } from 'antd';
import SizeContext from 'antd/es/config-provider/SizeContext';
import { fonts } from '@rneui/base';

// Navigator
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();



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
        headerShown: false,
        tabBarActiveTintColor: '#D070FB', //point color?
        // https://reactnavigation.org/docs/bottom-tab-navigator/#example
        // tabBarStyle 항목 보면 됨 (아마 default 값이 50인듯?)
        tabBarStyle: { height: 80, justifyContent: 'center' },
        tabBarLabelStyle: {
          position: 'absolute',
          top: 0,
          bottom: 4,
          left: 0,
          right: 0,
          fontSize: 14,
          textAlignVertical: 'bottom',
        },
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
          return <Icon name={iconName} size={40} color={color} />;
        },
        // 각 스크린 안에 Stack navigator 추가하기

      })}>
      {/* 달력 우선 부원목록 연결해둠 */}
      <Tab.Screen name="Board" component={BoardScreen} />
      <Tab.Screen name="Todo" component={TodoScreen} />
      <Tab.Screen name="Calender" component={CalendarScreen} />
      <Tab.Screen name="Drive" component={Notification} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
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