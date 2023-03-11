// tslint:disable:no-empty
import React from 'react'
import { StyleSheet, Image, ScrollView, Text, View, FlatList, SafeAreaView} from 'react-native'
import { List, NoticeBar } from '@ant-design/react-native'

const Item = List.Item
const Brief = Item.Brief

const BoardList = ()=> {

  
    return (
      <>
      <SafeAreaView>
        
      </SafeAreaView>
      
      <ScrollView
        style={styles.background}
        // 이게 뭔지 나도 찾아봐야함
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        <Text>Prototype</Text>

        <List renderHeader={'게시판 포맷은?'}
        >
          <Item
            extra={<Brief>댓글 수</Brief>}
            multipleLine>
            게시글 제목 /*title*/
            <Brief>작성 시간</Brief>
          </Item>

          <Item
            extra={<View>
              ㄴ3
              <Brief style={{ textAlign: 'right' }}>2023.03.10 14:22</Brief>
            </View>}
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
            extra={<Image
              source={{
                uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
              }}
              style={{ width: 29, height: 29 }} />}
            arrow="horizontal">
            extra Image
          </Item>
        </List>
        
      </ScrollView>
      <View
      style={ {paddingBottom: 20}}>
      </View>
      </>
    )
}
export default BoardList;

const styles = StyleSheet.create({
  background : {
          flex: 1, 
          backgroundColor: '#f5f5f9',
        },

  centeredView: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        },
});