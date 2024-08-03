import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const BMIScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [kq, setKQ] = useState('');
  const [goiY, setGoiy] = useState('');
  const [userData, setUserData] = useState(null);

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
            const data = userDoc.data();
            setUserData(data);
            setWeight(data.weight || '');
            setHeight(data.height || '');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (weight && height) {
      calculateBMI();
    } else {
      setBmi(null);
      setKQ('');
      setGoiy('');
    }
  }, [weight, height]);

  const calculateBMI = () => {
    const canNang = parseFloat(weight);
    const chieuCao = parseFloat(height) / 100;

    if (isNaN(canNang) || isNaN(chieuCao) || chieuCao <= 0) {
      return;
    }

    const bmiValue = canNang / (chieuCao * chieuCao);
    setBmi(bmiValue.toFixed(2));
    classifyBMI(bmiValue);
  };

  const classifyBMI = bmiValue => {
    let category = '';
    let suggestions = '';

    if (bmiValue < 18.5) {
      category = 'Thiếu cân';
      suggestions =
        'Gợi ý thực đơn: Thêm các bữa ăn nhẹ giàu protein và calo giữa các bữa chính. Sử dụng thực phẩm giàu calo và dinh dưỡng như bơ, các loại hạt và trái cây khô.';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Bình thường';
      suggestions =
        'Bữa sáng: Kết hợp protein từ trứng, carbohydrate từ bánh mì nguyên cám, và chất béo lành mạnh từ bơ. Bữa trưa: Kết hợp protein từ thịt gà, carbohydrate từ gạo lứt, và rau xanh. Bữa chiều: Trái cây tươi kết hợp với một nắm hạt để cung cấp chất béo lành mạnh. Bữa tối: Kết hợp protein từ cá hồi, rau củ và carbohydrate từ khoai lang hoặc quinoa. Bữa phụ: Sữa chua không đường kết hợp với các loại quả mọng hoặc một miếng phô mai và trái cây.';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Thừa cân';
      suggestions =
        'Gợi ý thực đơn: Ăn nhiều rau xanh, hạn chế thực phẩm giàu calo, và duy trì hoạt động thể chất.';
    } else if (bmiValue >= 30 && bmiValue < 35) {
      category = 'Béo phì cấp độ 1';
      suggestions =
        'Gợi ý thực đơn: Giảm lượng calo tiêu thụ, ưu tiên thực phẩm giàu chất xơ và protein, kết hợp với tập thể dục thường xuyên.';
    } else if (bmiValue >= 35 && bmiValue < 40) {
      category = 'Béo phì cấp độ 2';
      suggestions =
        'Gợi ý thực đơn: Tăng cường tiêu thụ rau củ quả, giảm thiểu thức ăn nhanh và đồ ngọt, và tập thể dục đều đặn.';
    } else {
      category = 'Béo phì cấp độ 3';
      suggestions =
        'Gợi ý thực đơn: Tư vấn với chuyên gia dinh dưỡng để có chế độ ăn uống và tập luyện phù hợp, tránh các thực phẩm chế biến sẵn và nhiều calo.';
    }

    setKQ(category);
    setGoiy(suggestions);
  };

  return (
    <ScrollView style={{backgroundColor: '#101123'}}>
      <View style={{backgroundColor: '#101123', flex: 1, alignItems: 'center'}}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#282A51',
            height: 50,
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            BMI
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 150,
          }}>
          <View style={{margin: 10}}>
            <Text style={{color: 'white', marginBottom: 10}}>Weight (kg)</Text>
            <TextInput
              placeholder="Nhập cân nặng"
              placeholderTextColor={'gray'}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: 'white',
                width: 140,
                height: 40,
                borderRadius: 10,
                color: 'white',
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View style={{margin: 10}}>
            <Text style={{color: 'white', marginBottom: 10}}>Height(cm)</Text>
            <TextInput
              placeholder="Nhập chiều cao"
              placeholderTextColor={'gray'}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: 'white',
                width: 140,
                height: 40,
                borderRadius: 10,
                color: 'white',
                paddingHorizontal: 10,
              }}
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#282A51',
            width: 300,
            height: 140,
            borderRadius: 20,
            marginTop: 40,
            padding: 20,
          }}>
          <Text style={{color: 'white', fontSize: 25, marginBottom: 30}}>
            BMI Results
          </Text>
          {bmi && (
            <>
              <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                {bmi}
              </Text>
              <Text
                style={{
                  color: kq === 'Bình thường' ? 'green' : 'red',
                  fontSize: 25,
                }}>
                {kq}
              </Text>
            </>
          )}
        </View>
        {goiY && (
          <View style={{margin: 15}}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                width: 310,
                textAlign: 'justify',
              }}>
              Dựa trên chỉ số BMI của bạn chúng tôi có gợi ý cho bạn thực đơn
              cho 1 ngày:
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: 15,
                width: 310,
                textAlign: 'justify',
                marginTop: 10,
              }}>
              {goiY}
            </Text>

            <Text
              style={{
                color: 'gray',
                fontSize: 15,
                fontWeight: 'bold',
                width: 310,
                textAlign: 'justify',
                marginTop: 20,
              }}>
              Lưu ý: Uống đủ nước, hạn chế đồ ngọt và thực phẩm chế biến sẵn,
              tập thể dục đều đặn.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BMIScreen;

const styles = StyleSheet.create({});
