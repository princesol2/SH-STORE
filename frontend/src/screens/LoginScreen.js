import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Input from '../components/Input';
import api from '../services/api';

const Hexagon = ({ size = 160, color = '#1d4ed8', opacity = 0.12, style }) => {
  const triangleHeight = size * 0.25;
  const middleHeight = size * 0.5;

  return (
    <View
      style={[
        {
          width: size,
          height: middleHeight + triangleHeight * 2,
        },
        style,
      ]}
    >
      <View
        style={{
          width: size,
          height: middleHeight,
          backgroundColor: color,
          opacity,
        }}
      />
      <View
        style={[
          styles.hexagonTriangle,
          {
            top: 0,
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: triangleHeight,
            borderBottomColor: color,
            opacity,
          },
        ]}
      />
      <View
        style={[
          styles.hexagonTriangle,
          {
            bottom: 0,
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderTopWidth: triangleHeight,
            borderTopColor: color,
            opacity,
          },
        ]}
      />
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (role) => {
    console.log('Logging in (placeholder)', { username, password, role });
    try {
      await api.post(`/api/${role}/login`, { username, password });
    } catch (error) {
      // placeholder ignore errors
    }
    navigation.navigate('Inventory', { role });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.hexBackdrop} pointerEvents="none">
        <Hexagon size={260} opacity={0.08} style={{ top: -120, right: -120 }} />
        <Hexagon size={180} color="#0ea5e9" opacity={0.12} style={{ top: 140, left: -90 }} />
        <Hexagon size={120} color="#60a5fa" opacity={0.18} style={{ bottom: 60, right: 10 }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.brand}>HS Store</Text>
        <Text style={styles.subBrand}>SnaflesHub</Text>
        <View style={styles.headerAccent} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardBadge}>
              <Hexagon size={58} color="#2563eb" opacity={0.32} />
              <View style={styles.badgeLabel}>
                <Text style={styles.badgeText}>Portal</Text>
              </View>
            </View>
            <View style={styles.cardHeading}>
              <Text style={styles.title}>Secure Login</Text>
              <Text style={styles.caption}>Hexagon-inspired access for both vendors and users.</Text>
            </View>
          </View>

          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#6b7b92"
            style={styles.input}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#6b7b92"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.forgotButton} onPress={() => console.log('Forgot Password pressed')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.primaryButton, styles.vendorButton]}
              onPress={() => handleLogin('vendor')}
            >
              <Text style={styles.buttonLabel}>Vendor Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.primaryButton, styles.userButton]} onPress={() => handleLogin('user')}>
              <Text style={styles.buttonLabel}>User Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 32,
  },
  hexBackdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  header: {
    marginBottom: 8,
    zIndex: 1,
  },
  brand: {
    color: '#0b1f44',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subBrand: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  headerAccent: {
    marginTop: 12,
    width: 94,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#2563eb',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  card: {
    backgroundColor: '#f8fbff',
    borderRadius: 24,
    padding: 20,
    borderColor: '#e5edff',
    borderWidth: 1,
    shadowColor: '#1e3a8a',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  cardBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  badgeLabel: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 12,
  },
  cardHeading: {
    flex: 1,
  },
  title: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  caption: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(96,165,250,0.55)',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    color: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 14,
  },
  forgotText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  vendorButton: {
    backgroundColor: '#2563eb',
    borderColor: '#60a5fa',
    marginRight: 10,
  },
  userButton: {
    backgroundColor: '#0ea5e9',
    borderColor: '#38bdf8',
  },
  buttonLabel: {
    color: '#f8fbff',
    fontWeight: '700',
    fontSize: 15,
  },
  hexagonTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
});

export default LoginScreen;
