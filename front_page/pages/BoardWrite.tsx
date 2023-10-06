import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchData, postData } from '../utils/APIs';
import axios from 'axios';
import { number } from 'prop-types';
const Stack = createNativeStackNavigator();

const Page = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchPostsData = async () => {
            const response = await postData(`api/v1/post/`, data); //확인 필요
            console.log(response);
        };
        fetchPostsData();
    }, []);


    const Main = ({ navigation }: any) => {

        const [isBoardModalVisible, setBoardModalVisible] = useState(false);
        const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
        const [selectedBoard, setSelectedBoard] = useState(6);
        const [selectedCategory, setSelectedCategory] = useState(15);
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [selectedBoardName, setSelectedBoardName] = useState('');
        const [selectedCategoryName, setSelectedCategoryName] = useState('');

        const handleCancel = () => {
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

        };

        const handleConfirm = async() => {
            // 게시글을 서버에 업로드하는 로직 구현
            /* Api upload in here */
            //sendDataToServer();
            try {
                const response = await axios.post("https://lucetemusical.com/api/v1/posts", {
                    teamCode: selectedCategory,
                    title: title,
                    content: content,
                    permissionCode: selectedBoard,
                    isNotice: false,
                    created: Date.now,
                    updated: Date.now,
                    boardId: selectedBoard,
                    userId: 1
                });
                console.log(response.data);
                console.log("성공");
              } catch (error) {
                console.log("실패");
              }
            navigation.pop();
        };
        const handleBoardSelectName = (board: string) =>{
            setSelectedBoardName(board);
            setBoardModalVisible(false);
        }
        const handleBoardSelect = (board: number) => {
            setSelectedBoard(board);
            switch(board){
                case 1:
                    return handleBoardSelectName('임원진')
                case 2:
                    return handleBoardSelectName('자유')
                case 3:
                    return handleBoardSelectName('익명')
                case 4:
                    return handleBoardSelectName('졸업생')
            }
            setSelectedBoard(board);
        };
        const handleCategorySelectName = (category: string) =>{
            setSelectedCategoryName(category);
            setCategoryModalVisible(false);
        }
        const handleCategorySelect = (category: number) => {
            setSelectedCategory(category);
            switch(category){
                case 1:
                    return handleCategorySelectName('극본')
                case 2:
                    return handleCategorySelectName('기획')
                case 3:
                    return handleCategorySelectName('디자인')
                case 4:
                    return handleCategorySelectName('배우')
                case 5:
                    return handleCategorySelectName('연출')
                case 6:
                    return handleCategorySelectName('음악')
            }
        };
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollView}>
                    {/* 게시판 선택 모달 */}
                    <Modal visible={isBoardModalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>게시판 선택</Text>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleBoardSelect(2)}>
                                    <Text style={styles.attachmentButtonText}>자유</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleBoardSelect(1)}>
                                    <Text style={styles.attachmentButtonText}>임원진</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleBoardSelect(3)}>
                                    <Text style={styles.attachmentButtonText}>익명</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleBoardSelect(4)}>
                                    <Text style={styles.attachmentButtonText}>졸업생</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setBoardModalVisible(false)}>
                                    <Text style={styles.modalCloseButtonText}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* 말머리 선택 모달 */}
                    <Modal visible={isCategoryModalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>말머리 선택</Text>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect(1)}>
                                    <Text style={styles.attachmentButtonText}>극본</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect(2)}>
                                    <Text style={styles.attachmentButtonText}>기획</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect(3)}>
                                    <Text style={styles.attachmentButtonText}>디자인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect(4)}>
                                    <Text style={styles.attachmentButtonText}>배우</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect(5)}>
                                    <Text style={styles.attachmentButtonText}>연출</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect(6)}>
                                    <Text style={styles.attachmentButtonText}>음악</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setCategoryModalVisible(false)}>
                                    <Text style={styles.modalCloseButtonText}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* 게시판 선택 */}
                    <View>
                        <Text style={styles.inputLabel}>게시판 선택</Text>
                        <View
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1
                            }}
                        />


                        <TouchableOpacity style={styles.inputContainer} onPress={() => setBoardModalVisible(true)}>
                            {selectedBoard >=0 && selectedBoard <=3 ? (
                                <Text style={styles.selectedText}>{selectedBoardName}</Text>
                            ) : (
                                <Text style={styles.selectedText}>게시판을 선택하세요</Text>
                            )}
                        </TouchableOpacity>
                        <View
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1
                            }}
                        />
                        <View style={{ height: 20 }}></View>
                    </View>
                    {/* 제목 입력 */}
                    <Text style={styles.inputLabel}>제목</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInputtitle}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="제목을 입력하세요"
                        />
                    </View>
                    <View style={{ height: 20 }}></View>

                    {/* 본문 입력 */}
                    <Text style={styles.inputLabel}>본문</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[{ height: 200 }, styles.textInputbody]}
                            value={content}
                            onChangeText={setContent}
                            placeholder="본문을 입력하세요"
                            multiline
                        />
                    </View>
                    <View style={{ height: 20 }}></View>

                    {/* 말머리 선택 */}
                    <Text style={styles.inputLabel}>말머리</Text>
                    <View>
                        <View
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1
                            }}
                        />
                        <TouchableOpacity style={styles.inputContainer} onPress={() => setCategoryModalVisible(true)}>
                            {selectedCategory >= 0 && selectedCategory <= 12 ? (
                                <Text style={styles.selectedText}>{selectedCategoryName}</Text>
                            ) : (
                                <Text style={styles.selectedText}>말머리를 선택하세요</Text>
                            )}
                        </TouchableOpacity>
                        <View
                            style={{
                                borderColor: 'gray',
                                borderWidth: 0.95
                            }}
                        />
                    </View>
                </ScrollView>

                {/* 하단 버튼 */}
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.attachmentButtonText}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.attachmentButtonTextokay}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
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
};

export default Page;
// 스타일 변경을 위한 코드
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },
    cancelButton: {
        flex: 1,
        marginRight: 5,
        backgroundColor: '#EEEEEE',
        padding: 10,
        borderRadius: 5,
    },
    confirmButton: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: '#FFCCFF',
        padding: 10,
        borderRadius: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalCloseButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: '#007AFF',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    inputContainer: {
        marginTop: 4,
        marginBottom: 4
    },
    inputLabel: {
        marginTop: 4.3,
        marginBottom: 4,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    },
    textInputtitle: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        fontSize: 16
    },
    textInputbody: {
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,

    },
    attachmentButton: {
        marginTop: 5,
        backgroundColor: '#EEEEEE',
        padding: 10,
        borderRadius: 5,
    },

    attachmentButtonText: {
        textAlign: 'center',
        color: '#666666',
        fontSize: 18,
        fontWeight: 'bold'
    },
    attachmentButtonTextokay: {
        textAlign: 'center',
        color: '#B77DE4',
        fontSize: 18,
        fontWeight: 'bold'
    },
    selectedText: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 5,
        color: '#000',
        fontSize: 18
    },
});