import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import UploadProductScreen from './src/screens/UploadProductScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="UploadProduct" component={UploadProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
