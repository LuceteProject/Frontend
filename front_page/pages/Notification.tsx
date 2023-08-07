import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Item from '../components/Items';
interface Notice {
    id: number;
    title: string;
    //author_name: string;
    updated: string;
    content: string;
    permission: number;
}

const dummyNotice: Notice = {
    id: 0,
    title: "알림 1",
    updated: "",
    content: "테스트 컴포넌트 1",
    permission: 0
  };

const Page = ({ navigation }: any) => {
    /* API variables */
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState<Notice>(dummyNotice); //notification list
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
                    setContents(response.data);
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

    /* fetchData를 Item mapping해야함 */
    return (
        <>
            <Item notice={dummyNotice} nav={undefined}/>
        </>
    )
}

export default Page;

