import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const InventoryScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Inventory</Text>
      <Text style={globalStyles.text}>Inventory Screen - Vendor Logged In</Text>
      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('UploadProduct')}>
        <Text style={globalStyles.buttonText}>Go to Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InventoryScreen;
