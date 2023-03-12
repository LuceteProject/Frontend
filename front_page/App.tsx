// In App.js in a new project

import React, { useEffect } from 'react';
import { View, Button, Text, TextInput, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();



function Feed() {
  //다른 파일 return 값으로 받아오는 방법 찾아보기
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Screen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}


function MyDrawer() {
  return (
    <>

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        defaultStatus='closed'
        screenOptions={{
          drawerType: 'back',
          drawerPosition: 'right',
          drawerStyle: {
            /* drawer 열었을 때 배경 스타일
            참조 - https://reactnavigation.org/docs/drawer-navigator#drawercontentstyle
             */
            backgroundColor: '#c6cbef',
            width: 240,
          },
          drawerActiveTintColor: 'white'
        }}>

        <Drawer.Screen name="부원목록" component={Feed} />
        <Drawer.Screen name="캘린더" component={Screen} />
        <Drawer.Screen name="투두리스트" component={Screen} />
        <Drawer.Screen name="드라이브" component={Screen} />
        <Drawer.Screen name="게시판" component={Screen} />
        <Drawer.Screen name="출석체크" component={Screen} />
        <Drawer.Screen name="환경설정" component={Screen} />
        <Drawer.Group
          /* Optional key - 일반 회원과 관리자 화면 구분할때 사용 예정*/
          navigationKey='user'
          screenOptions={{ headerStyle: { backgroundColor: 'white' } }}
        >

          <Drawer.Screen name="출결관리" component={Feed} />

        </Drawer.Group>

      </Drawer.Navigator>
    </>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default App;