import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import { globalStyles } from '../styles/globalStyles';
import api from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Logging in (placeholder)', { email, password });
    try {
      await api.post('/api/vendor/login', { email, password });
    } catch (error) {
      // placeholder ignore errors
    }
    navigation.navigate('Inventory');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Login</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
