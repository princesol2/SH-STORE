import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#2A72FF',
  secondary: '#6B7280',
  background: '#F2EDFF',
  card: '#ffffff',
  accent: '#3B82F6',
  border: '#dbe3f4',
};

const initialProducts = [
  { id: '1', name: 'Sample Jacket', price: '399', quantity: '10', description: 'Lightweight jacket' },
  { id: '2', name: 'Canvas Backpack', price: '899', quantity: '5', description: 'Durable daypack' },
  { id: '3', name: 'Running Shoes', price: '1299', quantity: '8', description: 'Comfort fit' },
];

const InventoryScreen = () => {
  const [products, setProducts] = useState(initialProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', quantity: '', description: '' });

  const openAddModal = () => {
    setIsEditing(false);
    setActiveId(null);
    setForm({ name: '', price: '', quantity: '', description: '' });
    setModalVisible(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setActiveId(item.id);
    setForm({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description || '',
    });
    setModalVisible(true);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.quantity) {
      setModalVisible(false);
      return;
    }
    if (isEditing && activeId) {
      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === activeId ? { ...prod, ...form } : prod
        )
      );
    } else {
      const newProduct = { ...form, id: Date.now().toString() };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (!activeId) return;
    setProducts((prev) => prev.filter((prod) => prod.id !== activeId));
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => openEditModal(item)}>
      <View style={styles.cardAccent} />
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Img</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>₹{item.price}</Text>
        <Text style={styles.cardQuantity}>Qty: {item.quantity}</Text>
      </View>
    </Pressable>
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.headerBlock}>
        <Text style={styles.title}>STORA</Text>
        <Text style={styles.subtitle}>(Vendor)</Text>
        <Text style={styles.brand}>snafleshub</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Inventory</Text>
          <Text style={styles.sectionSubtitle}>Manage your products quickly</Text>
        </View>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={listHeader}
        />

        <TouchableOpacity style={styles.fab} onPress={openAddModal} activeOpacity={0.85}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        <Modal transparent animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{isEditing ? 'Edit Product' : 'Add Product'}</Text>
              <Text style={styles.inputLabel}>Product Name</Text>
              <TextInput
                placeholder="Product Name"
                value={form.name}
                onChangeText={(text) => handleChange('name', text)}
                style={styles.input}
              />
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                placeholder="Price"
                value={form.price}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('price', text)}
                style={styles.input}
              />
              <Text style={styles.inputLabel}>Quantity</Text>
              <TextInput
                placeholder="Quantity"
                value={form.quantity}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('quantity', text)}
                style={styles.input}
              />
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="Description (optional)"
                value={form.description}
                onChangeText={(text) => handleChange('description', text)}
                style={[styles.input, styles.textArea]}
                multiline
              />

              <TouchableOpacity style={styles.primaryButton} onPress={handleSave} activeOpacity={0.9}>
                <Text style={styles.primaryButtonText}>{isEditing ? 'Save Changes' : 'Add Product'}</Text>
              </TouchableOpacity>

              {isEditing && (
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.9}>
                  <Text style={styles.deleteButtonText}>Delete Product</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)} activeOpacity={0.85}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  brand: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '300',
    color: COLORS.secondary,
    opacity: 0.6,
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  sectionHeader: {
    width: '100%',
    marginTop: 18,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.secondary,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardAccent: {
    width: 4,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  imagePlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#e6edff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  imageText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardPrice: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  cardQuantity: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.secondary,
  },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 30,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#2A72FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2a72ff',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 14,
    elevation: 6,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: -2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    padding: 18,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#0f172a',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    color: '#0f172a',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#2A72FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#1f2937',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default InventoryScreen;
