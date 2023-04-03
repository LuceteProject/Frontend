import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

/* 사용할 컴포넌트 여기에서 import */
// Ex: import { NavigationContainer } from '@react-navigation/native';

/* functional execution */
// Screen for main Tab
// Page for each Tab screen
const App = () => {
	return 
        <>
        <View style={styles.centeredView}>{
        
                /*화면 내용 여기에 */
        

        }</View>
        </>
}


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
});

/* page return */
export default App;

/* 

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
          /* 받아오는 값은 ${user_num} 이런식으로? 
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
             
            backgroundColor: '#c6cbef',
            width: 240,
          },
          drawerActiveTintColor: 'white'
        }}>
        <Drawer.Group
          /* Optional key - 일반 회원과 관리자 화면 구분할때 사용 예정
          navigationKey='user'
          screenOptions={{ headerStyle: { backgroundColor: 'white' } }}
        >

          <Drawer.Screen name="출결관리" component={MemberScreen} />

        </Drawer.Group>

      </Drawer.Navigator>
    </>
  );
}
*/