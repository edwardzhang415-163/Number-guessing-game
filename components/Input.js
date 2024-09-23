import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ style, ...props }) => {
  return <TextInput style={{ ...styles.input, ...style }} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});

export default Input;