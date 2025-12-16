import React, { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDemoCradle } from '../demo/DemoCradle';

const COLORS = {
  purple: '#7B5FC8',
  purpleMid: '#6A63C2',
  overlay: 'rgba(15, 23, 42, 0.25)',
  card: '#FFFFFF',
  text: '#0F172A',
  muted: '#6B7280',
  border: '#E5E7EB',
  glow: 'rgba(123, 95, 200, 0.35)',
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FooterLinks = ({ onPressItem }) => (
  <View style={styles.footerLinks}>
    {['Policies', 'Terms', 'Legal', 'Privacy'].map((item, index, arr) => (
      <View key={item} style={styles.footerItem}>
        <Pressable onPress={() => onPressItem(item)} hitSlop={6}>
          <Text style={styles.footerLink}>{item}</Text>
        </Pressable>
        {index < arr.length - 1 ? <Text style={styles.footerSeparator}>•</Text> : null}
      </View>
    ))}
  </View>
);

const AnimatedLink = ({ children, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const to = (nextScale, nextOpacity) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: nextScale, useNativeDriver: true, speed: 30, bounciness: 0 }),
      Animated.timing(opacity, { toValue: nextOpacity, duration: 140, useNativeDriver: true }),
    ]).start();
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => to(0.98, 0.85)}
      onPressOut={() => to(1, 1)}
      onHoverIn={() => to(1.01, 1)}
      onHoverOut={() => to(1, 1)}
      hitSlop={8}
      style={[styles.linkWrap, { transform: [{ scale }], opacity }]}
    >
      <Text style={styles.linkText}>{children}</Text>
    </AnimatedPressable>
  );
};

const PrimaryButton = ({ title, onPress, disabled, loading }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const to = (nextScale, nextOpacity) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: nextScale, useNativeDriver: true, speed: 28, bounciness: 0 }),
      Animated.timing(opacity, { toValue: nextOpacity, duration: 160, useNativeDriver: true }),
    ]).start();
  };

  return (
    <AnimatedPressable
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={() => (!disabled && !loading ? to(0.98, 0.92) : null)}
      onPressOut={() => to(1, 1)}
      onHoverIn={() => (!disabled && !loading ? to(1.01, 1) : null)}
      onHoverOut={() => to(1, 1)}
      style={[
        styles.primaryBtn,
        disabled || loading ? styles.primaryBtnDisabled : null,
        { transform: [{ scale }], opacity },
      ]}
    >
      {/* TODO: If you add Expo, replace this with <LinearGradient colors={[COLORS.purpleMid, COLORS.purple]} /> */}
      <View style={styles.primaryBtnGradientA} pointerEvents="none" />
      <View style={styles.primaryBtnGradientB} pointerEvents="none" />
      {loading ? <ActivityIndicator color="white" /> : <Text style={styles.primaryBtnText}>{title}</Text>}
    </AnimatedPressable>
  );
};

const VendorLoginScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 760;

  const { login } = useDemoCradle();
  const cardScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.9)).current;
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ identifier: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(
    () => identifier.trim().length > 0 && password.trim().length > 0,
    [identifier, password]
  );

  const openLink = (url) => {
    Linking.openURL(url).catch(() => {
      setErrors((prev) => ({ ...prev, general: 'Link could not be opened right now.' }));
    });
  };

  const handleFooterLink = (item) => {
    const urls = {
      Policies: 'https://example.com/policies',
      Terms: 'https://example.com/terms',
      Legal: 'https://example.com/legal',
      Privacy: 'https://example.com/privacy',
    };
    openLink(urls[item] ?? 'https://example.com');
  };

  const handleSubmit = async () => {
    const nextErrors = { identifier: '', password: '', general: '' };
    if (!identifier.trim()) {
      nextErrors.identifier = 'Enter your email or phone.';
    }
    if (!password.trim()) {
      nextErrors.password = 'Enter your password.';
    }
    setErrors(nextErrors);
    if (nextErrors.identifier || nextErrors.password) {
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      await login(identifier, password);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'Unable to sign in right now. Please try again.',
      }));
    } finally {
      setLoading(false);
    }
  };

  const setCardHover = (hovered) => {
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: hovered ? 1.01 : 1,
        useNativeDriver: true,
        speed: 26,
        bounciness: 0,
      }),
      Animated.timing(glowOpacity, {
        toValue: hovered ? 1 : 0.9,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar translucent={false} backgroundColor={COLORS.purple} barStyle="light-content" />
      <Pressable style={styles.flex} onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.bg}>
            {/* TODO: If you add Expo, use expo-linear-gradient with [COLORS.purpleMid, COLORS.purple]. */}
            <View style={styles.bgBlobOne} pointerEvents="none" />
            <View style={styles.bgBlobTwo} pointerEvents="none" />
            <View style={styles.bgDarken} pointerEvents="none" />

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={[styles.layout, isWide ? styles.layoutWide : styles.layoutNarrow]}>
                <View style={[styles.brandPane, isWide ? styles.brandPaneWide : styles.brandPaneNarrow]}>
                  <View style={styles.logoRow}>
                    <View style={styles.logoMark}>
                      <Text style={styles.logoMarkText}>SH</Text>
                    </View>
                    <View style={styles.brandTextStack}>
                      <Text style={styles.brandTitle}>SH-Vendor</Text>
                      <Text style={styles.brandSubtitle}>A vendor portal by SnaflesHub</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardPane}>
                  <Animated.View
                    style={[styles.cardStack, { transform: [{ scale: cardScale }] }]}
                    onPointerEnter={() => setCardHover(true)}
                    onPointerLeave={() => setCardHover(false)}
                  >
                    <Animated.View style={[styles.glow, { opacity: glowOpacity }]} pointerEvents="none" />
                    <View style={styles.card}>
                      <Text style={styles.cardTitle}>Login</Text>

                      <View style={styles.fieldBlock}>
                        <TextInput
                          value={identifier}
                          onChangeText={setIdentifier}
                          placeholder="Email / Phone"
                          placeholderTextColor={COLORS.muted}
                          style={[styles.input, errors.identifier ? styles.inputError : null]}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          returnKeyType="next"
                        />
                        {errors.identifier ? <Text style={styles.inlineError}>{errors.identifier}</Text> : null}
                      </View>

                      <View style={styles.fieldBlock}>
                        <TextInput
                          value={password}
                          onChangeText={setPassword}
                          placeholder="Password"
                          placeholderTextColor={COLORS.muted}
                          style={[styles.input, errors.password ? styles.inputError : null]}
                          secureTextEntry
                          returnKeyType="done"
                        />
                        {errors.password ? <Text style={styles.inlineError}>{errors.password}</Text> : null}
                      </View>

                      {errors.general ? <Text style={styles.generalError}>{errors.general}</Text> : null}

                      <PrimaryButton
                        title="Login"
                        onPress={handleSubmit}
                        disabled={!canSubmit}
                        loading={loading}
                      />

                      <View style={styles.linksColumn}>
                        <AnimatedLink onPress={() => navigation?.navigate?.('ForgotPassword')}>Forgot Password?</AnimatedLink>
                        <AnimatedLink onPress={() => navigation?.navigate?.('VendorKYC')}>
                          New Vendor? Complete KYC →
                        </AnimatedLink>
                      </View>
                    </View>
                  </Animated.View>

                  <FooterLinks onPressItem={handleFooterLink} />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: COLORS.purple },
  bg: {
    flex: 1,
    backgroundColor: COLORS.purple,
    overflow: 'hidden',
  },
  bgBlobOne: {
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: 300,
    backgroundColor: COLORS.purpleMid,
    opacity: 0.55,
    top: -220,
    left: -180,
    transform: [{ rotate: '8deg' }],
  },
  bgBlobTwo: {
    position: 'absolute',
    width: 560,
    height: 560,
    borderRadius: 320,
    backgroundColor: COLORS.purpleMid,
    opacity: 0.28,
    bottom: -260,
    right: -220,
    transform: [{ rotate: '-10deg' }],
  },
  bgDarken: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingVertical: 22,
    justifyContent: 'center',
  },
  layout: {
    gap: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  layoutNarrow: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  brandPane: {
    padding: 8,
  },
  brandPaneWide: {
    flex: 1,
    maxWidth: 420,
    alignItems: 'flex-start',
  },
  brandPaneNarrow: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoMark: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 0.6,
  },
  brandTextStack: {
    gap: 4,
  },
  brandTitle: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  brandSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  cardPane: {
    width: '100%',
    maxWidth: 520,
    alignItems: 'stretch',
    gap: 14,
  },
  cardStack: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: -10,
    borderRadius: 24,
    backgroundColor: COLORS.glow,
    shadowColor: COLORS.purple,
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
    shadowColor: '#0B1220',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
  },
  fieldBlock: {
    gap: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: COLORS.card,
    color: COLORS.text,
    fontWeight: '600',
  },
  inputError: {
    borderColor: COLORS.purple,
  },
  inlineError: {
    color: COLORS.purple,
    fontSize: 12,
  },
  generalError: {
    color: COLORS.purple,
    fontSize: 13,
  },
  primaryBtn: {
    marginTop: 2,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: COLORS.purple,
  },
  primaryBtnGradientA: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.purpleMid,
    opacity: 0.95,
  },
  primaryBtnGradientB: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.purple,
    opacity: 0.6,
    transform: [{ rotate: '-10deg' }],
  },
  primaryBtnDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
    opacity: 0.8,
  },
  primaryBtnText: {
    color: 'white',
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  linksColumn: {
    gap: 8,
    marginTop: 2,
  },
  linkWrap: {
    alignSelf: 'flex-start',
  },
  linkText: {
    color: COLORS.purpleMid,
    fontWeight: '800',
    fontSize: 13,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 6,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerLink: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    fontSize: 12,
  },
  footerSeparator: {
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
  },
});

export default VendorLoginScreen;
