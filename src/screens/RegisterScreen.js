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
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showRepass, setShowRepass] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!email || !fullname || !pass || !repass) {
      Alert.alert('Error', 'Nhập đầy đủ thông tin.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Nhập email đúung địng dạng.');
      return;
    }

    if (pass !== repass) {
      Alert.alert('Error', 'Mật khẩu k trùng khớp.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        pass,
      );
      const user = userCredential.user;

      await firestore().collection('users').doc(user.uid).set({
        email: user.email,
        fullname: fullname,
        avartar:
          'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg',
        interest: null,
        weight: null,
        height: null,
        age: null,
        gender: null,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        'Success',
        'Tạo tài khoản thành công. hãy đăng nhập ngay nào!',
      );
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../img/Registerimg.png')} />
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={styles.title}>Create an Account</Text>
      </View>
      <View style={styles.form}>
        <TextInputlogin
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInputlogin
          placeholder="Full Name"
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInputlogin
          placeholder="Password"
          secureTextEntry={!showPass}
          value={pass}
          onChangeText={setPass}
          icon={showPass ? 'visibility-off' : 'visibility'}
          onIconPress={() => setShowPass(!showPass)}
        />
        <TextInputlogin
          placeholder="Confirm Password"
          secureTextEntry={!showRepass}
          value={repass}
          onChangeText={setRepass}
          icon={showRepass ? 'visibility-off' : 'visibility'}
          onIconPress={() => setShowRepass(!showRepass)}
        />
      </View>
      <View style={styles.footer}>
        <ButtonCustom label="Register" onPress={handleRegister} />
        <View style={styles.row}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101123',
    padding: 16,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  form: {
    marginTop: 50,
    width: '100%',
  },
  footer: {
    marginTop: 130,
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
  link: {
    color: '#FF8C00',
    fontSize: 15,
  },
});

export default RegisterScreen;
