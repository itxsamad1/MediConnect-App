import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import colors from '../../theme/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';

const actions = [
  { id: '1', label: 'Find Doctor', icon: 'search', bg: colors.lightBlue, color: colors.primary },
  { id: '2', label: 'Prescriptions', icon: 'local-pharmacy', bg: '#FFF3E0', color: colors.warning },
  { id: '3', label: 'Lab Results', icon: 'assessment', bg: '#E8F5E8', color: colors.success },
  { id: '4', label: 'Medical Records', icon: 'folder', bg: '#FFEBEE', color: colors.secondary },
];

const QuickActions = () => {
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.actionItem}>
      <View style={[styles.actionIcon, { backgroundColor: item.bg }]}>
        <Icon name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.actionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.quickActionsCard}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <FlatList
        data={actions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={false} 
      />
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  quickActionsCard: {
    backgroundColor: colors.inputBackground,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  flatListContent: {
    gap: 12,
  },
  actionItem: {
    alignItems: 'center',
    width: '23%',
    marginBottom: 16,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
});
