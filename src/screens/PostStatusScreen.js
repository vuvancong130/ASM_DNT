import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PostStatusScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          // Lấy thông tin người dùng từ Firestore
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const postStatus = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Hãy viết gì đó');
      return;
    }

    try {
      const user = auth().currentUser;
      if (user) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('post')
          .add({
            iduser: user.uid,
            content: content,
            date: firestore.FieldValue.serverTimestamp(),
          });

        Alert.alert('Success', 'Đăng bài thành công!');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', 'Bạn phải đăng nhập trước khi đăng bài.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#282A51',
          height: 60,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{marginLeft: 25}}>
          <Image source={require('../img/huy.png')} />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Tạo bài viết
        </Text>
        <TouchableOpacity onPress={postStatus}>
          <Text
            style={{
              color: '#3DB3F2',
              fontSize: 15,
              fontWeight: 'bold',
              marginRight: 25,
            }}>
            Đăng
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          height: 70,
        }}>
        <Image
          source={{uri: userData.avartar}}
          style={{height: 50, width: 50, borderRadius: 25, marginLeft: 30}}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
          {userData.fullname}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Bạn đang nghĩ gì?"
        placeholderTextColor="#000000"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={100}
      />
    </View>
  );
};

export default PostStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101123',
  },
  input: {
    width: 400,
    height: 420,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    marginLeft: 5,
    alignItems: 'flex-start',
    backgroundColor: '#CCC9C9',
    color: 'black',
  },
});
