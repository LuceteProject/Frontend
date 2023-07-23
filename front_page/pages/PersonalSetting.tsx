import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard, TextInput, Button, FlatList, Switch } from 'react-native';

import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

const Page = () => {
  
  const [disabled, setDisabled] = useState(true);
  const [isEnabled_1, setIsEnabled_1] = useState(false);
  const [isEnabled_2, setIsEnabled_2] = useState(false);
  const [isEnabled_3, setIsEnabled_3] = useState(false);
  const [isEnabled_4, setIsEnabled_4] = useState(false);
  const [Check, setCheck] = useState(false);


  const toggleSwitch_1 = () => setIsEnabled_1(previousState => !previousState);
  const toggleSwitch_2 = () => setIsEnabled_2(previousState => !previousState);
  const toggleSwitch_3 = () => setIsEnabled_3(previousState => !previousState);
  const toggleSwitch_4 = () => setIsEnabled_4(previousState => !previousState);
  const Checked = () => {setCheck((checking) => !checking);};


  useEffect( () => {
    console.log("changed");
  }, [disabled]);

  return (
    <View>
      <Text style={styles.basicfont}>알림</Text>
      <View style={styles.Container}>
        <Text style={styles.boldfont}>공지사항</Text>
        <Switch
        trackColor={{false: '#767577', true: '#BCC7DC'}}
        thumbColor={isEnabled_1 ? '#B77DE4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch_1}
        value={isEnabled_1}
        />
      </View>
      <View style={styles.Container}>
        <Text style={styles.boldfont}>일정</Text>
        <Switch
        trackColor={{false: '#767577', true: '#BCC7DC'}}
        thumbColor={isEnabled_2 ? '#B77DE4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch_2}
        value={isEnabled_2}
        />
      </View>
      <View style={styles.Container}>
        <Text style={styles.boldfont}>쪽지</Text>
        <Switch
        trackColor={{false: '#767577', true: '#BCC7DC'}}
        thumbColor={isEnabled_3 ? '#B77DE4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch_3}
        value={isEnabled_3}
        />
      </View>
      <Text style={styles.basicfont}>화면</Text>
      <View style={styles.Container}>
        <Text style={styles.boldfont}>글씨 크기</Text>
      </View>
      <View style={styles.basicContainer}>
        <Text style={styles.boldfont}>기본 색상</Text>
        <View style={styles.ColorContainer}>
          <View>
            <Text style={styles.boldfont}>Dark</Text>
          </View>
          <View>
            <Text style={styles.boldfont}>White</Text>
          </View>
        </View>
        <View style={styles.AngleContainer}>
          <View style={styles.BlackRect}></View>
          <View style={styles.WhiteRect}></View>          
        </View>
        <View style={styles.CheckContainer}>
          <TouchableOpacity
          onPress={Checked}
          >
          <View style={[styles.checkbox, Check && styles.checkedCheckbox]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Checked}
          >
          <View style={[styles.checkbox, !Check && styles.checkedCheckbox]} />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};


export default Page;

const styles = StyleSheet.create({
  basicscreen:{
    flex: 1,
    backgroundColor: '#fafafa'
  },
  basicContainer:{
    backgroundColor: '#fff',
    padding: 10,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10
  },
  ColorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 80
  },
  AngleContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 55
  },
  boldfont:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000'
  },
  basicfont: {
    paddingVertical: 14,
    fontSize: 18,
  },
  BlackRect:{
    width: 100,
    height: 180,
    borderColor: '#000',
    borderWidth: 2.5,
    backgroundColor: '#000'
  },
  WhiteRect:{
    width: 100,
    height: 180,
    borderColor: '#000',
    borderWidth: 2.5
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  CheckContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 95
  }
})