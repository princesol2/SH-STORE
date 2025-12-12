import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { vendorColors, baseShadows } from './vendorTheme';

const StoreDetailsScreen = ({ navigation, route }) => {
  const colors = vendorColors;
  const vendorType = route?.params?.vendorType || 'individual';
  const [details, setDetails] = useState({
    name: '',
    category: '',
    description: '',
    logo: '',
  });

  const onChange = (key, value) => setDetails((prev) => ({ ...prev, [key]: value }));

  const next = () => navigation.navigate('Kyc', { vendorType });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blue }]}>
      <View style={styles.container}>
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} />

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.surface }]}>Store Details</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>Tell us about your storefront</Text>
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
              Your storefront name will be used to identify your store on the platform.
            </Text>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Storefront Name</Text>
              <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.lightBg }]}>
                <TextInput
                  value={details.name}
                  onChangeText={(text) => onChange('name', text)}
                  placeholder="Unique store name"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Store Category</Text>
              <Pressable
                style={[
                  styles.inputWrapper,
                  styles.dropdown,
                  { borderColor: colors.border, backgroundColor: colors.lightBg },
                ]}
                onPress={() => {}}
              >
                <Text style={{ color: details.category ? colors.text : colors.textMuted, fontSize: 15 }}>
                  {details.category || 'Select a category'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Store Description (optional)</Text>
              <View
                style={[
                  styles.inputWrapper,
                  { borderColor: colors.border, backgroundColor: colors.lightBg, height: 96, paddingVertical: 10 },
                ]}
              >
                <TextInput
                  value={details.description}
                  onChangeText={(text) => onChange('description', text)}
                  placeholder="Briefly describe your store"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                  multiline
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Store Logo (optional)</Text>
              <Pressable
                style={[
                  styles.inputWrapper,
                  styles.dropdown,
                  { borderColor: colors.border, backgroundColor: colors.lightBg },
                ]}
                onPress={() => {}}
              >
                <Text style={{ color: colors.textMuted, fontSize: 15 }}>Upload logo</Text>
              </Pressable>
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default StoreDetailsScreen;
