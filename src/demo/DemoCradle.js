import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

let asyncStorage = null;
try {
  // Optional: use AsyncStorage if the package is available in the project
  asyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (error) {
  asyncStorage = null;
}

const STORAGE_KEY = 'demo_vendor_state';

export const DEMO_VENDOR = {
  name: 'Harish',
  storeName: 'Harish Electronics',
  verified: true,
  productsCount: 24,
  ordersToday: 3,
  revenueToday: 12450,
  lowStock: [{ name: 'Lamp A', qty: 2 }],
};

const DemoCradleContext = createContext(undefined);

export const DemoCradleProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      if (!asyncStorage) {
        setHydrating(false);
        return;
      }
      try {
        const saved = await asyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setVendor(JSON.parse(saved));
        }
      } catch (error) {
        console.warn('DemoCradle hydrate failed', error);
      } finally {
        setHydrating(false);
      }
    };

    hydrate();
  }, []);

  const persistVendor = useCallback(async (nextVendor) => {
    if (!asyncStorage) {
      return;
    }
    try {
      await asyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextVendor));
    } catch (error) {
      console.warn('DemoCradle persist failed', error);
    }
  }, []);

  const clearPersisted = useCallback(async () => {
    if (!asyncStorage) {
      return;
    }
    try {
      await asyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('DemoCradle clear failed', error);
    }
  }, []);

  const login = useCallback(async (identifier, password) => {
    if (!identifier?.trim() || !password?.trim()) {
      throw new Error('Missing credentials');
    }
    const vendorProfile = { ...DEMO_VENDOR, contact: identifier.trim() };
    setVendor(vendorProfile);
    await persistVendor(vendorProfile);
    return vendorProfile;
  }, [persistVendor]);

  const logout = useCallback(async () => {
    setVendor(null);
    await clearPersisted();
  }, [clearPersisted]);

  const value = useMemo(
    () => ({
      vendor,
      isLoggedIn: !!vendor,
      login,
      logout,
      hydrating,
      storage: asyncStorage ? 'AsyncStorage' : 'memory',
    }),
    [vendor, hydrating, login, logout]
  );

  return <DemoCradleContext.Provider value={value}>{children}</DemoCradleContext.Provider>;
};

export const useDemoCradle = () => {
  const ctx = useContext(DemoCradleContext);
  if (!ctx) {
    throw new Error('useDemoCradle must be used within DemoCradleProvider');
  }
  return ctx;
};
