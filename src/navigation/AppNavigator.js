import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDemoCradle } from '../demo/DemoCradle';
import VendorLoginScreen from '../screens/VendorLoginScreen';
import VendorHomeScreen from '../screens/VendorHomeScreen';
import KycScreen from '../screens/KycScreen';
import DeclarationScreen from '../screens/DeclarationScreen';
import UnderReviewScreen from '../screens/UnderReviewScreen';
import { vendorColors } from '../theme/colors';

const Stack = createNativeStackNavigator();

const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: vendorColors.lightBg,
    }}
  >
    <ActivityIndicator size="large" color={vendorColors.blue} />
  </View>
);

const AppNavigator = () => {
  const { isLoggedIn, hydrating } = useDemoCradle();

  if (hydrating) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="VendorHome" component={VendorHomeScreen} />
        ) : (
          <>
            <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
            <Stack.Screen name="VendorKYC" component={KycScreen} />
            <Stack.Screen name="Declaration" component={DeclarationScreen} />
            <Stack.Screen name="UnderReview" component={UnderReviewScreen} />
            <Stack.Screen name="VendorHome" component={VendorHomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
