import { SafeArea } from 'antd-mobile';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignUpFormData {
    username: string;
    password: string;
    confirmPassword: string;
    teamType: string;
    role: string;
    batch: number;
    name: string;
    phoneNumber: string;
    email: string;
}

const SignUpScreen: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        username: '',
        password: '',
        confirmPassword: '',
        teamType: '',
        role: '',
        batch: 0,
        name: '',
        phoneNumber: '',
        email: '',
    });

    const handleChange = (name: string, value: string | number) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'batch' ? Number(value) : value,
        }));
    };

    const handleSubmit = () => {
        // 회원가입 데이터 처리 로직 작성
        console.log(formData);
    };

    const validatePassword = (password: string) => {
        // 비밀번호는 8자 이상이어야 합니다.
        return password.length >= 8;
    };

    const validateEmail = (email: string) => {
        // 이메일 형식을 검사합니다.
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        // 전화번호 형식을 검사합니다.
        const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
        return phoneNumberRegex.test(phoneNumber);
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text style={styles.label}>아이디:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(text) => handleChange('username', text)}
                />
                <Button title="중복확인" onPress={() => console.log('중복확인 버튼 클릭')} />

                <Text style={styles.label}>비밀번호:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry
                />
                {!validatePassword(formData.password) && (
                    <Text style={styles.errorText}>비밀번호는 8자 이상이어야 합니다.</Text>
                )}

                <Text style={styles.label}>비밀번호 확인:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    secureTextEntry
                />
                {formData.password !== formData.confirmPassword && (
                    <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
                )}

                <Text style={styles.label}>팀 종류:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.teamType}
                    onChangeText={(text) => handleChange('teamType', text)}
                />

                <Text style={styles.label}>역할:</Text>

                <Text style={styles.label}>기수:</Text>
                <TextInput
                    style={styles.input}
                    value={String(formData.batch)}
                    onChangeText={(text) => handleChange('batch', Number(text))}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>이름:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                />

                <Text style={styles.label}>전화번호:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phoneNumber}
                    onChangeText={(text) => handleChange('phoneNumber', text)}
                    keyboardType="phone-pad"
                />
                {!validatePhoneNumber(formData.phoneNumber) && (
                    <Text style={styles.errorText}>전화번호 형식이 올바르지 않습니다. (XXX-XXXX-XXXX)</Text>
                )}

                <Text style={styles.label}>이메일:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                />
                {!validateEmail(formData.email) && (
                    <Text style={styles.errorText}>이메일 형식이 올바르지 않습니다.</Text>
                )}

                <Button title="가입신청" onPress={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
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
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginBottom: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        fontSize: 16,
        color: 'black',
    },
    inputAndroid: {
        marginBottom: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        fontSize: 16,
        color: 'black',
    },
});

export default SignUpScreen;
