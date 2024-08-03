import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TextInputlogin from '../components/TextInputlogin';
import ButtonCustom from '../components/ButtonCustom';
import auth from '@react-native-firebase/auth';
import {useAuth} from './AuthContext';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('c@gmail.com');
  const [pass, setPass] = useState('123123');
  const [isRemember, setIsRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const {login} = useAuth();
  const handleLogin = async () => {
    if (!username || !pass) {
      Alert.alert('Error', 'Vui lòng nhập email và mật khẩu.');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(username, pass);
      login();
      navigation.navigate('HomeScreen');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Email không hợp lệ.');
      } else if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert('Error', 'Thông tin đăng nhập không chính xác.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 60, alignItems: 'center'}}>
        <Image source={require('../img/loginimg.png')} />
        <Text style={{color: 'white', marginTop: 10}}>Welcome to the</Text>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Personal Development App
        </Text>
      </View>
      <View style={{marginTop: 60}}>
        <TextInputlogin
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
        />
        <TextInputlogin
          placeholder="Password"
          secureTextEntry={!showPass}
          value={pass}
          onChangeText={setPass}
          icon={showPass ? 'visibility-off' : 'visibility'}
          onIconPress={() => setShowPass(!showPass)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 230,
          }}>
          <CheckBox
            disabled={false}
            style={{color: 'white'}}
            onCheckColor="white"
            onTintColor="white"
            onFillColor="white"
            tintColors={{true: 'white', false: 'white'}}
            value={isRemember}
            onValueChange={v => setIsRemember(v)}
          />
          <Text style={{color: 'white'}}>Remember Me</Text>
        </View>
      </View>
      <View style={{marginTop: 190}}>
        <ButtonCustom label="Login" onPress={handleLogin} />
        <View style={styles.row}>
          <Text style={styles.register1}>Don’t have an account? Click</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            <Text style={styles.register2}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row1}>
          <Text style={styles.register1}>Forgot Password? Click</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}>
            <Text style={styles.register2}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101123',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  register1: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 10,
  },
  register2: {
    color: '#FF8C00',
    fontSize: 15,
    marginRight: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
