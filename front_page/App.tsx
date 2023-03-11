import {
  Button,
  Icon,
  List,
  Switch,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'


const MenuHandler = () => {
  
  const [disabled, setDisabled] = useState(true);

  useEffect( () => {
    console.log("changed");
  }, [disabled]);

  return (
    <ScrollView>
      <List renderHeader="알림">
        <List.Item extra={<Switch />}>공지사항</List.Item>
        <List.Item extra={<Switch />}>일정</List.Item>
        <List.Item extra={<Switch />}>쪽지</List.Item>
      </List>
      <List renderHeader="화면">
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onPress={()=> setDisabled(!disabled)}>
            글씨 크기
          </Button>
        </WingBlank>
      </List>
      <WhiteSpace />
      <List>
        <List.Item extra={<Switch checked color="black" />}>
          다크모드
        </List.Item>
      </List>
    </ScrollView>
  )
};


export default MenuHandler;