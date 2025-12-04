import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorLoginScreen from './src/screens/VendorLoginScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import UploadProductScreen from './src/screens/UploadProductScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VendorLogin">
        <Stack.Screen name="VendorLogin" component={VendorLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
        <Stack.Screen name="UploadProduct" component={UploadProductScreen} options={{ title: 'Upload Product' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
