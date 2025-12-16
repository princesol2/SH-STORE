import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vendorColors, baseShadows } from './vendorTheme';

const DeclarationScreen = ({ navigation }) => {
  const colors = vendorColors;
  const [checks, setChecks] = useState({
    correct: false,
    policies: false,
    approval: false,
  });

  const toggle = (key) => setChecks((prev) => ({ ...prev, [key]: !prev[key] }));

  const allChecked = checks.correct && checks.policies && checks.approval;

  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={[styles.safeArea, { backgroundColor: colors.blue }]}
    >
      <View style={styles.container}>
        {/* Background layers set to non-interactive to avoid blocking scroll/taps */}
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} pointerEvents="none" />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} pointerEvents="none" />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.surface }]}>Declaration</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>Confirm before submitting</Text>
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
            {[
              { key: 'correct', text: 'I confirm the details provided are correct' },
              { key: 'policies', text: 'I agree to platform policies' },
              { key: 'approval', text: 'I understand approval is required before activation' },
            ].map((item) => (
              <Pressable
                key={item.key}
                onPress={() => toggle(item.key)}
                style={[styles.checkRow, { borderColor: colors.border }]}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: colors.blue,
                      backgroundColor: checks[item.key] ? colors.blue : 'transparent',
                    },
                  ]}
                />
                <Text style={[styles.checkText, { color: colors.text }]}>{item.text}</Text>
              </Pressable>
            ))}

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
                Information is collected only for verification and compliance.
              </Text>
            </View>

            <Pressable
              style={[
                styles.cta,
                { backgroundColor: allChecked ? colors.blue : colors.border, ...baseShadows.button },
              ]}
              onPress={() => navigation.navigate('UnderReview')}
              disabled={!allChecked}
            >
              <Text style={[styles.ctaText, { color: colors.surface }]}>Submit</Text>
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
  checkRow: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
  },
  checkText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
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

export default DeclarationScreen;
