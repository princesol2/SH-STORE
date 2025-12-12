import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { vendorColors, baseShadows } from './vendorTheme';

const cards = [
  { title: 'Products', desc: 'Manage your catalog' },
  { title: 'Orders', desc: 'Track orders and fulfillment' },
  { title: 'Earnings', desc: 'View payouts and summaries' },
  { title: 'Store Settings', desc: 'Update store info' },
];

const VendorHomeScreen = ({ route }) => {
  const colors = vendorColors;
  const storefront = route?.params?.storefront || 'Storefront';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.blue }]}>
      <View style={styles.container}>
        <View style={[styles.gradientOverlay, { backgroundColor: colors.gradientEnd }]} />
        <View style={[styles.gradientOverlaySoft, { backgroundColor: colors.gradientStart }]} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.surface }]}>Welcome, {storefront}</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>Vendor Home</Text>
          </View>

          <View style={styles.cardsWrap}>
            {cards.map((card) => (
              <View
                key={card.title}
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    ...baseShadows.card,
                  },
                ]}
              >
                <Text style={[styles.cardTitle, { color: colors.text }]}>{card.title}</Text>
                <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{card.desc}</Text>
              </View>
            ))}
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
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
  },
  cardsWrap: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardDesc: {
    marginTop: 4,
    fontSize: 13,
  },
});

export default VendorHomeScreen;
