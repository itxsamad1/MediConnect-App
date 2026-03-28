import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../context/ThemeContext';

const UpcomingAppointment: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Upcoming Appointments</Text>
        <TouchableOpacity><AntIcon name="plus" size={20} color={colors.primary} /></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={[styles.avatar, { backgroundColor: colors.infoLight }]}>
          <Icon name="person" size={24} color={colors.primary} />
        </View>
        <View style={styles.info}>
          <Text style={[styles.doctorName, { color: colors.text }]}>Dr. Sarah Ahmed</Text>
          <Text style={[styles.specialty, { color: colors.textSecondary }]}>Cardiologist</Text>
          <Text style={[styles.hospital, { color: colors.textSecondary }]}>City Medical Center</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={[styles.date, { color: colors.text }]}>June 12</Text>
          <Text style={[styles.time, { color: colors.primary }]}>2:30 PM</Text>
          <View style={[styles.badge, { backgroundColor: colors.successLight }]}>
            <Text style={[styles.badgeText, { color: colors.success }]}>Confirmed</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.infoLight }]}>
          <Icon name="videocam" size={16} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Video Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.infoLight }]}>
          <Icon name="chat" size={16} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpcomingAppointment;

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, marginBottom: 16, borderRadius: 16, padding: 20, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  info: { flex: 1 },
  doctorName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  specialty: { fontSize: 13, marginBottom: 2 },
  hospital: { fontSize: 12 },
  timeSection: { alignItems: 'flex-end' },
  date: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  time: { fontSize: 13, marginBottom: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, flex: 1, justifyContent: 'center', gap: 6 },
  actionText: { fontSize: 12, fontWeight: '500' },
});
