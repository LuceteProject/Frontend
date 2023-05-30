import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FindPasswordFormData {
  username: string;
  email: string;
}

const FindPasswordScreen: React.FC = () => {
  const [formData, setFormData] = useState<FindPasswordFormData>({
    username: '',
    email: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // 비밀번호 찾기 데이터 처리 로직 작성
    console.log(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>아이디:</Text>
      <TextInput
        style={styles.input}
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
      />

      <Text style={styles.label}>이메일:</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />

      <Button title="비밀번호 찾기" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
});

export default FindPasswordScreen;
