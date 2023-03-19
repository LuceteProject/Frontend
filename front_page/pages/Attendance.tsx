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

    // 게시판
    const Main = ({ navigation }: any) => {
        return (
            <>
                <View
                    //View for select the sub menu
                    style={
                        {
                            margin: 10,
                            flexDirection: 'row', //정렬 방향
                            justifyContent: 'space-around'
                        }
                    }>
                    <TouchableOpacity onPress={clickHandler}>
                        {/* 비활성화일때 텍스트 효과 바꾸기 */}
                        <Text>출석 확인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clickHandler}>
                        <Text>출석 기록</Text>
                    </TouchableOpacity>
                </View>
                
                <View>

                </View>


            </>

        );
    }

    // 출결 목록 확인
    const WritePost = ({ navigation }: any) => {
        return (
            <View>
                <Text>Write a new post.</Text>
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

});