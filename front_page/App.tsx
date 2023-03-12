// In App.js in a new project

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerToggleButton 
} from '@react-navigation/drawer';

import MemberList from './pages/MemberListMenu';
import BoardList from './pages/BoardList';
import PersonalSetting from './pages/PersonalSetting';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props : any) => {
  //이거 props API에서 받아온 값 넣으면 되는지 확인
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => console.log("help pressed")}
      />
    </DrawerContentScrollView>
  );
}


const DrawerGenerator = () =>{
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
      <DrawerGenerator />
    </NavigationContainer>
  );
}

export default App;