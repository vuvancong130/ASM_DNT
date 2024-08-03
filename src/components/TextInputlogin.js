import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const TextInputlogin = ({
  label,
  icon,
  onIconPress,
  secureTextEntry,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          style={[props.style, styles.input]}
          placeholderTextColor={props.placeholderTextColor || '#C4C4C4'}
        />
        {icon && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
            <Icon name={icon} size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: 360,
  },
  label: {
    marginBottom: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 360,
    flex: 1,
    padding: 7,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
});

export default TextInputlogin;
