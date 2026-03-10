import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const activities = [
  { id: '1', label: 'Lab Results Available', time: '2 hours ago', icon: 'assignment', bg: 'infoLight', color: 'primary' },
  { id: '2', label: 'Prescription Refill Ready', time: '1 day ago', icon: 'local-pharmacy', bg: 'warningLight', color: 'warning' },
  { id: '3', label: 'Appointment Reminder', time: 'Tomorrow', icon: 'event', bg: 'successLight', color: 'success' },
];

const RecentActivity = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Recent Activity</Text>
      {activities.map(item => (
        <View key={item.id} style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: colors[item.bg] }]}>
            <Icon name={item.icon} size={16} color={colors[item.color]} />
          </View>
          <View style={styles.activityContent}>
            <Text style={[styles.activityTitle, { color: colors.text }]}>{item.label}</Text>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{item.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default RecentActivity;

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 16, borderRadius: 16, padding: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  activityIcon: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  activityContent: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
  activityTime: { fontSize: 12 },
});
