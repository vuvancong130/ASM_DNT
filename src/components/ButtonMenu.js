import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ButtonMenu = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[props.style, st.button]}
      activeOpacity={0.7}>
      {props.imageSource && (
        <Image source={props.imageSource} style={st.image} />
      )}
      <Text style={[st.buttonText, props.textStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonMenu;

const st = StyleSheet.create({
  button: {
    padding: 20,
    marginHorizontal: 10,
    marginBottom: -20,
    borderRadius: 20,
    backgroundColor: '#AAA9F8',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 180,
    height: 80,
  },
  buttonText: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
  },
  image: {
    width: 26,
    height: 26,
  },
});
