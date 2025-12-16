import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { DemoCradleProvider } from './src/demo/DemoCradle';
import { vendorColors } from './src/theme/colors';

function App() {
  return (
    <SafeAreaProvider>
      {/* Non-translucent status bar prevents content from rendering under system UI */}
      <StatusBar translucent={false} backgroundColor={vendorColors.lightBg} barStyle="dark-content" />
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <DemoCradleProvider>
          <AppNavigator />
        </DemoCradleProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: vendorColors.lightBg,
  },
});

export default App;
