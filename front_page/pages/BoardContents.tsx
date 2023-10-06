// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { fetchData } from '../utils/APIs';
import { Post } from "../types";
const Stack = createNativeStackNavigator();



const Page = ({ route }: any) => {

    const navigation = useNavigation();
    /* 
    Values from API 
    */
    const postId = route.params.postId;
    const [post, setPost] = useState<Post | null>(null);

    const exPost: Post = { // 예시 게시물 데이터
        id: 1,
        title: '예시 게시물',
        created: '2023-10-06',
        updated: '2023-10-06',
        content: '예시 내용',
        permissionCode: 1,
        isNotice: false,
        boardId: 1,
        teamCode: 1,
        userId: 1
    };
    

    /* API variables */
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        /*setLoading(true);
        const fetchPostsData = async () => {
            const response = await fetchData(`api/v1/posts/${postId}`); //확인 필요
            setPost(response.content);
        };
        fetchPostsData();
        setLoading(false);*/
        setLoading(true);
        // fetchData 대신 예시 게시물 데이터 사용
        setPost(exPost);
        setLoading(false);
    }, []);

    const clickOptionHandler = () => {
        navigation.navigate('WritePost');
    }
    /* 댓글부분 */
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
                        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                        style={{
                            //{size}
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            margin: 5
                        }}
                    />
                    <View style={{
                        marginLeft: 10,
                    }}>
                        <View style={{
                            //flexDirection:'row', 
                            justifyContent: 'space-around'
                        }}>
                            <Text style={{
                                fontSize: 15,
                            }}>replyAuthor</Text>
                            <Text style={{
                                textAlign: 'right'
                            }}>replyTime</Text>
                        </View>

                        <Text>replyContents</Text>
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
    /* 게시글 부분 */
    const Main = () => {
        const [haveAccess, setHaveAccess] = useState(false);
        if (!post) {
            return (
                <ActivityIndicator />
            );
        }
        return (
            <SafeAreaView>
                <ScrollView>
                    <Text style={{ marginTop: 10, marginLeft: 10 }} >{post.boardId}</Text>
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 25,

                        }}>{post.title}</Text>
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
                        }}>{post.userId}</Text>

                    </View>
                    <Text style={{
                        textAlign: 'right',
                        marginBottom: 10,
                        marginRight: 10,
                    }}> {new Date(post.updated).toLocaleString('ko-KR')}</Text>
                    <View
                        style={{
                            borderBottomColor: '#D9D9D9',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <View style={{ minHeight: 200, padding: 10 }}>
                        <Text>{post.content}</Text>
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
                        headerRight: () => {
                            return <></>;
                        }
                    }}
                />



            </Stack.Navigator>

        </>
    );
}
export default Page;

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