import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

// định nghĩa section
const Section = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
Section.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#282A51',
  },
});

export default Section;
