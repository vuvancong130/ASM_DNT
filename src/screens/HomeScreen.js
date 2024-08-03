import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const navigation = useNavigation();

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
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderPost = ({item}) => (
    <View style={{backgroundColor: '#D9D9D9'}}>
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 20,
        }}>
        <TouchableOpacity>
          <Image
            style={{marginRight: 15}}
            source={require('../img/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{marginRight: 15}}
            source={require('../img/message.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          backgroundColor: '#282A51',
          alignItems: 'center',
          height: 70,
        }}>
        <Image
          source={{uri: userData.avartar}}
          style={{height: 50, width: 50, borderRadius: 25, marginLeft: 30}}
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
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101123',
    flexDirection: 'column',
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

export default HomeScreen;
