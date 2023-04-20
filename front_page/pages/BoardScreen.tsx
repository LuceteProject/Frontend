// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, TextInput, SectionList, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import { Tab, TabView } from '@rneui/themed';
import BoardContent from './BoardContents';
import BoardWriteContent from './BoardWrite';
import Notification from './Notification';

import { NotificationHandler } from '../components/Handler';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

type SearchBarComponentProps = {};

const SwitchComponent = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search: React.SetStateAction<string>) => {
    setSearch(search);
  };
}
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
    Alert.alert(name, "pressed!");
  }
  const BoardItem = (props: any) => (
    // 각 게시글 항목

    <TouchableOpacity
      onPress={() => {
        /* onPress 호출되지 않음 */
        //console.log(props);
        props.nav.push('ViewPost', { title: 'test', author: 'lee' });

      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          paddingBottom: 10,
          paddingTop: 10
        }}>
        <View>
          <Text> {props.title} </Text>
          <Text> {props.author} / {props.wtime} </Text>
        </View>
        <View>
          <Text
            style={{
              padding: 10
            }}>{props.reply}</Text>
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

  // 게시판
  const Main = () => {
    const [index, setIndex] = React.useState(0);
    const [number, onChangeNumber] = useState('');
    const [data, setData] = useState([]);
    // sample for data 
    const DATA = [
      {
        title: 'Main dishes',
        author: 'lee',
        reply: 1,
        timestamp: '2023-04-06'
      },
      {
        title: 'Sides',
        author: 'kang',
        reply: 2,
        timestamp: '2023-04-04'
      },
      {
        title: 'Drinks',
        author: 'kim',
        reply: 3,
        timestamp: '2023-03-31'
      },
      {
        title: 'Desserts',
        author: 'park',
        reply: 4,
        timestamp: '2023-03-20'
      },
    ];

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

          <Tab value={index} onChange={setIndex} dense>
            <Tab.Item>자유게시판</Tab.Item>
            <Tab.Item>익명게시판</Tab.Item>
            <Tab.Item>임원진게시판</Tab.Item>
          </Tab>
          <View
            id='SearchBar'
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder={'검색어를 입력하세요.'}
              value={text}
            />
            <TouchableOpacity
              style={styles.searchbtn}
              onPress={clickHandler}>
              <Icon name="search" size={20} color="#000"
              />
            </TouchableOpacity>
          </View>

          <TabView value={index} onChange={setIndex} animationType="spring">
            { /*onPress 호출안되는 문제 계속되면, map 으로 개수만큼 boardItem 컴포넌트 생성해서 넣는 방법 사용하기*/}
            <TabView.Item style={{ width: '100%', height: 600 }}>
              <>
              <Button title="press" />
              <FlatList
                data={DATA} // 여기에 서버에서 가져온 값 data 넣어주기
                renderItem={({ item }) => <BoardItem
                  title={item.title}
                  author={item.author}
                  wtime={item.timestamp}
                  reply={item.reply} />
                }
              //keyExtractor={(item) => String(item.id)}
              />
              </>
              

            </TabView.Item>
            <TabView.Item style={{ width: '100%', height: 600 }}>
              <>
                <Text>익명게시판입니다.</Text>
                <TouchableOpacity onPress={()=>{
                  console.log('pressed');
                }}><Text>클릭</Text></TouchableOpacity>
                <BoardItem nav={navigation} title="test" author="lee" reply='1' />
                <BoardItem nav={navigation} title="test2" author="kim" reply='2' />
                <BoardItem nav={navigation} title="test3" author="park" reply='3' />
              </>

            </TabView.Item>
            <TabView.Item style={{ width: '100%', height: 600 }}>
              <>
                <Text>임원진게시판입니다.</Text>
                <BoardItem nav={navigation} title="test" author="lee" reply='1' />
                <BoardItem nav={navigation} title="test2" author="kim" reply='2' />
                <BoardItem nav={navigation} title="test3" author="park" reply='3' />
              </>


            </TabView.Item>
          </TabView>
          
          <View style={{
            height: 800
          }}>
            {/* 게시판 목록 index*/}
          </View>
        </View>

        <TouchableOpacity
          // 글쓰기 버튼
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('WritePost');
          }}
          style={styles.touchableOpacityStyle}>
          <Icon name="pencil" size={40} color="#000"
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
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
                  navigation.navigate('Notification');
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
          name="PostListTab"
          component={Main}
          options={{
            title: '게시판',
          }
          }
        />
        <Stack.Screen
          name="WritePost"
          component={BoardWriteContent}
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
          name="ViewPost"

          component={BoardContent}
          options={
            {
              headerRight: () => {
                return <></>;
              }
              //headerShown: false
            }
          }
        />
         <Stack.Screen
          name="Notification"
          component={Notification}
          options={
            {
              headerShown: false,
              presentation: 'modal',
            }
          }
        />

      </Stack.Navigator>
    </>
  );
}
export default Screen;

const styles = StyleSheet.create({
  background: {
    //flex: 1,
    backgroundColor: '#f5f5f9',
  },
  container: {
    // for empty space in iOS
    height: 5
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
    backgroundColor: '#fff'
  },
});