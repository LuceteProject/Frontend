// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { TabView, SceneMap } from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/Ionicons';
import BoardContent from './BoardContents';
import BoardWriteContent from './BoardWrite';
import Notification from './Notification';

const Stack = createNativeStackNavigator();

type SearchBarComponentProps = {};

const SwitchComponent = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (search: React.SetStateAction<string>) => {
    setSearch(search);
  };
};
const Screen = ({ navigation }: any) => {
  const postPerPage = 10; //페이지 당 게시글 수
  /* 
  Values from API 
  */
  const [posts, setPosts] = useState(''); //게시글 목록
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [text, onChangeText] = useState(''); //검색어

  /* API variables */
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고

      // loading 상태를 true 로 바꿉니다.
      setLoading(true);

      const response = await axios.get('http://210.96.102.143:8080/api/v1/posts', {
        headers: {
          'Content-Type': 'application/json',
          // 필요하다면 인증 헤더를 추가합니다.
        }
      })
        .then(response => {
          //console.log(response.data.content);
          setPosts(response.data.content);

        });



      // 데이터는 response.data.data 안에 들어있다.
    } catch (e) {
      console.log(e);
    }
    // loading 끄기
    setLoading(false);
  };

  // 첫 렌더링 때 fetchNews() 한 번 실행
  useEffect(() => {
    fetchData();
  }, []);

  const BoardItem = (props: any) => {
    const { id, title, author_name } = props.data;
    // 날짜 형식화 함수
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const today = new Date();
  
      const diffInMilliseconds = today.getTime() - date.getTime();
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  
      if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
      } else {
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = date.getDate();
        return `${month}월 ${day}일`;
      }
    };
  
    return (
      // 각 게시글 항목
      <TouchableOpacity
        onPress={() => {
          /* onPress 호출되지 않음 */
          //console.log(props.data.id);
          props.nav.navigate('ViewPost', { postId: id });
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            paddingBottom: 10,
            paddingTop: 10,
          }}>
          <View>
            <Text> {props.data.title} </Text>
            <Text>
              {' '}
              {props.data.author_name} / {formatDate(props.data.updated)}{' '}
            </Text>
          </View>
          <View>
            <Text
              style={{
                padding: 10,
              }}>
              댓글수 {props.data.permission}
            </Text>
          </View>
        </View>
        <View
          // 구분선
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </TouchableOpacity>
    );
  };
  
  const FirstRoute = (props: any) => {
    const { data } = props;
  
    // props.data가 존재하고 유효한 데이터를 포함하는지 확인
    if (data && Array.isArray(data) && data.length > 0) {
      return (
        <View style={{ height: 500 }}>
          {/* ... */}
          {/* 게시글 목록 렌더링 */}
          {data.map((item: any, index: number) => (
            <BoardItem key={index} nav={props.nav} data={item} />
          ))}
        </View>
      );
    }
  
    // 데이터가 없을 경우, 혹은 유효한 데이터가 없는 경우 표시할 내용
    return (
      <View style={{ height: 500 }}>
        <Text>게시글이 없습니다.</Text>
      </View>
    );
  };
  

  const Route = (props: any) => {
    const { data } = props;
  
    // props.data가 존재하고 유효한 데이터를 포함하는지 확인 -- loading 사용가능한지 확인
    if (!loading) {
      return (
        <View style={{ height: 500 }}>
          {/* ... */}
          {/* 게시글 목록 렌더링 */}
          {data.map((item: any, index: number) => (
            <BoardItem key={index} nav={props.nav} data={item} />
          ))}
        </View>
      );
    }
  
    // 데이터가 없을 경우, 혹은 유효한 데이터가 없는 경우 표시할 내용
    return (
      <View style={{ height: 500 }}>
        <Text>게시글이 없습니다.</Text>
      </View>
    );
  };

  //Tab View 항목 지정
  const renderScene = SceneMap({
    first: () => <FirstRoute nav={navigation} data={posts} />,
    second: () => <Route nav={navigation} data={posts} />,
    third: () => <FirstRoute nav={navigation} data={posts} />,
  });

  // 게시판
  const Main = () => {
    /* 게시판 탭 설정 위한 변수들 */
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: '자유게시판' },
      { key: 'second', title: '익명게시판' },
      { key: 'third', title: '임원진게시판' },
    ]);

    /* 게시판 페이지 번호 */
    const [number, onChangeNumber] = useState('');
    const [data, setData] = useState([]);

    return (
      <>
        <View
          style={styles.background}
        // 이게 뭔지 나도 찾아봐야함
        //automaticallyAdjustContentInsets={false}
        //showsHorizontalScrollIndicator={false}
        //</>showsVerticalScrollIndicator={false}
        >
          <Text>여러분 공지 좀 읽으세요 란</Text>
        </View >
        {/* TabBar style https://reactnavigation.org/docs/tab-view#tabview - TabBar 항목에서 style 지정 설명 있음 */}
        <TabView
          //renderTabBar
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />

        <View
          style={{
            height: 80,
          }}>
          {/* 게시판 목록 index*/}
        </View>
        <TouchableOpacity
          // 글쓰기 버튼
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('WritePost');
          }}
          style={styles.touchableOpacityStyle}>
          <Icon
            name="pencil"
            size={40}
            color="#000"
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <>
              <TouchableOpacity
                // Notification icon - components 분리할 수 있으면 뺴기
                onPress={() => {
                  navigation.navigate('Notification');
                }}>
                <Icon
                  name="notifications"
                  size={30}
                  color="#000"
                  style={{
                    // 둥근 원 테두리, 근데 배경 없으면 필요없을듯?
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </>
          ),
          // only in iOS - headerBackTitleVisible='false'
        }}>
        <Stack.Screen
          name="PostListTab"
          component={Main}
          options={{
            title: '게시판',
          }}
        />
        <Stack.Screen
          name="WritePost"
          component={BoardWriteContent}
          // 얘를 BoardContent.jsx 파일로 연결해야 하는데 왜 안되ㅑㄴ잉,,
          // configure the style for rendering and transitions (card / modal / transparentModal)
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewPost"
          component={BoardContent}
          options={{
            headerRight: () => {
              return <></>;
            },
            //headerShown: false
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default Screen;

const styles = StyleSheet.create({
  background: {
    //flex: 1,
    backgroundColor: '#f5f5f9',
  },
  container: {
    // for empty space in iOS
    height: 5,
  },
  title: {
    fontSize: 24,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    padding: 10,
  },
  searchbtn: {
    height: 40,
    width: '10%',
    margin: 12,
    marginLeft: 0,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    padding: 10,
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
    backgroundColor: '#fff',
  },
});
