import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../theme/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const HealthTip = () => {
  return (
    <View style={styles.tipsCard}>
      <Text style={styles.sectionTitle}>Today's Health Tips</Text>
        <View style={styles.tipItem}>
          <View style={styles.tipIcon}>
            <FeatherIcon name="droplet" size={16} color={colors.primary} />
          </View>
          <Text style={styles.tipText}>
            Drink at least 8 glasses of water daily for optimal hydration
          </Text>
        </View>

        <View style={styles.tipItem}>
          <View style={styles.tipIcon}>
            <Icon name="directions-run" size={16} color={colors.success} />
          </View>
          <Text style={styles.tipText}>
            Get 30 minutes of moderate exercise to boost your energy
          </Text>
        </View>

        <View style={styles.tipItem}>
          <View style={styles.tipIcon}>
            <FeatherIcon name="moon" size={16} color={colors.secondary} />
          </View>
          <Text style={styles.tipText}>
            Aim for 7-9 hours of quality sleep for better recovery
          </Text>
        </View>
      </View>
  );
};

export default HealthTip;

const styles = StyleSheet.create({
  tipsCard: {
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
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
