import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { vendorColors, baseShadows } from './vendorTheme';

const KycScreen = ({ navigation, route }) => {
  const colors = vendorColors;
  const vendorType = route?.params?.vendorType || 'individual';

  const [form, setForm] = useState({
    pan: '',
    address: '',
    businessName: '',
    businessType: '',
    gst: '',
    authPerson: '',
  });

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => navigation.navigate('Declaration');

  const isIndividual = vendorType === 'individual';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blue }]}>
      <View style={styles.container}>
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} />

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.surface }]}>KYC Verification</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>Secure your vendor profile</Text>
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
              {isIndividual
                ? 'Upload ID and address details to verify your individual account.'
                : 'Provide business verification details for your registered entity.'}
            </Text>

            {isIndividual ? (
              <>
                <Field
                  label="PAN Card Number"
                  placeholder="Enter PAN"
                  value={form.pan}
                  onChangeText={(text) => onChange('pan', text)}
                />
                <Field
                  label="Address"
                  placeholder="Registered address"
                  value={form.address}
                  onChangeText={(text) => onChange('address', text)}
                  multiline
                  height={80}
                />
                <UploadStub label="Address Proof (Aadhaar masked / bill / rental agreement)" />
                <UploadStub label="Shop / Workspace Photo (optional)" optional />
              </>
            ) : (
              <>
                <Field
                  label="Business Name"
                  placeholder="Registered business name"
                  value={form.businessName}
                  onChangeText={(text) => onChange('businessName', text)}
                />
                <Field
                  label="Business Type"
                  placeholder="Proprietorship, Partnership, LLP, Pvt Ltd"
                  value={form.businessType}
                  onChangeText={(text) => onChange('businessType', text)}
                />
                <Field
                  label="Business PAN"
                  placeholder="Enter business PAN"
                  value={form.pan}
                  onChangeText={(text) => onChange('pan', text)}
                />
                <Field
                  label="GST Number (optional)"
                  placeholder="Enter GST (if applicable)"
                  value={form.gst}
                  onChangeText={(text) => onChange('gst', text)}
                />
                <Field
                  label="Authorized Person Name"
                  placeholder="Full name"
                  value={form.authPerson}
                  onChangeText={(text) => onChange('authPerson', text)}
                />
                <UploadStub label="Address Proof" />
                <UploadStub label="Shop / Business Location Photo (recommended)" optional />
              </>
            )}

            <View
              style={[
                styles.infoBox,
                {
                  backgroundColor: colors.lightBg,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                Used only for verification and trust purposes. Not shared publicly without consent.
              </Text>
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

const Field = ({ label, placeholder, value, onChangeText, multiline = false, height = 54 }) => {
  const colors = vendorColors;
  return (
    <View style={fieldStyles.field}>
      <Text style={[fieldStyles.label, { color: colors.textSecondary }]}>{label}</Text>
      <View
        style={[
          fieldStyles.inputWrapper,
          {
            borderColor: colors.border,
            backgroundColor: colors.lightBg,
            height: multiline ? height : 54,
            paddingVertical: multiline ? 10 : 0,
          },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          style={[fieldStyles.input, { color: colors.text }]}
        />
      </View>
    </View>
  );
};

const UploadStub = ({ label, optional = false }) => {
  const colors = vendorColors;
  return (
    <Pressable
      style={[
        fieldStyles.inputWrapper,
        fieldStyles.uploadStub,
        { borderColor: colors.border, backgroundColor: colors.lightBg },
      ]}
      onPress={() => {}}
    >
      <Text style={{ color: colors.textMuted, fontSize: 14 }}>
        {label}
        {optional ? ' (optional)' : ''}
      </Text>
    </Pressable>
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
  infoBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  infoText: {
    fontSize: 13,
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

const fieldStyles = StyleSheet.create({
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
  uploadStub: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
  },
});

export default KycScreen;
