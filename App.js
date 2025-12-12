import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorLoginScreen from './src/screens/VendorLoginScreen';
import VendorTypeScreen from './src/screens/VendorTypeScreen';
import BasicDetailsScreen from './src/screens/BasicDetailsScreen';
import StoreDetailsScreen from './src/screens/StoreDetailsScreen';
import KycScreen from './src/screens/KycScreen';
import DeclarationScreen from './src/screens/DeclarationScreen';
import UnderReviewScreen from './src/screens/UnderReviewScreen';
import VendorHomeScreen from './src/screens/VendorHomeScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import UploadProductScreen from './src/screens/UploadProductScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VendorLogin">
        <Stack.Screen name="VendorLogin" component={VendorLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VendorType" component={VendorTypeScreen} options={{ title: 'Vendor Type' }} />
        <Stack.Screen name="BasicDetails" component={BasicDetailsScreen} options={{ title: 'Basic Details' }} />
        <Stack.Screen name="StoreDetails" component={StoreDetailsScreen} options={{ title: 'Store Details' }} />
        <Stack.Screen name="Kyc" component={KycScreen} options={{ title: 'KYC' }} />
        <Stack.Screen name="Declaration" component={DeclarationScreen} options={{ title: 'Declaration' }} />
        <Stack.Screen name="UnderReview" component={UnderReviewScreen} options={{ title: 'Under Review' }} />
        <Stack.Screen name="VendorHome" component={VendorHomeScreen} options={{ title: 'Vendor Home' }} />
        <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
        <Stack.Screen name="UploadProduct" component={UploadProductScreen} options={{ title: 'Upload Product' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
