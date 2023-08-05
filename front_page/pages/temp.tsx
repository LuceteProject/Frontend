// tslint:disable:no-empty
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, Dialog } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
const Stack = createNativeStackNavigator();

const Page = (props: any) => {
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
    const fetchData = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고

            const response = await axios.post('http://210.96.102.143:8080/api/v1/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    // 필요하다면 인증 헤더를 추가합니다.
                }
            })
                .then(response => {
                    //console.log(response.data.content);
                    
                });



            // 데이터는 response.data.data 안에 들어있다.
        } catch (e) {
            console.log(e);
           
        }
        // loading 끄기
        
    };

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

        /* 드롭다운 관리 */
        const [selectedItem, setSelectedItem] = useState(''); // 선택된 항목을 저장하는 상태 변수
        const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운이 열려있는지 여부를 저장하는 상태 변수

        const handleToggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열림/닫힘 상태를 토글
        };

        const handleItemPress = (item: string) => {
            setSelectedItem(item); // 선택된 항목 업데이트
            setIsDropdownOpen(false); // 드롭다운 닫기
        };

        const renderDropdownContent = () => {
            // 드롭다운이 열린 경우에만 항목 목록을 렌더링
            if (!isDropdownOpen) return null;

            return (
                <View
                    style={{
                        position: 'absolute',
                        top: 40,
                        right: 0,
                        left: 0,
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'gray',
                        padding: 10,
                        marginVertical: 5,
                        zIndex: 9999,
                    }}
                >
                    {/* 선택할 항목들 */}
                    <TouchableOpacity onPress={() => handleItemPress('항목 1')}>
                        <Text>{selectedItem === '항목 1' ? '✔' : '○'} 항목 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleItemPress('항목 2')}>
                        <Text>{selectedItem === '항목 2' ? '✔' : '○'} 항목 2</Text>
                    </TouchableOpacity>

                    {/* 나머지 항목들도 위와 같이 추가할 수 있습니다 */}
                </View>
            );
        };

        return (
            <SafeAreaView>
                <ScrollView
                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                    {/* 게시판 종류 선택 부분 */}
                    <TouchableOpacity
                        onPress={toggleSetVisible}
                        style={styles.optionBackground}
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
                        <Text style={styles.option}>{type}</Text>
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
                            borderWidth: 1,
                            borderColor: 'gray',
                            padding: 10,
                            marginVertical: 5,
                            borderRadius: 5,
                        }}
                        onPress={handleToggleDropdown} // 드롭다운 열기/닫기
                    >
                        <Text>말머리 선택</Text>
                    </TouchableOpacity>

                    {renderDropdownContent()}

                    <TouchableOpacity
                        style={styles.optionBackground}
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
                        <Text style={styles.option}>{context}</Text>
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
                        <Text style={styles.option}>첨부파일</Text>
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
                                { cancelable: false }
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
export default Page;

const styles = StyleSheet.create({
    option: {
        fontSize: 15,
        fontWeight: 'normal',
        textAlign: 'left'
    },

    optionBackground: {

        padding: 5,
        borderRadius: 5,
        backgroundColor: '#fff'
    }
});