import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const QuickActions = () => {
  const { colors } = useTheme();

  const actions = [
    { id: '1', label: 'Find Doctor', icon: 'search', bg: colors.infoLight, color: colors.primary },
    { id: '2', label: 'Prescriptions', icon: 'local-pharmacy', bg: colors.warningLight, color: colors.warning },
    { id: '3', label: 'Lab Results', icon: 'assessment', bg: colors.successLight, color: colors.success },
    { id: '4', label: 'Records', icon: 'folder', bg: colors.dangerLight, color: colors.danger },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.actionItem}>
      <View style={[styles.actionIcon, { backgroundColor: item.bg }]}>
        <Icon name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Quick Actions</Text>
      <FlatList
        data={actions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 16, borderRadius: 16, padding: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  actionItem: { alignItems: 'center', width: '23%' },
  actionIcon: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionText: { fontSize: 11, textAlign: 'center', fontWeight: '500' },
});
