import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomButton = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[props.style, st.button]}
      activeOpacity={0.7}>
      <Text style={[st.buttonText, props.textStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const st = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F98921',
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
