import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const colors = {
  primary: '#3670c4',
  secondary: '#FF6F61',
  background: '#F9F9F9',
  text: '#1C1C1E',
  placeholder: '#A0A0A0',
  inputBackground: '#FFFFFF',
  buttonText: '#FFFFFF',
  border: '#E5E5E5',
  success: '#4CAE50',
  warning: '#FF9800',
  lightBlue: '#E3F2FD',
  lightGreen: '#E8F5E8',
  lightOrange: '#FFF3E0',
  lightRed: '#FFEBEE',
};

const AppointmentScreen = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const renderTabButton = (tab, title, count) => (
    <TouchableOpacity 
      style={[
        styles.tabButton, 
        selectedTab === tab && styles.activeTab
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabText, 
        selectedTab === tab && styles.activeTabText
      ]}>
        {title}
      </Text>
      {count > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderAppointmentCard = (appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.doctorSection}>
          <View style={[styles.doctorAvatar, { backgroundColor: appointment.avatarBg }]}>
            <Icon name="person" size={24} color={appointment.avatarColor} />
          </View>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialty}>{appointment.specialty}</Text>
            <View style={styles.hospitalRow}>
              <Icon name="location-on" size={14} color={colors.placeholder} />
              <Text style={styles.hospital}>{appointment.hospital}</Text>
            </View>
          </View>
        </View>
        <View style={styles.appointmentMeta}>
          <View style={[styles.statusBadge, { backgroundColor: appointment.statusColor }]}>
            <Text style={styles.statusText}>{appointment.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Icon name="today" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{appointment.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="access-time" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="payment" size={16} color={colors.primary} />
          <Text style={styles.detailText}>${appointment.fee}</Text>
        </View>
      </View>

      {appointment.type === 'video' && (
        <View style={styles.videoCallBanner}>
          <Icon name="videocam" size={16} color={colors.primary} />
          <Text style={styles.videoCallText}>Video Consultation Available</Text>
        </View>
      )}

      <View style={styles.appointmentActions}>
        {selectedTab === 'upcoming' && (
          <>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="chat" size={16} color={colors.primary} />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
              <Icon name="videocam" size={16} color="#fff" />
              <Text style={[styles.actionButtonText, { color: '#fff' }]}>Join Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <FeatherIcon name="more-horizontal" size={16} color={colors.text} />
            </TouchableOpacity>
          </>
        )}
        
        {selectedTab === 'past' && (
          <>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="receipt" size={16} color={colors.primary} />
              <Text style={styles.actionButtonText}>View Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="refresh" size={16} color={colors.success} />
              <Text style={styles.actionButtonText}>Book Again</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  const getAppointments = () => {
    const allAppointments = {
      upcoming: [
        {
          id: 1,
          doctorName: 'Dr. Sarah Ahmed',
          specialty: 'Cardiologist',
          hospital: 'City Medical Center',
          date: 'June 12, 2025',
          time: '2:30 PM',
          fee: '150',
          status: 'Confirmed',
          statusColor: colors.success,
          type: 'video',
          avatarBg: colors.lightBlue,
          avatarColor: colors.primary,
        },
        {
          id: 2,
          doctorName: 'Dr. Michael Chen',
          specialty: 'Dermatologist',
          hospital: 'Metro Health Clinic',
          date: 'June 15, 2025',
          time: '10:00 AM',
          fee: '120',
          status: 'Pending',
          statusColor: colors.warning,
          type: 'in-person',
          avatarBg: colors.lightOrange,
          avatarColor: colors.warning,
        },
        {
          id: 3,
          doctorName: 'Dr. Emily Rodriguez',
          specialty: 'Neurologist',
          hospital: 'University Hospital',
          date: 'June 18, 2025',
          time: '4:15 PM',
          fee: '200',
          status: 'Confirmed',
          statusColor: colors.success,
          type: 'video',
          avatarBg: colors.lightGreen,
          avatarColor: colors.success,
        },
      ],
      past: [
        {
          id: 4,
          doctorName: 'Dr. James Wilson',
          specialty: 'General Medicine',
          hospital: 'Community Health Center',
          date: 'May 28, 2025',
          time: '11:30 AM',
          fee: '100',
          status: 'Completed',
          statusColor: colors.success,
          type: 'in-person',
          avatarBg: colors.lightBlue,
          avatarColor: colors.primary,
        },
        {
          id: 5,
          doctorName: 'Dr. Lisa Thompson',
          specialty: 'Orthopedic',
          hospital: 'Sports Medicine Clinic',
          date: 'May 20, 2025',
          time: '3:00 PM',
          fee: '180',
          status: 'Completed',
          statusColor: colors.success,
          type: 'in-person',
          avatarBg: colors.lightGreen,
          avatarColor: colors.success,
        },
      ],
      cancelled: [
        {
          id: 6,
          doctorName: 'Dr. Robert Brown',
          specialty: 'Psychiatrist',
          hospital: 'Mental Health Center',
          date: 'June 10, 2025',
          time: '1:00 PM',
          fee: '160',
          status: 'Cancelled',
          statusColor: colors.secondary,
          type: 'video',
          avatarBg: colors.lightRed,
          avatarColor: colors.secondary,
        },
      ],
    };
    
    return allAppointments[selectedTab] || [];
  };

  const appointments = getAppointments();
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>My Appointments</Text>
          <Text style={styles.headerSubtitle}>Manage your healthcare schedule</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <AntIcon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Video Calls</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('upcoming', 'Upcoming', 3)}
        {renderTabButton('past', 'Past', 2)}
        {renderTabButton('cancelled', 'Cancelled', 1)}
      </View>

      {/* Appointments List */}
      <ScrollView 
        style={styles.appointmentsList} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.appointmentsContent}
      >
        {appointments.length > 0 ? (
          appointments.map(appointment => renderAppointmentCard(appointment))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="event-busy" size={48} color={colors.placeholder} />
            <Text style={styles.emptyStateTitle}>No appointments found</Text>
            <Text style={styles.emptyStateText}>
              {selectedTab === 'upcoming' 
                ? 'Schedule your next appointment to get started'
                : `No ${selectedTab} appointments to show`}
            </Text>
            {selectedTab === 'upcoming' && (
              <TouchableOpacity style={styles.scheduleButton}>
                <Text style={styles.scheduleButtonText}>Schedule Appointment</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.placeholder,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: colors.inputBackground,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.placeholder,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  activeTabText: {
    color: '#fff',
  },
  countBadge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  countText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  appointmentsList: {
    flex: 1,
  },
  appointmentsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  appointmentCard: {
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: colors.placeholder,
    marginBottom: 4,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospital: {
    fontSize: 12,
    color: colors.placeholder,
    marginLeft: 4,
  },
  appointmentMeta: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 6,
    fontWeight: '500',
  },
  videoCallBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  videoCallText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  appointmentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  primaryAction: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  moreButton: {
    padding: 8,
    marginLeft: 'auto',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.placeholder,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  scheduleButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: colors.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default AppointmentScreen;