// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabView, SceneMap } from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/Ionicons';
import { Tab, } from '@rneui/themed';
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
  /* 
  Values from API 
  */
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [text, onChangeText] = useState('');

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
  // on searching text changed

  const clickHandler = ({ name }: any) => {
    Alert.alert(name, 'pressed!');
  };
  const BoardItem = (props: any) => (
    // 각 게시글 항목

    <TouchableOpacity
      onPress={() => {
        /* onPress 호출되지 않음 */
        console.log(props);
        props.nav.navigate('ViewPost', { title: 'test', author: 'kim' });
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
          <Text> {props.title} </Text>
          <Text>
            {' '}
            {props.author} / {props.wtime}{' '}
          </Text>
        </View>
        <View>
          <Text
            style={{
              padding: 10,
            }}>
            {props.reply}
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
  const FirstRoute = (props: any) => (
    <View style={{ height: 500 }}>
      <View
        id="SearchBar"
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={'검색어를 입력하세요.'}
          value={text}
        />
        <TouchableOpacity style={styles.searchbtn} onPress={clickHandler}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {/* nav에 navigation 넣어줘야 하고.. 이걸 props로 받아야 하고... 이건 가장먼저 SceneMap에서 넣어줘야하고... api에서 불러오면 값하나로 통일될듯?*/}
      <BoardItem nav={navigation} title={props.title} author={props.author} wtime={props.wtime} reply={props.reply} />
      <BoardItem title={props.title} author={props.author} wtime={props.wtime} reply={props.reply} />
    </View>
  );

  const SecondRoute = (props: any) => (
    <View>
      <View
        id="SearchBar"
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={'검색어를 입력하세요.'}
          value={text}
        />
        <TouchableOpacity style={styles.searchbtn} onPress={clickHandler}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <BoardItem title={props.title} author={props.author} wtime={props.wtime} reply={props.reply} />
      <BoardItem title={props.title} author={props.author} wtime={props.wtime} reply={props.reply} />

    </View>
  );

  const ThirdRoute = (props: any) => (
    <View style={{ height: 500 }}>
      {/* 검색창 위치 어느게 나은지 물어보기 */}
      <View
        id="SearchBar"
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={'검색어를 입력하세요.'}
          value={text}
        />
        <TouchableOpacity style={styles.searchbtn} onPress={clickHandler}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <BoardItem title={props.title} author={props.author} wtime={props.wtime} reply={props.reply} />
      <BoardItem title={props.title} author={props.author} wtime={props.wtime} reply={props.reply} />

    </View>
  );
  //Tab View 항목 지정
  const renderScene = SceneMap({
    first: () => <FirstRoute nav={navigation} title="sample" author="lee" wtime="2023/01/05" reply='3' />,
    second: () => <SecondRoute nav={navigation} title="sample" author="lee" wtime="2023/01/05" reply='3' />,
    third: () => <ThirdRoute nav={navigation} title="sample" author="lee" wtime="2023/01/05" reply='3' />,
  });

  // 게시판
  const Main = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'third', title: 'Third' },
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
          {/*
          <View
            id="SearchBar"
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder={'검색어를 입력하세요.'}
              value={text}
            />
            <TouchableOpacity style={styles.searchbtn} onPress={clickHandler}>
              <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
          </View>
*/}


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
