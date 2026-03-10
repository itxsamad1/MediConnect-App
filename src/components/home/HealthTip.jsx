import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../context/ThemeContext';

const tips = [
  { id: '1', icon: <FeatherIcon name="droplet" size={16} />, colorKey: 'primary', text: 'Drink at least 8 glasses of water daily for optimal hydration.' },
  { id: '2', icon: <Icon name="directions-run" size={16} />, colorKey: 'success', text: 'Get 30 minutes of moderate exercise to boost your energy.' },
  { id: '3', icon: <FeatherIcon name="moon" size={16} />, colorKey: 'info', text: 'Aim for 7-9 hours of quality sleep for better recovery.' },
];

const HealthTip = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Today's Health Tips</Text>
      {tips.map(tip => (
        <View key={tip.id} style={styles.tipItem}>
          <View style={[styles.tipIcon, { backgroundColor: colors.surfaceSecondary }]}>
            {React.cloneElement(tip.icon, { color: colors[tip.colorKey] })}
          </View>
          <Text style={[styles.tipText, { color: colors.textSecondary }]}>{tip.text}</Text>
        </View>
      ))}
    </View>
  );
};

export default HealthTip;

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 24, borderRadius: 16, padding: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  tipItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  tipIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 1 },
  tipText: { flex: 1, fontSize: 13, lineHeight: 20 },
});
