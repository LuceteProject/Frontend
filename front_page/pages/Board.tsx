// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button } from 'react-native'
import { List, NoticeBar } from '@ant-design/react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Option } from 'antd/es/mentions';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = List.Item
const Brief = Item.Brief

const Stack = createNativeStackNavigator();

const Board = () => {

  /* 
  Values from API 
  
  */
  const [list, setList] = useState([]);

  //sample data
  const DATA = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  const clickHandler = () => {
    ;
  }

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

  // 게시판
  const BoardList = ({ navigation }: any) => {
    return (
      <>
        <ScrollView
          style={styles.background}
          // 이게 뭔지 나도 찾아봐야함
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <NoticeBar
            /** 중요 공지사항 가장 위쪽에 올리는 용도로 사용
             * mode='link' 다른 게시글에 연결 가능
             * marqueeProps 속성 설정
             * 
             * from 'ant-design'
             */
            mode='link'
            marqueeProps={{ loop: true, style: { fontSize: 15, color: 'black' } }}>
            여러분 공지 좀 읽으세요~~
          </NoticeBar>
          <List renderHeader={'게시판 이름 여기'}>
            <Item
              extra={<Brief>댓글 수</Brief>}
              onPress={() => {
                // add event handler
                Alert.alert("pressed");
              }}
              multipleLine>
              게시글 제목 /*title*/
              <Brief>작성자 / 작성 시간</Brief>
            </Item>

            <Item
              extra={<View>
                ㄴ3
                <Brief style={{ textAlign: 'right' }}>2023.03.10 14:22</Brief>
              </View>}
              multipleLine
              align="bottom">
              게시글 제목 /*title*/
            </Item>
          </List>

          <List renderHeader={'썸네일 가져오기'}>

            <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png">
              thumb
            </Item>
            <Item
              thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
              arrow="horizontal">
              thumb
            </Item>
            <Item
              extra={<Image
                source={{
                  uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
                }}
                style={{ width: 29, height: 29 }} />}
              arrow="horizontal">
              extra Image
            </Item>
          </List>
          <Button
            title="Go to Write"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate('Write');
            }}
          />
          <Button
            title="Go to View"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.push('View');
            }}
          />
        </ScrollView>
        <View
          style={{ paddingBottom: 20 }}>
          <Text>Board list in here.</Text>
        </View></>

    );
  }

  // 게시글 작성
  const WritePost = ({ navigation }: any) => {
    return (
      <View>
        <Text>Write a new post.</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  // 게시글 클릭
  const ViewPost = ({ navigation }: any) => {
    return (
      <View>
        <Text>View a new post.</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>

    );
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
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

          )
          // only in iOS - headerBackTitleVisible='false'
        }}
      >
        <Stack.Screen
          name="List"
          component={BoardList}
        />
        <Stack.Screen
          name="Write"
          component={WritePost}
          // configure the style for rendering and transitions (card / modal / transparentModal)
          options={
            {
              presentation: 'modal',
            }
          }

        />
        <Stack.Screen
          name="View"
          component={ViewPost}
        />


      </Stack.Navigator>

    </>
  )
}
export default Board;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  container: {
    // for empty space in iOS
    height: 5
  },
  title: {
    fontSize: 24,
  },
});