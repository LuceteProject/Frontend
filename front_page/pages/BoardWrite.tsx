import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LeftOutline } from 'antd-mobile-icons';
const Stack = createNativeStackNavigator();


const Page = () => {

    const sendDataToServer = async () => {
        const data = {
            id: 0,
            header: 0,
            title: "string",
            content: "string",
            permission: 0,
            is_notice: true,
            created: "2023-06-03T12:16:19.162Z",
            updated: "2023-06-03T12:16:19.162Z",
            user_id: 0,
            author_name: "string",
            board_id: 0
        };

        try {
            const response = await fetch('http://210.96.102.143:8080/api/v1/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // 성공적으로 전송되었을 때의 처리
                console.log('Data sent successfully');
            } else {
                // 전송 실패 시의 처리
                console.log('Failed to send data');
            }
        } catch (error) {
            // 오류 발생 시의 처리
            console.log('Error occurred:', error);
        }
    };
    const Main = ({ navigation }: any) => {

        const [isBoardModalVisible, setBoardModalVisible] = useState(false);
        const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
        const [selectedBoard, setSelectedBoard] = useState('');
        const [selectedCategory, setSelectedCategory] = useState('');
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');

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

        const handleConfirm = () => {
            // 게시글을 서버에 업로드하는 로직 구현
            /* Api upload in here */
            //sendDataToServer();
            Alert.alert("게시글이 작성되었습니다.");
            navigation.pop();
        };

        const handleBoardSelect = (board: string) => {
            setSelectedBoard(board);
            setBoardModalVisible(false);
        };

        const handleCategorySelect = (category: string) => {
            setSelectedCategory(category);
            setCategoryModalVisible(false);
        };
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollView}>
                    {/* 게시판 선택 모달 */}
                    <Modal visible={isBoardModalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>게시판 선택</Text>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleBoardSelect('자유')}>
                                    <Text style={styles.attachmentButtonText}>자유</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleBoardSelect('익명')}>
                                    <Text style={styles.attachmentButtonText}>익명</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleBoardSelect('임원진')}>
                                    <Text style={styles.attachmentButtonText}>임원진</Text>
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
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect('전체')}>
                                    <Text style={styles.attachmentButtonText}>전체</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect('팀1')}>
                                    <Text style={styles.attachmentButtonText}>팀1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect('팀2')}>
                                    <Text style={styles.attachmentButtonText}>팀2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect('팀3')}>
                                    <Text style={styles.attachmentButtonText}>팀3</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentButton} onPress={() => handleCategorySelect('팀4')}>
                                    <Text style={styles.attachmentButtonText}>팀4</Text>
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
                        
                        {selectedBoard ? (
                            <Text style={styles.selectedText}>{selectedBoard}</Text>
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
                    <View style={{height: 20}}></View>
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
                    <View style={{height: 20}}></View>

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
                    <View style={{height: 20}}></View>

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
                        {selectedCategory ? (
                            <Text style={styles.selectedText}>{selectedCategory}</Text>
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

                    <View style={{height: 10}}></View>
                    <View style={{height: 20}}></View>

                    {/* 첨부파일 */}
                    <TouchableOpacity style={styles.attachmentButton}>
                        <Text style={styles.attachmentButtonText}>첨부파일</Text>
                    </TouchableOpacity>
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
    textInputbody:{
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