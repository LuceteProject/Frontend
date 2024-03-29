import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import WebView from 'react-native-webview';
import axios from "axios";

import FindUsernameScreen from './FindUsernameScreen';
import FindPasswordScreen from './FindPasswordScreen';
import SignUpScreen from './SignUp';
interface LoginFormData {
  email: string;
  password: string;
}

const Stack = createStackNavigator();

const Screen = ({ navigation }: any) => {
  const [isWebViewVisible, setWebViewVisible] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [autoLogin, setAutoLogin] = useState(false);

  const handleSubmit = async() => {
    const email = formData.email;
    const password = formData.password;
    try {
      const response = await axios.post("https://lucetemusical.com/api/v1/users/login", {
        email,
        password
      });
      if(response.status === 200 && response.data){
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  };

  const handleCloseWebView = () => {
    setWebViewVisible(false);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');  // 'SignUp'은 회원가입 페이지의 라우트 이름입니다.
    
    console.log('회원가입 버튼 클릭');
  };

  const handleFindUsername = () => {
    navigation.navigate('FindUsername');
  };

  const handleFindPassword = () => {
    navigation.navigate('FindPassword');
  };

  const handleAutoLoginToggle = () => {
    setAutoLogin((prevAutoLogin) => !prevAutoLogin);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const Main = () => {
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../img/logo.jpg')} style={styles.image} />
      </View>
      <Text style={styles.label}>아이디:</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <Text style={styles.label}>비밀번호:</Text>
      <TextInput
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleAutoLoginToggle}
      >
        <View style={[styles.checkbox, autoLogin && styles.checkedCheckbox]} />
        <Text style={styles.checkboxLabel}>자동 로그인</Text>
      </TouchableOpacity>
      <Button title="로그인" onPress={handleSubmit} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isWebViewVisible}
      >
        <WebView source={{ uri: `https://lucetemusical.com/oauth2/authorization/naver` }}  style={{ flex: 1 }}/>
        <Button title="닫기" onPress={handleCloseWebView} />
      </Modal>
      <View style={styles.forgotContainer}>
        <Text style={styles.forgotText} onPress={handleFindUsername}>
          아이디 찾기
        </Text>
        <Text style={styles.forgotText} onPress={handleFindPassword}>
          비밀번호 찾기
        </Text>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>계정이 없으신가요?</Text>
        <Text style={styles.signupButton} onPress={handleSignUp}>
          회원가입
        </Text>
      </View>
    </SafeAreaView>
    )
  };

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false}}>
      
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: '회원가입',
          }}
        />
        <Stack.Screen
          name="FindUsername"
          component={FindUsernameScreen}
          options={{
            title: '아이디 찾기',
          }}
        />
        <Stack.Screen
          name="FindPassword"
          component={FindPasswordScreen}
          options={{
            title: '비밀번호 찾기',
          }}
        />

      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  forgotText: {
    fontSize: 14,
    color: '#007AFF',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    marginRight: 4,
  },
  signupButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default Screen;
