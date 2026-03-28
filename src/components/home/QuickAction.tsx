import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

interface QuickActionItem {
  id: string;
  label: string;
  icon: string;
  bgKey: string;
  colorKey: string;
}

const actionData: QuickActionItem[] = [
  { id: '1', label: 'Find Doctor', icon: 'search', bgKey: 'infoLight', colorKey: 'primary' },
  { id: '2', label: 'Prescriptions', icon: 'local-pharmacy', bgKey: 'warningLight', colorKey: 'warning' },
  { id: '3', label: 'Lab Results', icon: 'assessment', bgKey: 'successLight', colorKey: 'success' },
  { id: '4', label: 'Records', icon: 'folder', bgKey: 'dangerLight', colorKey: 'danger' },
];

const QuickAction: React.FC = () => {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: QuickActionItem }) => (
    <TouchableOpacity style={styles.actionItem}>
      <View style={[styles.actionIcon, { backgroundColor: colors[item.bgKey] }]}>
        <Icon name={item.icon} size={24} color={colors[item.colorKey]} />
      </View>
      <Text style={[styles.actionText, { color: colors.textSecondary }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Quick Actions</Text>
      <FlatList data={actionData} keyExtractor={(i) => i.id} renderItem={renderItem} numColumns={4} columnWrapperStyle={{ justifyContent: 'space-between' }} scrollEnabled={false} />
    </View>
  );
};

export default QuickAction;

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 16, borderRadius: 16, padding: 20, elevation: 3 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  actionItem: { alignItems: 'center', width: '23%' },
  actionIcon: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionText: { fontSize: 11, textAlign: 'center', fontWeight: '500' },
});
