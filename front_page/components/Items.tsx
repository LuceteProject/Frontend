import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
interface ItemProps {
    notice: Notice; // Notice 타입의 객체를 전달받을 수 있도록 props 설정
    nav: any;
}
interface Notice {
    id: number;
    title: string;
    //author_name: string;
    updated: string;
    content: string;
    permission: number;
}

const Item = (props: ItemProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const diffInMilliseconds = today.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        } else {
            const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
            const day = date.getDate();
            return `${month}월 ${day}일`;
        }
    };

    const handleClick = () => {
        if (props.notice.id !== 0) {
            //props.nav.navigate('ViewPost', { postId: props.data.id });
        }
        console.log("pressed");
    };
    return (
        // 각 게시글 항목
        <TouchableOpacity onPress={handleClick} disabled={props.notice.id === 0}>
            <View style={styles.container}>
                {props.notice.id === 0 ? (
                    <View >
                        <Text style={styles.titlefont}> {props.notice.title} </Text>
                        <Text> {props.notice.content} </Text>

                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text>
                            서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
                        </Text>
                    </View>
                )}
                <Text style={styles.datefont}>
                    {formatDate(props.notice.updated)}{' '}
                </Text>
            </View>
            <View
                // 구분선
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
        </TouchableOpacity>
    );
}

export default Item;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10,
    }
    ,
    basicfont: {
        fontSize: 16,
        color: '#000'
    },
    coments: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#eeeeee'
    },
    titlefont: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    datefont: {
        fontSize: 14,
        color: 'gray',
        padding: 3
    }
});
