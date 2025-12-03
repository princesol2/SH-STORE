import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import { globalStyles } from '../styles/globalStyles';

const UploadProductScreen = ({ navigation }) => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');

  const handleUpload = () => {
    console.log('Upload placeholder', { image, price, quantity });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Upload Product</Text>
      <Input placeholder="Image placeholder" value={image} onChangeText={setImage} />
      <Input placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Input placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TouchableOpacity style={globalStyles.button} onPress={handleUpload}>
        <Text style={globalStyles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Inventory')}>
        <Text style={globalStyles.buttonText}>Back to Inventory</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadProductScreen;
