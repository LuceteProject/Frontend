// tslint:disable:no-empty
import React, { useEffect, useState } from 'react'

import { StyleSheet, Image, ScrollView, Text, View, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { List } from '@ant-design/react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Icon from 'react-native-vector-icons/Ionicons';
/* 
List 항목을 좀 더 깔끔하게 표현하기 위해 만든 컴포넌트
List.Item List.Item.Brief 대신 사용 
*/
const Item = List.Item
const Brief = Item.Brief
const Stack = createNativeStackNavigator();


/* Page */
const Page = () => {
  /* values from API 
  유저 정보에서 받아올 내용 : 기수/이름/팀/역할/상메/번호/메일 
  */
  //const [items, setItems] = useState([]);

  /* 분리
  const itemHandler= () => {
    let item_ = [...items];
  
    setItems(item_);
  };
  
  */

  /* For Data fetch from server
  useEffect(() => {
    const fetchContentData = async () => {
      try {
          
      } catch (err) {
          
      }
  };
  
  fetchContentData();
  }, []);
  */

  const Main = () => {
    return (
<>
      <ScrollView
        style={styles.background}
        // Todo : 아래 내용은 나도 찾아봐야함
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        <List renderHeader={'회장'}>
          <Item
            // 하나의 Item에 한 명씩 정보 불러오기
            // thumb : image link, extra : 오른쪽에 sub로 들어가는 text, multipleLine : 여러줄 가능
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            extra={
              <View>
                <Brief style={{ textAlign: 'right' }}>01012345678</Brief>
                <Brief style={{ textAlign: 'right' }}>mail@gmail.com</Brief>
              </View>}
            // View Component 안에 <Brief> 커스텀 컴포넌트 사용해 추가내용 넣음
            multipleLine>
            기수 이름
            <Brief>회장</Brief>
            <Brief style={{ color: 'blue' }}>"상태메시지"</Brief>
          </Item>


        </List>
        <List renderHeader={'극본팀' /*팀이름 여기에*/}>
          <Item
            // 하나의 Item에 한 명씩 정보 불러오기
            // thumb : image link, extra : 오른쪽에 sub로 들어가는 text, multipleLine : 여러줄 가능
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            extra={<View>
              <Brief style={{ textAlign: 'right' }}>01012345678</Brief>
              <Brief style={{ textAlign: 'right' }}>mail@gmail.com</Brief>
            </View>}
            // View Component 안에 <Brief> 커스텀 컴포넌트 사용해 추가내용 넣음
            multipleLine>
            기수 이름
            <Brief>팀장</Brief>
            <Brief style={{ color: 'blue' }}>"상태메시지"</Brief>
          </Item>

          <Item
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            extra={<View>
              <Brief style={{ textAlign: 'right' }}>01012345678</Brief>
              <Brief style={{ textAlign: 'right' }}>mail@gmail.com</Brief>
            </View>}
            multipleLine>
            기수 이름
            <Brief>무슨 팀</Brief>
            <Brief style={{ color: 'blue' }}>"길이 제한 20자?"</Brief>
          </Item>

        </List>

      </ScrollView>
      <View
        style={{ paddingBottom: 20 }}>
      </View>
    </>
    );
  }
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <>
              <TouchableOpacity
                // Notification icon - components 분리할 수 있으면 뺴기
                onPress={() => {
                  // 왜 이건 눌리지
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
          )
          // only in iOS - headerBackTitleVisible='false'
        }}
      >
        <Stack.Screen
          name="Member List"
          component={Main}
        />

      </Stack.Navigator>
    </>
  );
}


export default Page;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },

  container: {
    // for empty space in iOS
    height: 10
  },
});