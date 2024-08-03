import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const [newValue, setNewValue] = useState('');

  const [newInterest, setNewInterest] = useState('');

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
          console.error('Lỗi khi lấy dữ liệu người dùng: ', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const updateUserData = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({[editField]: newValue});
        setUserData(prevData => ({...prevData, [editField]: newValue}));
        setIsEditing(false);
      } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu người dùng: ', error);
        Alert.alert('Lỗi', 'Không thể cập nhật dữ liệu.');
      }
    }
  };
  const updateInterests = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({interest: newValue});
        setUserData(prevData => ({...prevData, interest: newValue}));
        setIsEditing(false);
      } catch (error) {
        console.error('Lỗi khi cập nhật sở thích: ', error);
        Alert.alert('Lỗi', 'Không thể cập nhật sở thích.');
      }
    }
  };

  const addInterest = () => {
    if (newInterest && !newValue.includes(newInterest)) {
      setNewValue([...newValue, newInterest]);
      setNewInterest('');
    }
  };

  const removeInterest = interest => {
    setNewValue(newValue.filter(item => item !== interest));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#101123'}}>
      <View style={{flex: 1, backgroundColor: '#101123'}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#282A51',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={22} color={'white'} />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 20, marginHorizontal: 70}}>
            Chỉnh sửa trang cá nhân
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              width: '100%',
            }}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
              Ảnh đại diện
            </Text>
            <TouchableOpacity>
              <Text
                style={{color: '#353EED', fontSize: 16, fontWeight: 'bold'}}>
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{uri: userData?.avartar}}
            style={{width: 150, height: 150, borderRadius: 75}}
          />
        </View>

        <EditSection
          label="Tên người dùng"
          value={userData?.fullname}
          onEdit={() => {
            setEditField('fullname');
            setNewValue(userData?.fullname);
            setIsEditing(true);
          }}
        />

        <EditSection
          label="Sở thích"
          value={userData?.interest.join(', ')}
          onEdit={() => {
            setEditField('interest');
            setNewValue(userData?.interest);
            setIsEditing(true);
          }}
        />

        <EditSection
          label="Chiều cao"
          value={`${userData?.height} cm`}
          onEdit={() => {
            setEditField('height');
            setNewValue(userData?.height);
            setIsEditing(true);
          }}
        />

        <EditSection
          label="Cân nặng"
          value={`${userData?.weight} kg`}
          onEdit={() => {
            setEditField('weight');
            setNewValue(userData?.weight);
            setIsEditing(true);
          }}
        />

        <EditSection
          label="Tuổi"
          value={`${userData?.age} tuổi`}
          onEdit={() => {
            setEditField('age');
            setNewValue(userData?.age);
            setIsEditing(true);
          }}
        />

        <EditSection
          label="Giới tính"
          value={userData?.gender}
          onEdit={() => {
            setEditField('gender');
            setNewValue(userData?.gender);
            setIsEditing(true);
          }}
        />

        <Modal
          transparent={true}
          visible={isEditing}
          animationType="slide"
          onRequestClose={() => setIsEditing(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Chỉnh sửa {editField === 'tên' ? 'Tên người dùng' : editField}
              </Text>
              {editField === 'gender' ? (
                <View style={styles.genderButtons}>
                  <TouchableOpacity
                    onPress={() => setNewValue('Nam')}
                    style={[
                      styles.genderButton,
                      newValue === 'Nam' && styles.selectedGenderButton,
                    ]}>
                    <Text style={styles.genderButtonText}>Nam</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setNewValue('Nữ')}
                    style={[
                      styles.genderButton,
                      newValue === 'Nữ' && styles.selectedGenderButton,
                    ]}>
                    <Text style={styles.genderButtonText}>Nữ</Text>
                  </TouchableOpacity>
                </View>
              ) : editField === 'interest' ? (
                <View style={{width: '100%'}}>
                  {newValue.map((interest, index) => (
                    <View key={index} style={styles.interestItem}>
                      <Text style={styles.interestText}>{interest}</Text>
                      <TouchableOpacity
                        onPress={() => removeInterest(interest)}>
                        <Text style={styles.removeInterestText}>X</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TextInput
                    style={styles.modalInput}
                    value={newInterest}
                    onChangeText={setNewInterest}
                    placeholder="Thêm sở thích mới"
                  />
                  <TouchableOpacity
                    onPress={addInterest}
                    style={styles.addInterestButton}>
                    <Text style={styles.addInterestButtonText}>Thêm</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TextInput
                  style={styles.modalInput}
                  value={newValue}
                  onChangeText={setNewValue}
                />
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={updateUserData}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsEditing(false)}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const EditSection = ({label, value, onEdit}) => (
  <View style={{alignItems: 'center', marginBottom: 20}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        width: '100%',
      }}>
      <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
        {label}
      </Text>
      <TouchableOpacity onPress={onEdit}>
        <Text style={{color: '#353EED', fontSize: 16, fontWeight: 'bold'}}>
          Chỉnh sửa
        </Text>
      </TouchableOpacity>
    </View>
    <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    margin: 5,
    backgroundColor: '#F98921',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ccc',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedGenderButton: {
    backgroundColor: 'green',
  },
  genderButtonText: {
    color: 'white',
    fontSize: 16,
  },
  interestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  interestText: {
    fontSize: 16,
  },
  removeInterestText: {
    color: 'red',
    fontWeight: 'bold',
  },
  addInterestButton: {
    padding: 10,
    backgroundColor: '#353EED',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addInterestButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderButton: {
    width: '45%',
    margin: 5,
    backgroundColor: '#ccc',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedGenderButton: {
    backgroundColor: 'green',
  },
  genderButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfileScreen;
