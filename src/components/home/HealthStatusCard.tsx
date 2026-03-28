import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../context/ThemeContext';

const HealthStatusCard: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Health Overview</Text>
        <TouchableOpacity><Text style={[styles.viewAll, { color: colors.primary }]}>View Details</Text></TouchableOpacity>
      </View>
      <View style={styles.metrics}>
        <View style={styles.metricItem}>
          <Icon name="favorite" size={20} color={colors.danger} />
          <Text style={[styles.value, { color: colors.text }]}>72</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Heart Rate</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.metricItem}>
          <Icon name="trending-up" size={20} color={colors.success} />
          <Text style={[styles.value, { color: colors.text }]}>120/80</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Blood Pressure</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.metricItem}>
          <FeatherIcon name="thermometer" size={20} color={colors.warning} />
          <Text style={[styles.value, { color: colors.text }]}>98.6°F</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Temperature</Text>
        </View>
      </View>
    </View>
  );
};

export default HealthStatusCard;

const styles = StyleSheet.create({
  card: { margin: 20, borderRadius: 16, padding: 20, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700' },
  viewAll: { fontSize: 13, fontWeight: '600' },
  metrics: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricItem: { alignItems: 'center', flex: 1 },
  divider: { width: 1, height: 40, marginHorizontal: 8 },
  value: { fontSize: 17, fontWeight: '700', marginTop: 8, marginBottom: 4 },
  label: { fontSize: 11, textAlign: 'center' },
});
