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
    /* fetchData */
    

    /* fetchData를 Item mapping해야함 */
    return (
        <>
            <Item notice={dummyNotice} nav={undefined}/>
        </>
    )
}

export default Page;

