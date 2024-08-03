import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ButtonMenu from '../components/ButtonMenu';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#101123'}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>
            Menu
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity>
              <Image
                style={{marginRight: 15}}
                source={require('../img/setting.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{marginRight: 15}}
                source={require('../img/search.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            backgroundColor: '#AAA9F8',
            alignItems: 'center',
            height: 86,
            width: 380,
            borderRadius: 20,
            marginTop: 20,
          }}>
          <Image
            source={{uri: userData.avartar}}
            style={{height: 50, width: 50, borderRadius: 25, marginLeft: 30}}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                marginLeft: 20,
                fontWeight: 'bold',
              }}>
              {userData.fullname}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', padding: 20}}>
          <ButtonMenu
            label="Bạn bè"
            imageSource={require('../img/friends.png')}
            onPress={() => console.log('Button Pressed')}
          />
          <ButtonMenu
            label="Nhóm"
            imageSource={require('../img/Group.png')}
            onPress={() => console.log('Button Pressed')}
          />
        </View>
        <View style={{flexDirection: 'row', padding: 20}}>
          <ButtonMenu
            label="Tư vấn tâm lý"
            imageSource={require('../img/tamly.png')}
            onPress={() => console.log('Button Pressed')}
          />
          <ButtonMenu
            label="Mục tiêu"
            imageSource={require('../img/muctieu.png')}
            onPress={() => console.log('Button Pressed')}
          />
        </View>
        <View style={{flexDirection: 'row', padding: 20}}>
          <ButtonMenu
            label="Gợi ý"
            imageSource={require('../img/goiy.png')}
            onPress={() => console.log('Button Pressed')}
          />
          <ButtonMenu
            label="...."
            imageSource={require('../img/friends.png')}
            onPress={() => console.log('Button Pressed')}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: 380,
            height: 50,
            backgroundColor: '#B7B6CD',
            marginTop: 20,
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Icon name="home" color={'white'} size={28} />
          <Text
            style={{fontSize: 18, fontWeight: 'bold', marginHorizontal: 20}}>
            Trợ giúp & hỗ trợ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: 380,
            height: 50,
            backgroundColor: '#B7B6CD',
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Icon name="cog" color={'white'} size={28} />
          <Text
            style={{fontSize: 18, fontWeight: 'bold', marginHorizontal: 20}}>
            Cài đặt & quyền riêng tư
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: 380,
            height: 50,
            backgroundColor: '#B7B6CD',
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Icon name="gamepad" color={'white'} size={28} />
          <Text
            style={{fontSize: 18, fontWeight: 'bold', marginHorizontal: 20}}>
            Quyền truy cập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: 380,
            height: 50,
            backgroundColor: '#AAA9F8',
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{fontSize: 18, fontWeight: 'bold', marginHorizontal: 20}}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101123',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  menu: {
    alignItems: 'flex-end',
  },
});
