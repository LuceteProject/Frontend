// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity } from 'react-native'
import { NoticeBar } from '@ant-design/react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();

const Screen = () => {

  /* 
  Values from API 
  */
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  
  /* For Data fetch from server
    useEffect(() => {
      const fetchContentData = async () => {
        try {
            setLoading(true);
            const response = await axios.get();
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            
        }
    };
    
    fetchContentData();
    }, []);
    */

  const clickHandler = () => {
    Alert.alert("pressed!");
  }

  const BoardItem = () => {
    return (
      // 각 게시글 항목
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            paddingBottom: 10,
            paddingTop: 10
          }}>
          <View>
            <Text> 게시글 제목 </Text>
            <Text> 작성자 / 작성 시간 </Text>
          </View>
          <View>
            <Text
              style={{
                padding: 10
              }}>댓글 수</Text>
          </View>
        </View>
        <View
          // 구분선
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </>
    )
  }

  // 게시판
  const Main = ({ navigation }: any) => {
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
          <View
            style={
              {
                margin: 10,
                flexDirection: 'row', //정렬 방향
                justifyContent: 'space-around'
              }
            }>
            <TouchableOpacity onPress={clickHandler}>
              <Text>자유게시판</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clickHandler}>
              <Text>익명게시판</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clickHandler}>
              <Text style={{ color: 'red' }}>임원게시판</Text>
            </TouchableOpacity>
          </View>

          <View
            // 구분선
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <BoardItem />
          <BoardItem />
        

          <View
            style={{
              margin: 10
            }}>
          </View>
          <View>
            {/* 게시판 목록 index*/}

          </View>

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

        <TouchableOpacity
          // 글쓰기 버튼
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Write');
          }}
          style={styles.touchableOpacityStyle}>
          <Icon name="pencil" size={40} color="#000"
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </>

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

          )
          // only in iOS - headerBackTitleVisible='false'
        }}
      >
        <Stack.Screen
          name="게시판"
          component={Main}
        />
        <Stack.Screen
          name="Write"
          component={WritePost}
          // 얘를 BoardContent.jsx 파일로 연결해야 하는데 왜 안되ㅑㄴ잉,,
          // configure the style for rendering and transitions (card / modal / transparentModal)
          options={
            {
              presentation: 'modal',
              headerShown: false
            }
          }

        />
        <Stack.Screen
          name="View"
          component={ViewPost}
        />


      </Stack.Navigator>

    </>
  );
}
export default Screen;

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
  /* 밑에 두개 floating button style
  이거 왜 가운데에 안오냐 ....? ㅁㄹ...*/
  touchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: '#fff'
  },
});