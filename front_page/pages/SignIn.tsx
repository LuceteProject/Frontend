import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // 로그인 데이터 처리 로직 작성
    console.log(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../img/logo.jpg')}
          style={styles.image}
        />
      </View>

      <Text style={styles.label}>아이디:</Text>
      <TextInput
        style={styles.input}
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
      />

      <Text style={styles.label}>비밀번호:</Text>
      <TextInput
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />

      <Button title="로그인" onPress={handleSubmit} />

      <View style={styles.forgotContainer}>
        <Text style={styles.forgotText} onPress={() => console.log('아이디 찾기 버튼 클릭')}>
          아이디 찾기
        </Text>
        <Text style={styles.forgotText} onPress={() => console.log('비밀번호 찾기 버튼 클릭')}>
          비밀번호 찾기
        </Text>
      </View>
    </SafeAreaView>
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
});

export default LoginScreen;
