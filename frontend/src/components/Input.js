import React from 'react';
import { TextInput } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const Input = (props) => <TextInput {...props} style={globalStyles.input} placeholderTextColor="#9ca3af" />;

export default Input;
