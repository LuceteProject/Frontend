// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, SectionList, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { List, NoticeBar } from '@ant-design/react-native'

const Item = List.Item
const Brief = Item.Brief

const BoardList = () => {

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

  useEffect(() => {
    console.log("screen update");
  }, []);

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

  return (
    <>
      <SafeAreaView
        style={styles.container}></SafeAreaView>
      <Text> Here's header area</Text>
      
      <ScrollView
        style={styles.background}
        // 이게 뭔지 나도 찾아봐야함
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        <List renderHeader={'게시판 이름 여기'}>
          <Item
            extra={<Brief>댓글 수</Brief>}
            onPress={()=> {
              // add event handler
              Alert.alert("pressed");
            }}
            multipleLine>
            게시글 제목 /*title*/
            <Brief>작성 시간</Brief>
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

      </ScrollView>
      <View
        style={{ paddingBottom: 20 }}>
      </View>
    </>
  )
}
export default BoardList;

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