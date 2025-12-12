import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { vendorColors, baseShadows } from './vendorTheme';

const options = [
  { key: 'individual', title: 'Individual', subtitle: 'No registered business' },
  { key: 'business', title: 'Registered Business', subtitle: 'Has a registered entity' },
];

const VendorTypeScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('individual');

  const colors = vendorColors;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blue }]}>
      <View style={styles.container}>
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.surface }]}>Register as a Vendor</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>How are you registering?</Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                ...baseShadows.card,
              },
            ]}
          >
            <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
              Choose the option that best describes your vendor status.
            </Text>

            <View style={styles.options}>
              {options.map((option) => {
                const active = selected === option.key;
                return (
                  <Pressable
                    key={option.key}
                    onPress={() => setSelected(option.key)}
                    style={[
                      styles.optionRow,
                      {
                        borderColor: active ? colors.blue : colors.border,
                        backgroundColor: active ? colors.lightBg : colors.surface,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.radio,
                        { borderColor: colors.blue, backgroundColor: active ? colors.blue : 'transparent' },
                      ]}
                    />
                    <View style={styles.optionTextWrap}>
                      <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                      <Text style={[styles.optionSubtitle, { color: colors.textMuted }]}>{option.subtitle}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              style={[styles.cta, { backgroundColor: colors.blue, ...baseShadows.button }]}
              onPress={() => navigation.navigate('BasicDetails', { vendorType: selected })}
            >
              <Text style={[styles.ctaText, { color: colors.surface }]}>Continue</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
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
    opacity: 0.55,
    transform: [{ rotate: '10deg' }],
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 28,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
  sectionText: {
    fontSize: 13,
    marginBottom: 14,
  },
  options: {
    gap: 12,
    marginBottom: 18,
  },
  optionRow: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  optionTextWrap: { flex: 1 },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  optionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  cta: {
    marginTop: 4,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default VendorTypeScreen;
