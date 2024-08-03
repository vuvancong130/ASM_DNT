import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/loginimg.png')}
        style={{marginBottom: 30}}
      />
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
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101123',
  },
});
