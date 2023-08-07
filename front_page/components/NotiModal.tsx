/* Not used 
탭 뷰 활용한 알림, 쪽지 구분 기능
*/
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const Page = ({ navigation }: any) => {
    /* Tab */
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '알림' },
        { key: 'second', title: '쪽지함' },
    ]);
    /* API variables */
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState('알림 컴포넌트 테스트'); //notification list
    const [messageList, setMessageList] = useState('메시지 컴포넌트 테스트'); //message list


    /* API 호출 */
    const fetchData = async () => {
        try {
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios.get('http://210.96.102.143:8080/user/2', {
                headers: {
                    'Content-Type': 'application/json',
                    // 필요하다면 인증 헤더를 추가합니다.
                }
            })
                .then(response => {
                    console.log(response.data);
                });

            // 데이터는 response.data.data 안에 들어있다.
        } catch (e) {
            console.log(e);
        }
        // loading 끄기
        setLoading(false);
    };
    // 첫 렌더링 때 fetchData() 한 번 실행
    useEffect(() => {
        fetchData();
    }, []);

    const FirstRoute = (props: any) => (
        <View style={{ height: 500 }}>
            <View
                id="section_notification">
                <Text>알림 위치</Text>
                {/* contents mapping */}
                <Text>{contents}</Text>
            </View>
            {/* nav에 navigation 넣어줘야 하고.. 이걸 props로 받아야 하고... 이건 가장먼저 SceneMap에서 넣어줘야하고... api에서 불러오면 값하나로 통일될듯?*/}
        </View>
    );
    const SecondRoute = (props: any) => (
        <View style={{ height: 500 }}>
            <View
                id="section_messanger">
                <Text>쪽지함</Text>
                {/* message mapping */}
                <Text>{messageList}</Text>
            </View>

        </View>
    );

    //Tab View 항목 지정
    const renderScene = SceneMap({
        first: () => <FirstRoute nav={navigation} />,
        second: () => <SecondRoute nav={navigation} />,
    });

    const renderTabBar = (props: any) => (
        <View style={{
            flexDirection: 'column'
        }}>
            
            <TabBar
                {...props}

                renderLabel={({ route, focused, color }) => (
                    <Text style={{ margin: 4, fontSize: 18, color: '#fff' }}>
                        {route.title}
                    </Text>
                )}
                indicatorStyle={{ backgroundColor: 'white' }}
                style={{ backgroundColor: '#B77DE4' }}
            />
        </View>

    );

    return (
        <>
            <TabView
                //renderTabBar
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </>
    )
}

export default Page;

