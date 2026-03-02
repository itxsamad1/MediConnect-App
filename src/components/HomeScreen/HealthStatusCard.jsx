import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import colors from '../../theme/Color'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
function HealthStatusCard() {
  return (
     <View style={styles.healthStatusCard}>
              <View style={styles.statusHeader}>
                <Text style={styles.statusTitle}>Health Overview</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View Details</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.statusMetrics}>
                <View style={styles.metricItem}>
                  <Icon name="favorite" size={20} color={colors.secondary} />
                  <Text style={styles.metricValue}>72</Text>
                  <Text style={styles.metricLabel}>Heart Rate</Text>
                </View>
                <View style={styles.metricItem}>
                  <Icon name="trending-up" size={20} color={colors.success} />
                  <Text style={styles.metricValue}>120/80</Text>
                  <Text style={styles.metricLabel}>Blood Pressure</Text>
                </View>
                <View style={styles.metricItem}>
                  <FeatherIcon name="thermometer" size={20} color={colors.warning} />
                  <Text style={styles.metricValue}>98.6°F</Text>
                  <Text style={styles.metricLabel}>Temperature</Text>
                </View>
              </View>
            </View>
  )
}

export default HealthStatusCard;


const styles = StyleSheet.create({
 healthStatusCard: {
    backgroundColor: colors.inputBackground,
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  statusMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.placeholder,
    textAlign: 'center',
  },
});