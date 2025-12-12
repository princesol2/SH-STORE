import React from 'react';
import { TextInput } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const Input = ({ style, placeholderTextColor = '#9ca3af', ...rest }) => (
  <TextInput
    {...rest}
    style={[globalStyles.input, style]}
    placeholderTextColor={placeholderTextColor}
  />
);

export default Input;
