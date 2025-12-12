import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { vendorColors, baseShadows } from './vendorTheme';

const BasicDetailsScreen = ({ navigation, route }) => {
  const colors = vendorColors;
  const [details, setDetails] = useState({
    fullName: '',
    mobile: '',
    email: '',
  });

  const vendorType = route?.params?.vendorType || 'individual';

  const onChange = (key, value) => setDetails((prev) => ({ ...prev, [key]: value }));

  const next = () => navigation.navigate('StoreDetails', { vendorType });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blue }]}>
      <View style={styles.container}>
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} />

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.surface }]}>Basic Details</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>Tell us about you</Text>
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
            <Text style={[styles.helper, { color: colors.textSecondary }]}>
              Please provide details that match your identification documents.
            </Text>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name (as per ID)</Text>
              <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.lightBg }]}>
                <TextInput
                  value={details.fullName}
                  onChangeText={(text) => onChange('fullName', text)}
                  placeholder="Full Name"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Mobile Number</Text>
              <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.lightBg }]}>
                <TextInput
                  value={details.mobile}
                  onChangeText={(text) => onChange('mobile', text)}
                  placeholder="e.g. +91 98765 43210"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Work Email</Text>
              <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.lightBg }]}>
                <TextInput
                  value={details.email}
                  onChangeText={(text) => onChange('email', text)}
                  placeholder="vendor@company.com"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            </View>

            <Pressable style={[styles.cta, { backgroundColor: colors.blue, ...baseShadows.button }]} onPress={next}>
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
    paddingVertical: 24,
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
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
  helper: {
    fontSize: 13,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 54,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
  },
  cta: {
    marginTop: 8,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default BasicDetailsScreen;
