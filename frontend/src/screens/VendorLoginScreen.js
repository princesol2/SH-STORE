import React, { useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const COLORS = {
  primary: '#2A72FF', // blue
  secondary: '#6B7280', // soft grey
  accent: '#6A4CFF', // deep purple
  highlight: '#3EE0FF', // cyan
  background: '#F4F7FF',
  card: '#ffffff',
};

const VendorLoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [focus, setFocus] = useState({ identifier: false, password: false });
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = () => {
    console.log('Login (placeholder)', credentials);
    navigation.navigate('Inventory');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.bgLayerOne} />
        <View style={styles.bgLayerTwo} />

        <View style={styles.header}>
          <View style={styles.logoStack}>
            <Text style={[styles.logoOutline, styles.logoShadowPrimary]}>STORA</Text>
            <Text style={[styles.logoOutline, styles.logoShadowAccent]}>STORA</Text>
            <Text style={[styles.logoOutline, styles.logoFill]}>STORA</Text>
          </View>
          <View style={styles.logoSubStack}>
            <Text style={[styles.logoSubOutline, styles.logoShadowPrimary]}>(Vendor)</Text>
            <Text style={[styles.logoSubOutline, styles.logoShadowAccent]}>(Vendor)</Text>
            <Text style={[styles.logoSubOutline, styles.logoFillSub]}>(Vendor)</Text>
          </View>
          <Text style={styles.brand}>snafleshub</Text>
        </View>

        <View style={styles.formCard}>
          <View style={[styles.fieldOuter, focus.identifier && styles.fieldOuterFocused]}>
            <View style={styles.fieldGradient} />
            <View style={styles.fieldGradientAccent} />
            <View style={styles.fieldInner}>
              <TextInput
                placeholder="Email or Mobile"
                placeholderTextColor={COLORS.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={credentials.identifier}
                onChangeText={(text) => setCredentials((prev) => ({ ...prev, identifier: text }))}
                onFocus={() => setFocus((p) => ({ ...p, identifier: true }))}
                onBlur={() => setFocus((p) => ({ ...p, identifier: false }))}
                style={styles.input}
              />
            </View>
          </View>

          <View style={[styles.fieldOuter, focus.password && styles.fieldOuterFocused]}>
            <View style={styles.fieldGradient} />
            <View style={styles.fieldGradientAccent} />
            <View style={styles.fieldInner}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={COLORS.secondary}
                secureTextEntry={true}
                value={credentials.password}
                onChangeText={(text) => setCredentials((prev) => ({ ...prev, password: text }))}
                onFocus={() => setFocus((p) => ({ ...p, password: true }))}
                onBlur={() => setFocus((p) => ({ ...p, password: false }))}
                style={styles.input}
              />
            </View>
          </View>

          <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }]}>
            <Pressable style={styles.loginButton} onPress={handleLogin} onPressIn={onPressIn} onPressOut={onPressOut}>
              <View style={styles.loginButtonOverlay} pointerEvents="none" />
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </Animated.View>

          <Pressable onPress={() => console.log('Forgot Password')} hitSlop={8}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  bgLayerOne: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: COLORS.primary,
    opacity: 0.12,
    top: -120,
    right: -80,
    transform: [{ rotate: '18deg' }],
  },
  bgLayerTwo: {
    position: 'absolute',
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: COLORS.accent,
    opacity: 0.12,
    bottom: -100,
    left: -120,
    transform: [{ rotate: '-12deg' }],
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
    zIndex: 2,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
    textAlign: 'center',
  },
  logoStack: {
    position: 'relative',
    alignItems: 'center',
  },
  logoOutline: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    color: 'transparent',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  logoShadowPrimary: {
    position: 'absolute',
    color: '#ffffff',
    textShadowColor: COLORS.primary,
    opacity: 0.9,
  },
  logoShadowAccent: {
    position: 'absolute',
    color: '#ffffff',
    textShadowColor: COLORS.accent,
    opacity: 0.8,
  },
  logoFill: {
    color: '#F4F7FF',
    textShadowColor: COLORS.highlight,
    textShadowRadius: 10,
    opacity: 0.9,
  },
  logoSubStack: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 4,
  },
  logoSubOutline: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
    color: 'transparent',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  logoFillSub: {
    color: '#F4F7FF',
    textShadowColor: COLORS.highlight,
    textShadowRadius: 8,
    opacity: 0.9,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  brand: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '300',
    color: COLORS.secondary,
    opacity: 0.6,
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e3e8ff',
  },
  fieldOuter: {
    marginBottom: 14,
    borderRadius: 16,
    padding: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  fieldOuterFocused: {
    shadowColor: COLORS.highlight,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 6,
  },
  fieldGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
  },
  fieldGradientAccent: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.accent,
    opacity: 0.5,
    transform: [{ rotate: '-8deg' }, { scale: 1.1 }],
  },
  fieldInner: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  input: {
    height: 48,
    color: '#0f172a',
    fontSize: 15,
  },
  buttonWrapper: {
    borderRadius: 14,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    overflow: 'hidden',
  },
  loginButtonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.accent,
    opacity: 0.35,
    transform: [{ translateY: -10 }, { rotate: '-8deg' }],
  },
  loginText: {
    color: '#f8fbff',
    fontWeight: '700',
    fontSize: 16,
  },
  forgotText: {
    textAlign: 'center',
    color: COLORS.highlight,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default VendorLoginScreen;
