import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import TextInputlogin from '../components/TextInputlogin';
import ButtonCustom from '../components/ButtonCustom';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleSendResetLink = async () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Thành công',
        'Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra email để tiếp tục.',
      );
      navigation.navigate('LoginScreen');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Lỗi', 'Email không hợp lệ. Vui lòng kiểm tra lại.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Lỗi', 'Email không tồn tại trong hệ thống.');
      } else {
        Alert.alert(
          'Lỗi',
          'Không thể gửi liên kết đặt lại mật khẩu. Vui lòng thử lại sau.',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../img/loginimg.png')} />
        <Text style={styles.headerText}>Forgot Password</Text>
        <Text style={styles.subHeaderText}>Reset Your Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInputlogin
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonCustom label="Send Reset Link" onPress={handleSendResetLink} />
        <View style={styles.row}>
          <Text style={styles.text}>Remember? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.linkText}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101123',
    padding: 20,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
  },
  subHeaderText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 60,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 10,
  },
  linkText: {
    color: '#FF8C00',
    fontSize: 15,
  },
});
