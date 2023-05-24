import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View, Alert, Button, TouchableOpacity, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';

const Page = ({ navigation }: any) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '알림' },
        { key: 'second', title: '쪽지함' },
    ]);

    const FirstRoute = (props: any) => (
        <View style={{ height: 500 }}>
            <View
                id="section_notification"
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>알림 위치</Text>
            </View>
            {/* nav에 navigation 넣어줘야 하고.. 이걸 props로 받아야 하고... 이건 가장먼저 SceneMap에서 넣어줘야하고... api에서 불러오면 값하나로 통일될듯?*/}
        </View>
    );
    const SecondRoute = (props: any) => (
        <View style={{ height: 500 }}>
            <View
                id="section_messanger"
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>쪽지함</Text>
            </View>

        </View>
    );

    //Tab View 항목 지정
    const renderScene = SceneMap({
        first: () => <FirstRoute nav={navigation} title="sample" author="lee" wtime="2023/01/05" reply='3' />,
        second: () => <SecondRoute nav={navigation} title="sample" author="lee" wtime="2023/01/05" reply='3' />,
    });

    return (
        <>
            <TabView
                //renderTabBar
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
            />
        </>
    )
}

export default Page;

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
});
