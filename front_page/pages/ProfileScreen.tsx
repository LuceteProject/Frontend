import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

/* 각 sub-menu는 ~page로 끝나게 */
import MemberPage from './MemberList';
import AttendancePage from './Attendance';
import PersonalSetting from './PersonalSetting';


const Stack = createNativeStackNavigator();


/* functional execution */
const Screen = ({ navigation }: any) => {
  /* User 정보 받아오기 */
  const [semester, setSemester] = useState(''); //기수
  const [team, setTeam] = useState(''); //팀 이름
  const [name, setName] = useState(''); //이름
  const [message, setMessage] = useState('상태메시지를 입력하세요.'); //상태메시지
  const [userImage, setUserImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  /* API variables */
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고

      // loading 상태를 true 로 바꿉니다.
      setLoading(true);

      const response = await axios.get('http://54.237.121.196:8080/api/v1/users/1', {
        headers: {
          'Content-Type': 'application/json',
          // 필요하다면 인증 헤더를 추가합니다.
        }
      })
      .then(response =>  {
        //console.log(response);
        setSemester(response.data.semester);
        setTeam(response.data.team);
        setName(response.data.name);
        setMessage(response.data.profile_message);
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

  // Profile Information update
  const ProfilePart = () => {
    return (
      <>
        <View style={styles.viewstyle}>
          <Image
            //for test, use logo imgs
            //source={require('../img/logo.jpg')}
            source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
            style={styles.imgstyle}
          />
          <View>
            <Text
              /* 받아오는 값은 ${user_num} 이런식으로? */
              style={styles.profiletext}>
              {semester} 기</Text>
            <Text
              style={styles.profiletext}>
              {team} 팀 {name}</Text>
            <Text
              style={styles.sangme}>
              {message}</Text>
          </View>

        </View>
        <View
          /*이거 뭔지 모르겠어요 --> 검은색 선 한줄!! */
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }} />
      </>
    );
  }

  /* Error 해결 필요 */
  const ListPart = () => {
    return (
      <>
        <Button
          title="Go to MemberList"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('MemberList');
          }}
        />
        <Button
          title="Go to Attendance"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.push('Attendance');
          }}
        />
        <Button
          title="Go to Personal setting"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.push('PersonalSetting');
          }}
        />
      </>
    );
  }

  //Profile 첫 화면
  const Main = () => {
    return (
      <>
        <ProfilePart />
        {/*설정 목록 아래에 */}

        {/*
        <ListPart />
        왜 저기 들어가면 실행이 안되냐잉... */}
        <TouchableOpacity style={styles.button}
          onPress={() => { navigation.navigate('Attendance') }}>
          <Text style={styles.buttontext}>출석확인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => { navigation.navigate('MemberList') }}>
          <Text style={styles.buttontext}>부원목록</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => { navigation.navigate('Personal Setting') }}>
          <Text style={styles.buttontext}>설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => { navigation.navigate('Personal Setting') }}>
          <Text style={styles.buttontext}>앱버전</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}
          onPress={() => { navigation.navigate('Personal Setting') }}>
          <Text style={styles.buttontext}>로그아웃</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          //headerShown: false,
          headerRight: () => (
            <>
              <TouchableOpacity
                // Notification icon - components 분리할 수 있으면 뺴기
                onPress={() => {
                  navigation.push('Notification');
                }}>
                <Icon name="notifications" size={30} color="#000"
                  style={{
                    // 둥근 원 테두리, 근데 배경 없으면 필요없을듯?
                    //없는게 나아보이긴해요
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </>

          ),
          /* 없어도 되지 않을까?*/
          //headerShown: false
          // only in iOS - headerBackTitleVisible='false'
        }}
      >
        <Stack.Screen
          name="ProfileTab"
          component={Main}
          options={
            {
              headerShown: true,
              title: '프로필'
            }
          }
        />
        <Stack.Screen
          name="Attendance"
          component={AttendancePage}
          options={
            {

              headerRight: () => {
                return <></>;
              },
              title: '출석확인',

            }
          }

        />
        <Stack.Screen
          name="MemberList"
          component={MemberPage}
          options={
            {
              //headerShown: true,
              headerRight: () => {
                return <></>;
              },
              title: '부원목록',

            }
          }

        />
        <Stack.Screen
          name="Personal Setting"
          component={PersonalSetting}
          options={
            {
              //headerShown: true,
              headerRight: () => {
                return <></>;
              },
              title: '설정',

            }
          }
        />
        
      </Stack.Navigator>
    </>
  )
}

/* page return */
export default Screen;


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

  viewstyle: {
    flexDirection: "row", //content 정렬
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",

    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  imgstyle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 5,
  },

  profiletext: {
    fontSize: 19,
    color: '#000'
  },

  sangme: {
    fontSize: 16,
    paddingTop: 7,
    color: '#999999',
  },

  button: {
    backgroundColor: "#ffffff",
    pading: 10,
  },

  buttontext: {
    fontSize: 24,
    margin: 11,
    textAlign: 'left',
    color: '#000'
  },

  /* 
  Profile item 
  프로필 사진, 이름, 전화번호, 이메일 스타일 지정필요
  */
});
