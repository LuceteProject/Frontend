// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const Screen = () => {

    /* 
    Values from API 
    */

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

    const clickOptionHandler = () => {
        Alert.alert("pressed!");
    }

    const Reply = () => {
        // 댓글 리스트 API에서 가져오기
        return (
            <>
                <View id='metadata'
                    style={{
                        margin: 5,
                        flexDirection: 'row',
                        //justifyContent: 'space-between'
                    }}>

                    <Image
                        //for test, use logo imgs
                        //src
                        source={require('../img/logo.jpg')}
                        style={{
                            //{size}
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            margin: 5
                        }}
                    />
                    <View style={{
                        marginLeft:10,
                    }}>
                        <View style={{
                            //flexDirection:'row', 
                            justifyContent:'space-around'}}>
                            <Text style={{
                                fontSize: 15,
                            }}>이름</Text>
                            <Text style={{
                                textAlign:'right'
                            }}>날짜 및 시간</Text>
                        </View>

                        <Text>댓글 내용</Text>
                    </View>



                </View>


                <View
                    style={{
                        borderBottomColor: '#D9D9D9',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
            </>
        );
    }
    // 게시판
    const Main = ({ navigation }: any) => {
        const [haveAccess, setHaveAccess] = useState(false);

        return (
            <SafeAreaView>
                <ScrollView>
                    <Text style={{ marginTop: 10, marginLeft: 10 }} >게시판 종류</Text>
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 25,

                        }}>게시글 제목</Text>
                        <TouchableOpacity
                            accessibilityLabel='owner' // {haveAccess}
                            onPress={clickOptionHandler}
                        //disabled
                        >
                            <Icon name="ellipsis-vertical" size={20} color="#000" />
                           
                        </TouchableOpacity>

                    </View>
                    <View id='metadata'
                        style={{
                            margin: 5,
                            flexDirection: 'row',
                            //justifyContent: 'space-between'
                        }}>

                        <Image
                            //for test, use logo imgs
                            //src
                            source={require('../img/logo.jpg')}
                            style={{
                                //{size}
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                margin: 5
                            }}
                        />
                        <Text style={{
                            margin: 15,
                            fontSize: 15,
                        }}>글쓴이</Text>

                    </View>
                    <Text style={{
                        textAlign: 'right',
                        marginBottom: 10,
                        marginRight: 10,
                    }}>날짜 및 시간</Text>
                    <View
                        style={{
                            borderBottomColor: '#D9D9D9',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <View style={{ minHeight: 200, padding: 10 }}>
                        <Text>in here text</Text>
                    </View>


                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                </ScrollView>


            </SafeAreaView>
        );
    }



    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
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
                    name="Post"
                    component={Main}
                    options={{
                        headerRight: ()=> {
                            return <></>;
                          }
                    }}
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
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        backgroundColor: '#fff'
    },
});