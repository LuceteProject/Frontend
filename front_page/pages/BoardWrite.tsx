// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, Dialog } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

const Screen = (props: any) => {
    //props

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

    // 게시판
    const Main = ({ navigation }: any) => {
        const [haveAccess, setHaveAccess] = useState(false);
        /* 게시판 선택 */
        const [type, setType] = useState('게시판을 선택하세요.');
        const types = {
            'BOARD1': "자유게시판",
            'BOARD2': "익명게시판",
            'BOARD3': "임원게시판"
        }
        const [visible, setVisible] = useState(false); // 게시판 선택 modal
        const toggleSetVisible = () => {
            setVisible(!visible);
        }
        /* 게시글 */
        const [titleValue, setTitleValue] = useState(''); //title
        const [visible2, setVisible2] = useState(false); //말머리 선택 modal
        const [context, setContext] = useState('말머리 선택');
        const toggleSetVisible2 = () => {
            setVisible2(!visible2);
        }


        return (
            <SafeAreaView>
                <ScrollView
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                    {/* 게시판 종류 선택 부분 */}
                    <TouchableOpacity
                        onPress={toggleSetVisible}
                    >
                        {/* 
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={visible}
                            onRequestClose={() => {
                                toggleSetVisible();
                            }}

                        >

                            <Button title="자유게시판" onPress={() => {
                                setType(types.BOARD1)
                                toggleSetVisible()
                            }} />
                            <Button title="익명게시판" onPress={() => {
                                setType(types.BOARD2)
                                toggleSetVisible()
                            }} />
                            <Button title="임원게시판" onPress={() => {
                                setType(types.BOARD3)
                                toggleSetVisible()
                            }} />
                        </Modal>
                        */}
                        <Dialog
                            isVisible={visible}
                            onBackdropPress={toggleSetVisible}
                        >
                            <Dialog.Button
                                title="자유게시판"
                                onPress={() => {
                                    setType(types.BOARD1)
                                    toggleSetVisible()

                                }}
                            />
                            <Dialog.Button
                                title="익명게시판"
                                onPress={() => {
                                    setType(types.BOARD2)
                                    toggleSetVisible()

                                }}
                            />
                            <Dialog.Button
                                title="임원게시판"
                                onPress={() => {
                                    setType(types.BOARD3)
                                    toggleSetVisible()

                                }}
                            />

                        </Dialog>
                        <Text>{type}</Text>
                    </TouchableOpacity>
                    {/* 제목 입력 */}
                    <KeyboardAvoidingView>
                        <TextInput
                            editable
                            maxLength={30}
                            value={titleValue}
                            placeholder={'제목을 입력하세요.'}
                            style={{
                                fontSize: 20,
                                borderWidth: 1,
                                padding: 5

                            }} />
                    </KeyboardAvoidingView>


                    <View
                        style={{
                            borderBottomColor: '#D9D9D9',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    {/* 말머리 
                    
                    <Chip
                        title="말머리 선택"
                        type="outline"
                        containerStyle={{ marginVertical: 5 }}
                        onPress={() => console.log('Icon chip was pressed!')}
                    />
                    */}
                    <TouchableOpacity
                        style={{
                            marginTop: 5
                        }}
                        onPress={toggleSetVisible2}
                    >
                        <Dialog
                            isVisible={visible2}
                            onBackdropPress={toggleSetVisible2}
                        >
                            <Dialog.Button
                                title="팀"
                                onPress={() => {
                                    setContext('선택한 내용')
                                    toggleSetVisible2()

                                }}
                            />
                        </Dialog>
                        <Text>{context}</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: '#D9D9D9',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    {/* 첨부파일 */}
                    <TouchableOpacity
                        style={{
                            marginTop: 5
                        }}
                        onPress={() => {
                            console.log('첨부파일 pressed');
                        }}
                    >
                        <Text>첨부파일</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: '#D9D9D9',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />

                    {/* 내용 입력 */}
                    <View style={{ minHeight: 200, padding: 10 }}>
                        <TextInput
                            multiline
                            editable
                            placeholder='내용을 입력하세요.'
                            numberOfLines={20}
                            maxLength={30}
                            scrollEnabled
                            style={{
                                //borderTopWidth: 1
                            }}
                        //value={value} 
                        />
                    </View>
                    <Button title="확인" onPress={
                        () => {
                            /* Api upload in here */
                            Alert.alert("게시글이 작성되었습니다.");
                            navigation.pop(); 
                        }} />
                    <Button title="취소" onPress={
                        () => {
                            Alert.alert("작성 취소", "글 작성을 취소할까요?",
                                [
                                    {
                                        text: "예",
                                        onPress: () => { navigation.pop() }
                                    },
                                    {
                                        text: "아니요",
                                        style: 'cancel',
                                    }
                                    
                                ],
                                {cancelable : false}
                            );
                        }} />



                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />

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
                    name="Write"
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