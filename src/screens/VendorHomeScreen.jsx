import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { vendorColors } from '../theme/colors';
import { baseShadows } from './vendorTheme';
import { DEMO_VENDOR, useDemoCradle } from '../demo/DemoCradle';

const actionItems = [
  { title: 'Add Product', subtitle: 'Create a new listing' },
  { title: 'View Products', subtitle: 'Manage catalog' },
  { title: 'Orders', subtitle: "Today's fulfillment" },
  { title: 'Support', subtitle: 'Reach our team' },
];

const VendorHomeScreen = () => {
  const { vendor, logout } = useDemoCradle();
  const profile = vendor || DEMO_VENDOR;

  const stats = [
    { label: 'Products', value: profile.productsCount ?? 0 },
    { label: 'Orders (today)', value: profile.ordersToday ?? 0 },
    {
      label: 'Revenue (today)',
      value: profile.revenueToday != null ? `Rs ${profile.revenueToday.toLocaleString('en-IN')}` : '--',
    },
  ];

  const lowStock = Array.isArray(profile.lowStock) ? profile.lowStock.slice(0, 3) : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.portalLabel}>Vendor Portal</Text>
            <Text style={styles.portalSubLabel}>SnaflesHub</Text>
          </View>
          <Pressable style={styles.logoutButton} onPress={logout} hitSlop={8}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        <View style={styles.headerCard}>
          <Text style={styles.greeting}>Good morning, {profile.name} 👋</Text>
          <View style={styles.storeRow}>
            <Text style={styles.storeName}>{profile.storeName}</Text>
            {profile.verified ? (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Primary actions</Text>
          <View style={styles.actionsGrid}>
            {actionItems.map((item) => (
              <Pressable key={item.title} style={styles.actionTile} onPress={() => {}} hitSlop={6}>
                <Text style={styles.actionTitle}>{item.title}</Text>
                <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {lowStock.length > 0 ? (
          <View style={styles.lowStockCard}>
            <Text style={styles.sectionTitle}>Low stock</Text>
            {lowStock.map((stock) => (
              <View key={stock.name} style={styles.lowStockRow}>
                <Text style={styles.lowStockName}>{stock.name}</Text>
                <Text style={styles.lowStockQty}>Qty {stock.qty}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: vendorColors.gradientEnd,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  portalLabel: {
    color: vendorColors.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  portalSubLabel: {
    color: vendorColors.surface,
    fontSize: 15,
    fontWeight: '800',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: vendorColors.surface,
    borderWidth: 1,
    borderColor: vendorColors.border,
    ...baseShadows.card,
  },
  logoutText: {
    color: vendorColors.blue,
    fontWeight: '700',
    fontSize: 13,
  },
  headerCard: {
    backgroundColor: vendorColors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: vendorColors.border,
    gap: 6,
    ...baseShadows.card,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '800',
    color: vendorColors.text,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '700',
    color: vendorColors.textSecondary,
  },
  verifiedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: vendorColors.lightBg,
    borderWidth: 1,
    borderColor: vendorColors.border,
  },
  verifiedText: {
    color: vendorColors.blue,
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: vendorColors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: vendorColors.border,
    ...baseShadows.card,
  },
  statLabel: {
    color: vendorColors.textSecondary,
    fontSize: 13,
    marginBottom: 6,
  },
  statValue: {
    color: vendorColors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  actionsCard: {
    backgroundColor: vendorColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: vendorColors.border,
    gap: 12,
    ...baseShadows.card,
  },
  sectionTitle: {
    color: vendorColors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionTile: {
    width: '48%',
    backgroundColor: vendorColors.lightBg,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: vendorColors.border,
  },
  actionTitle: {
    color: vendorColors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  actionSubtitle: {
    marginTop: 4,
    color: vendorColors.textSecondary,
    fontSize: 12,
  },
  lowStockCard: {
    backgroundColor: vendorColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: vendorColors.border,
    gap: 10,
    ...baseShadows.card,
  },
  lowStockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: vendorColors.border,
  },
  lowStockName: {
    color: vendorColors.text,
    fontWeight: '700',
    fontSize: 13,
  },
  lowStockQty: {
    color: vendorColors.purple,
    fontWeight: '700',
    fontSize: 13,
  },
});

export default VendorHomeScreen;
