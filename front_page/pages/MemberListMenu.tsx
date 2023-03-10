// tslint:disable:no-empty
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { List, NoticeBar } from '@ant-design/react-native'

const Item = List.Item
const Brief = Item.Brief

export default class BasicListExample extends React.Component<any, any> {
  render() {
    return (
      
      <ScrollView
        style={{ flex: 1, backgroundColor: '#f5f5f9' }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        
        <Text>Prototype</Text>

        <NoticeBar
          /** 중요 공지사항 가장 위쪽에 올리는 용도로 사용
           * mode='link' 다른 게시글에 연결 가능
           * marqueeProps 속성 설정
           * 
           */
          mode='link'
          marqueeProps={{ loop: true, style: { fontSize: 15, color: 'red' } }}>
          Notice: 여기에 공지사항을 넣으면 될것 같은데 달력 쪽에?
        </NoticeBar> 
        <List renderHeader={'회장'}>
          <Item
            // 하나의 Item에 한 명씩 정보 불러오기
            // thumb : image link, extra : 오른쪽에 sub로 들어가는 text, multipleLine : 여러줄 가능
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            extra={
              <View>
                <Brief style={{ textAlign: 'right' }}>01012345678</Brief>
                <Brief style={{ textAlign: 'right' }}>mail@gmail.com</Brief>
              </View>
            }
            // View Component 안에 <Brief> 커스텀 컴포넌트 사용해 추가내용 넣음
            multipleLine>
            기수 이름
            <Brief>회장</Brief>
            <Brief style={{ color: 'blue' }}>"상태메시지"</Brief>
          </Item>


        </List>
        <List renderHeader={'극본팀'/*팀이름 여기에*/}> 
          <Item
            // 하나의 Item에 한 명씩 정보 불러오기
            // thumb : image link, extra : 오른쪽에 sub로 들어가는 text, multipleLine : 여러줄 가능
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            extra={
              <View>
                <Brief style={{ textAlign: 'right' }}>01012345678</Brief>
                <Brief style={{ textAlign: 'right' }}>mail@gmail.com</Brief>
              </View>
            }
            // View Component 안에 <Brief> 커스텀 컴포넌트 사용해 추가내용 넣음
            multipleLine>
            기수 이름
            <Brief>팀장</Brief>
            <Brief style={{ color: 'blue' }}>"상태메시지"</Brief>
          </Item>

          <Item
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            extra={
              <View>
                <Brief style={{ textAlign: 'right' }}>01012345678</Brief>
                <Brief style={{ textAlign: 'right' }}>mail@gmail.com</Brief>
              </View>
            }
            multipleLine>
            기수 이름
            <Brief>무슨 팀</Brief>
            <Brief style={{ color: 'blue' }}>"길이 제한 20자?"</Brief>
          </Item>

          


        </List>
        <List renderHeader={'게시판 포맷은?'} 
        >
          <Item
            extra={
                <Brief>댓글 수</Brief>
            }
            multipleLine>
            게시글 제목 /*title*/
            <Brief>작성 시간</Brief>
          </Item>



          <Item
            extra={
              <View>
                ㄴ3
                <Brief style={{ textAlign: 'right' }}>2023.03.10 14:22</Brief>
              </View>
            }
            multipleLine
            align="bottom">
            게시글 제목 /*title*/
          </Item>
        </List>

        <List renderHeader={'썸네일 가져오기'}>

          <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png">
            thumb
          </Item>
          <Item
            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            arrow="horizontal">
            thumb
          </Item>
          <Item
            extra={
              <Image
                source={{
                  uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
                }}
                style={{ width: 29, height: 29 }}
              />
            }
            arrow="horizontal">
            extra为Image
          </Item>
        </List>
      </ScrollView>
    )
  }
}

export const title = 'List'
export const description = 'List Example'
