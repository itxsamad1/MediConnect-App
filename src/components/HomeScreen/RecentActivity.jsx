import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../theme/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecentActivity = () => {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
     
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: colors.lightBlue }]}>
            <Icon name="assignment" size={16} color={colors.primary} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Lab Results Available</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#FFF3E0' }]}>
            <Icon name="local-pharmacy" size={16} color={colors.warning} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Prescription Refill Ready</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
      </View>
  
  );
};

export default RecentActivity;

const styles = StyleSheet.create({
  sectionCard: {
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
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: colors.placeholder,
  },
});
