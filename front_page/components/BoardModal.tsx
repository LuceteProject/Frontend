import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const Screen = ({ navigation }: any) => {

    const sendDataToServer = async () => {
        const data = {
            header: 1, //말머리
            title: "test title3",
            content: "test content3",
            permission: 0,
            is_notice: false,
            user_id: 2,
            author_name: "John Doe",
            board_id: 1 //게시판 종류
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
            sendDataToServer();
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
                                    <Text style={styles.attachmentButtonText}>팀</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setCategoryModalVisible(false)}>
                                    <Text style={styles.modalCloseButtonText}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>


                    {/* 게시판 선택 */}
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setBoardModalVisible(true)}>
                        <Text style={styles.inputLabel}>게시판 선택</Text>
                        {selectedBoard ? (
                            <Text style={styles.selectedText}>{selectedBoard}</Text>
                        ) : (
                            <Text style={styles.selectedText}>게시판을 선택하세요</Text>
                        )}
                    </TouchableOpacity>

                    {/* 말머리 선택 */}
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setCategoryModalVisible(true)}>
                        <Text style={styles.inputLabel}>말머리</Text>
                        {selectedCategory ? (
                            <Text style={styles.selectedText}>{selectedCategory}</Text>
                        ) : (
                            <Text style={styles.selectedText}>말머리를 선택하세요</Text>
                        )}
                    </TouchableOpacity>

                    {/* 제목 입력 */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>제목</Text>
                        <TextInput
                            style={styles.textInput}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="제목을 입력하세요"
                        />
                    </View>

                    {/* 본문 입력 */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>본문</Text>
                        <TextInput
                            style={[{ height: 300 }, styles.textInput]}
                            value={content}
                            onChangeText={setContent}
                            placeholder="본문을 입력하세요"
                            multiline
                        />
                    </View>

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
                        <Text style={styles.attachmentButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

                    ),
                    

                    // only in iOS - headerBackTitleVisible='false'
                }}
            >
                <Stack.Screen
                    name="Write"
                    component={Main}
                    options={{
                        headerRight: () => {
                            return <></>;
                        },
                        title: '게시글 작성',
                        
                    }}
                />



            </Stack.Navigator>

        </>
    );

}
/* page return */
export default Screen;

/* style */const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cancelButton: {
        flex: 1,
        marginRight: 5,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    confirmButton: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: '#ccc',
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
        marginBottom: 10,
    },
    inputLabel: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    attachmentButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    attachmentButtonText: {
        textAlign: 'center',
    },
    selectedText: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});