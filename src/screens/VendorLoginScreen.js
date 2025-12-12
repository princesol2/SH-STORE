import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { vendorColors, baseShadows } from './vendorTheme';

const VendorLoginScreen = ({ navigation }) => {
  const colors = vendorColors;

  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [focus, setFocus] = useState({ identifier: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scale = useRef(new Animated.Value(1)).current;
  const intro = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(intro, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [intro]);

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
    if (!credentials.identifier.trim() || !credentials.password.trim()) {
      setError('Please enter your work email and password.');
      return;
    }

    setError('');
    setLoading(true);
    console.log('Login (placeholder)', credentials);
    navigation.navigate('Inventory');
    setTimeout(() => setLoading(false), 400);
  };

  const canSubmit = credentials.identifier.trim() && credentials.password.trim();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blue }]}>
      <View style={styles.container}>
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: intro,
                transform: [
                  {
                    translateY: intro.interpolate({
                      inputRange: [0, 1],
                      outputRange: [12, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.surface }]}>SH-Vendor</Text>
              <Text style={[styles.subtitle, { color: colors.surface }]}>Verified Vendor Access Portal</Text>
            </View>

            <View
              style={[
                styles.formCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  ...baseShadows.card,
                },
              ]}
            >
              <View style={styles.fieldGroup}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Work Email</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { borderColor: focus.identifier ? colors.blue : colors.border, backgroundColor: colors.lightBg },
                    focus.identifier && styles.inputWrapperFocused,
                  ]}
                >
                  <TextInput
                    placeholder="vendor@company.com"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={credentials.identifier}
                    onChangeText={(text) => setCredentials((prev) => ({ ...prev, identifier: text }))}
                    onFocus={() => setFocus((p) => ({ ...p, identifier: true }))}
                    onBlur={() => setFocus((p) => ({ ...p, identifier: false }))}
                    style={[styles.input, { color: colors.text }]}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <View style={styles.labelRow}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
                  <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
                    <Text style={[styles.link, { color: colors.blue }]}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </Pressable>
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    { borderColor: focus.password ? colors.blue : colors.border, backgroundColor: colors.lightBg },
                    focus.password && styles.inputWrapperFocused,
                  ]}
                >
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showPassword}
                    value={credentials.password}
                    onChangeText={(text) => setCredentials((prev) => ({ ...prev, password: text }))}
                    onFocus={() => setFocus((p) => ({ ...p, password: true }))}
                    onBlur={() => setFocus((p) => ({ ...p, password: false }))}
                    style={[styles.input, { color: colors.text }]}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.infoBanner,
                  {
                    borderColor: error ? colors.blue : colors.border,
                    backgroundColor: error ? 'rgba(78,108,184,0.1)' : colors.lightBg,
                  },
                ]}
              >
                <Text style={[styles.infoText, { color: error ? colors.blue : colors.textSecondary }]}>
                  {error || 'Only approved vendors can access this portal.'}
                </Text>
              </View>

              <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }]}>
                <Pressable
                  style={[styles.loginButton, { backgroundColor: colors.blue }]}
                  onPress={handleLogin}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  disabled={!canSubmit || loading}
                >
                  <View
                    style={[
                      styles.loginButtonOverlay,
                      { backgroundColor: colors.purple, opacity: 0.65 },
                  ]}
                  pointerEvents="none"
                />
                <Text style={[styles.loginText, { color: colors.surface }]}>
                  {loading ? 'Verifying...' : 'Login as Vendor'}
                </Text>
              </Pressable>
            </Animated.View>

              <View style={styles.linksRow}>
                <Pressable onPress={() => console.log('Forgot Password')} hitSlop={8}>
                  <Text style={[styles.link, { color: colors.blue }]}>Forgot password?</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('VendorType')} hitSlop={8}>
                  <Text style={[styles.link, { color: colors.purple }]}>New vendor? Apply</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: -140,
    left: -140,
    right: -140,
    bottom: -140,
    opacity: 0.9,
    transform: [{ rotate: '-10deg' }],
  },
  gradientOverlaySoft: {
    position: 'absolute',
    top: -120,
    left: -120,
    right: -120,
    bottom: -120,
    opacity: 0.65,
    transform: [{ rotate: '14deg' }],
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
    zIndex: 2,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.92,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
  },
  formCard: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: '#0f172a',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 24,
    elevation: 7,
    borderWidth: 1,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    height: 56,
    justifyContent: 'center',
  },
  inputWrapperFocused: {
    shadowColor: '#4E6CB8',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },
  input: {
    height: 48,
    fontSize: 15,
  },
  link: {
    fontWeight: '600',
    fontSize: 13,
  },
  buttonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    overflow: 'hidden',
  },
  loginButtonOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.45,
  },
  loginText: {
    fontWeight: '800',
    fontSize: 15,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoBanner: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  infoText: {
    fontSize: 13,
  },
});

export default VendorLoginScreen;
