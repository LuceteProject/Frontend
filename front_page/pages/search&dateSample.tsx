import React from 'react'
import { Alert, View } from 'react-native'
import { Text } from 'react-native'
import { DatePickerView, WhiteSpace } from '@ant-design/react-native'
import { DatePicker, List, Provider, SearchBar } from '@ant-design/react-native'
import { Calendar } from 'antd-mobile'

const locale = {
  prevText: '이전',
  nextText: '다음',
}
const localeDate = {
  DatePickerLocale : {
    year:'년',
    month:'월',
    day:'일',
    hour:'시',
    minute:'분',
    am:'오전',
    pm:'오후'
  },
  extra:'',
  okText:'OK',
  dismissText:'Cancel'
}

export default class SearchBarDemo extends React.Component<any, any> {
  
  state = {
    value: '검색어를 입력하세요.',
    
  }
  state2 = {
    value: undefined,
    value12hours: undefined,
  }
  onChange = (value: any) => {
    this.setState({ value })
  }
  onValueChange = (...args: any[]) => {
    console.log(args)
  }
  clear = () => {
    this.setState({ value: '' })
  }

  render() {
    return (
      
      <View style={{ marginTop: 30 }}>
        <Text style={{ margin: 16 }}>use12Hours</Text>
        <DatePickerView
          mode='date'
          locale={localeDate}
          value={this.state2.value12hours}
          onChange={(v) => this.setState({ value12hours: v })}
      
        />
        
      <WhiteSpace />
        <SearchBar defaultValue="검색어를 입력하세요." placeholder="검색" />
        <WhiteSpace />
        <SearchBar
          value={this.state.value}
          placeholder="검색"
          onSubmit={(value: any) => Alert.alert(value)}
          onCancel={this.clear}
          onChange={this.onChange}
          showCancelButton
          cancelText='취소'
        />
<WhiteSpace />
<Provider>
        <List>
          <DatePicker
            title="날짜 선택"
            mode="date"
            extra='날짜를 선택하세요.'
            locale={localeDate}
            defaultDate={new Date()}
            minDate={new Date(2015, 7, 6)}
            maxDate={new Date(2026, 11, 3)}
            onChange={this.onChange}
            format="YYYY-MM-DD">
            <List.Item arrow="horizontal">Select Date</List.Item>
          </DatePicker>
        </List>
      </Provider>
      </View>
      
    )
  }
}
