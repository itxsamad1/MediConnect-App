import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../context/ThemeContext';

const HealthTip: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Today's Health Tips</Text>
      <View style={styles.tipItem}>
        <View style={[styles.tipIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <FeatherIcon name="droplet" size={16} color={colors.primary} />
        </View>
        <Text style={[styles.tipText, { color: colors.textSecondary }]}>Drink at least 8 glasses of water daily for optimal hydration.</Text>
      </View>
      <View style={styles.tipItem}>
        <View style={[styles.tipIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <Icon name="directions-run" size={16} color={colors.success} />
        </View>
        <Text style={[styles.tipText, { color: colors.textSecondary }]}>Get 30 minutes of moderate exercise to boost your energy.</Text>
      </View>
      <View style={styles.tipItem}>
        <View style={[styles.tipIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <FeatherIcon name="moon" size={16} color={colors.info} />
        </View>
        <Text style={[styles.tipText, { color: colors.textSecondary }]}>Aim for 7-9 hours of quality sleep for better recovery.</Text>
      </View>
    </View>
  );
};

export default HealthTip;

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 24, borderRadius: 16, padding: 20, elevation: 3 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  tipItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  tipIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 1 },
  tipText: { flex: 1, fontSize: 13, lineHeight: 20 },
});
