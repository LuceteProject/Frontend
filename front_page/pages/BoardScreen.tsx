// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Post } from "../types";
import { fetchData } from '../utils/APIs';
import { formatDate } from '../utils/DateFormat';
import Icon from 'react-native-vector-icons/Ionicons';
import BoardContent from './BoardContents';
import BoardWriteContent from './BoardWrite';
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
  const [posts, setPosts] = useState<Post[]>([]); //게시글 목록
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [currentBoard, setCurrentBoard] = useState('1'); //현재 페이지
  const [text, onChangeText] = useState(''); //검색어


  /* API variables */
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchPostsData = async () => {
      const response = await fetchData('api/v1/posts'); //확인 필요
      setPosts(response.content);
    };
    fetchPostsData();
    setLoading(false);
  }, []);

  const BoardItem = (props: any) => {
    const convertedDate = formatDate(props.data.updated);
    const handleClick = () => {
      if (props.data.id !== 0) {
        props.nav.navigate('ViewPost', { postId: props.data.id });
      }
    };
    return (
      // 각 게시글 항목
      <TouchableOpacity onPress={handleClick} disabled={props.data.id === 0}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            paddingBottom: 10,
            paddingTop: 10,
          }}>
          <View>
            <Text style={styles.titlefont}> {props.data.title} </Text>
            <Text style={styles.datefont}>
              {' '}
              {props.data.user_id} / {convertedDate}{' '}
            </Text>
          </View>
          <View style={styles.coments}>
            <Text>
              {props.data.permission}
            </Text>
            <Text style={{ paddingVertical: 3 }}>
              댓글
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

  const Route = (props: any) => {
    // props.data가 존재하고 유효한 데이터를 포함하는지 확인 -- loading 사용가능한지 확인
    // if (props.data && Array.isArray(props.data) && props.data.length > 0) { //아래꺼 대신 사용 가능
    if (!loading) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {/* ... */}
          {/* 게시글 목록 렌더링 */}
          {props.data.map((item: any, index: number) => (
            <BoardItem key={index} nav={props.nav} data={item} />
          ))}
        </View>
      );
    }


    // 데이터가 없을 경우, 혹은 유효한 데이터가 없는 경우 표시할 내용
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>게시글이 없습니다.</Text>
      </View>
    );
  };

  //Tab View 항목 지정 - 게시글 post의 board_id 값에 따라 filter
  const renderScene = SceneMap({
    first: () => <Route nav={navigation} data={posts.filter(post => post.board_id === 0)} />,
    second: () => <Route nav={navigation} data={posts.filter(post => post.board_id === 1)} />,
    third: () => <Route nav={navigation} data={posts.filter(post => post.board_id === 2)} />,
    fourth: () => <Route nav={navigation} data={posts.filter(post => post.board_id === 3)} />,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}

      renderLabel={({ route, focused, color }) => (
        <Text style={{ margin: 6, fontSize: 18, color: '#fff' }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#B77DE4' }}
    />
  );

  // 게시판
  const Main = () => {
    /* 게시판 탭 설정 위한 변수들 */
    const [routes] = React.useState([
      { key: 'first', title: '자유' },
      { key: 'second', title: '익명' },
      { key: 'third', title: '임원진' },
      { key: 'fourth', title: '졸업생' }
    ]);

    /* 게시판 페이지 번호 */
    const [number, onChangeNumber] = useState('');
    const [index, setIndex] = React.useState(0);
    return (
      <>
        {/* TabBar style https://reactnavigation.org/docs/tab-view#tabview - TabBar 항목에서 style 지정 설명 있음 */}
        <TabView
          //renderTabBar
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />

        <View
          style={{
            backgroundColor: 'white'
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
            color="#fff"
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
                  navigation.push('Notification');
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

      </Stack.Navigator>
    </>
  );
};
export default Screen;

const styles = StyleSheet.create({
  background: {
    //flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  container: {
    // for empty space in iOS
    height: 5,
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
    backgroundColor: '#b77de4',
  },
  basicfont: {
    fontSize: 16,
    color: '#000'
  },
  coments: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: '#eeeeee'
  },
  titlefont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  datefont: {
    fontSize: 14,
    color: 'gray',
    padding: 3
  }
});
