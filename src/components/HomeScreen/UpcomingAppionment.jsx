import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import colors from '../../theme/Color'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
function Upcoming() {
  return (
        <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                <TouchableOpacity>
                  <AntIcon name="plus" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.appointmentCard}>
                <View style={styles.appointmentLeft}>
                  <View style={styles.doctorAvatar}>
                    <Icon name="person" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.doctorName}>Dr. Sarah Ahmed</Text>
                    <Text style={styles.specialty}>Cardiologist</Text>
                    <Text style={styles.hospital}>City Medical Center</Text>
                  </View>
                </View>
                <View style={styles.appointmentRight}>
                  <Text style={styles.appointmentDate}>June 12</Text>
                  <Text style={styles.appointmentTime}>2:30 PM</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Confirmed</Text>
                  </View>
                </View>
              </View>
    
              <View style={styles.appointmentActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Icon name="videocam" size={16} color={colors.primary} />
                  <Text style={styles.actionBtnText}>Join Video Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Icon name="chat" size={16} color={colors.primary} />
                  <Text style={styles.actionBtnText}>Message Doctor</Text>
                </TouchableOpacity>
              </View>
            </View>
  )
}

export default Upcoming


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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: colors.placeholder,
    marginBottom: 2,
  },
  hospital: {
    fontSize: 12,
    color: colors.placeholder,
  },
  appointmentRight: {
    alignItems: 'flex-end',
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  appointmentTime: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionBtnText: {
    marginLeft: 6,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
})