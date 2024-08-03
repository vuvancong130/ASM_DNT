import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editContent, setEditContent] = useState('');

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
          console.error('Lỗi khi lấy thông tin người dùng: ', error);
        }
      }
      setLoading(false);
    };

    const fetchPosts = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const postsCollection = await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('post')
            .get();
          const postsData = await Promise.all(
            postsCollection.docs.map(async doc => {
              const postData = doc.data();
              return {id: doc.id, ...postData, ...userData};
            }),
          );
          setPosts(postsData);
        } catch (error) {
          console.error('Lỗi khi lấy bài viết: ', error);
        }
      }
    };
    fetchUserData();
    fetchPosts();
  }, [posts]);
  const deletePost = async postId => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('post')
        .doc(postId)
        .delete();
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      Alert.alert('Error', 'Xoá thất bại.');
    }
  };

  const confirmDelete = (postId, postIdUser) => {
    const currentUser = auth().currentUser;
    if (currentUser.uid !== postIdUser) {
      Alert.alert('Notification', 'Bạn không có quyền xoá bài viết này.');
      return;
    }

    Alert.alert(
      'Delete Post',
      'Bạn chắc chắn muốn xoá?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => deletePost(postId)},
      ],
      {cancelable: true},
    );
  };

  const editPost = async postId => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('post')
        .doc(postId)
        .update({content: editContent});
      setIsEditing(false);
      setEditContent('');
      setCurrentEditId(null);
    } catch (error) {
      Alert.alert('Error', 'Sửa thất bại.');
    }
  };

  const confirmEdit = (postId, postIdUser, currentContent) => {
    const currentUser = auth().currentUser;
    if (currentUser.uid !== postIdUser) {
      Alert.alert('Notification', 'Bạn không có quyền sửa bài viết này.');
      return;
    }

    setEditContent(currentContent);
    setCurrentEditId(postId);
    setIsEditing(true);
  };
  const renderPost = ({item}) => (
    <View style={{backgroundColor: '#D9D9D9', flex: 1, width: '100%'}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: item.avartar}}
            style={{width: 40, height: 40, borderRadius: 20, marginLeft: 15}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              {item.fullname}
            </Text>
            <Text style={{fontSize: 10}}>
              {item.date?.toDate().toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{margin: 10}}
            onPress={() => confirmEdit(item.id, item.iduser, item.content)}>
            <Image source={require('../img/cham.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 10}}
            onPress={() => confirmDelete(item.id, item.iduser)}>
            <Image source={require('../img/huyden.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {isEditing && currentEditId === item.id ? (
        <View style={{backgroundColor: '#D9D9D9'}}>
          <TextInput
            style={{
              margin: 15,
              color: 'black',
              fontSize: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}
            value={editContent}
            onChangeText={setEditContent}
            autoFocus={true}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => editPost(item.id)}
              style={{
                backgroundColor: '#F98921',
                width: 80,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}>
                Lưu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(false)}
              style={{
                backgroundColor: '#F98921',
                width: 80,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={{margin: 8, padding: 10, color: 'black', fontSize: 20}}>
          {item.content}
        </Text>
      )}
      <View style={{height: 7, backgroundColor: '#8B8A8A'}}></View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#101123'}}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="chevron-left" size={22} color={'white'} />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                  }}>
                  {userData.fullname}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('EditProfileScreen');
                    }}>
                    <Icon
                      name="pencil"
                      color={'white'}
                      size={22}
                      style={{marginRight: 15}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="search" color={'white'} size={22} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 150,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View
                  style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <Image
                    source={{uri: userData.avartar}}
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 75,
                      marginLeft: 10,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: '#8B8A8A',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                    }}>
                    <Icon name="camera" color={'white'} size={18} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 25,
                      marginLeft: 20,
                      fontWeight: 'bold',
                    }}>
                    {userData.fullname}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      marginLeft: 20,
                    }}>
                    1,5k bạn bè
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#D9D9D9',
                  width: 380,
                  height: 50,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 20,
                }}
                onPress={() => {
                  navigation.navigate('EditProfileScreen');
                }}>
                <Icon name="pencil" color={'black'} size={25} />
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 20,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Chỉnh sửa trang cá nhân
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#D9D9D9',
                    width: 90,
                    height: 40,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#0511F0',
                    }}>
                    Bài viết
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#D9D9D9',
                    width: 90,
                    height: 40,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: 'black',
                    }}>
                    Sở thích
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 23,
                  color: 'white',
                  width: '100%',
                  marginLeft: 20,
                  fontWeight: 'bold',
                }}>
                Bài viết của bạn
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                  height: 70,
                  width: '100%',
                }}>
                <Image
                  source={{uri: userData.avartar}}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    marginLeft: 10,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PostStatusScreen');
                  }}>
                  <Text style={{color: 'white', fontSize: 20, marginLeft: 20}}>
                    Bạn đang nghĩ gì?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        style={{width: '100%'}}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101123',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
