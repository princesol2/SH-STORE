import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { vendorColors, baseShadows } from './vendorTheme';

const UnderReviewScreen = ({ navigation }) => {
  const colors = vendorColors;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blue }]}>
      <View style={styles.container}>
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.surface }]}>Thank you for applying.</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>
              Your documents are under review. This usually takes 24–48 hours.
            </Text>
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
            <Text style={[styles.status, { color: colors.text }]}>Status: Under Review</Text>
            <Text style={[styles.info, { color: colors.textSecondary }]}>No selling access yet.</Text>

            <Pressable
              style={[styles.cta, { backgroundColor: colors.blue, ...baseShadows.button }]}
              onPress={() => navigation.navigate('VendorHome', { storefront: 'Your Storefront' })}
            >
              <Text style={[styles.ctaText, { color: colors.surface }]}>Go to Vendor Home</Text>
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
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    gap: 10,
    alignItems: 'center',
  },
  status: {
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    fontSize: 14,
  },
  cta: {
    marginTop: 6,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default UnderReviewScreen;
