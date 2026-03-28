import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';

interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  fee: string;
  status: string;
  statusColorKey: string;
  type: string;
  avatarBgKey: string;
  avatarColorKey: string;
}

const allAppointments: Record<string, Appointment[]> = {
  upcoming: [
    { id: 1, doctorName: 'Dr. Sarah Ahmed', specialty: 'Cardiologist', hospital: 'City Medical Center', date: 'June 12, 2025', time: '2:30 PM', fee: '150', status: 'Confirmed', statusColorKey: 'success', type: 'video', avatarBgKey: 'infoLight', avatarColorKey: 'primary' },
    { id: 2, doctorName: 'Dr. Michael Chen', specialty: 'Dermatologist', hospital: 'Metro Health Clinic', date: 'June 15, 2025', time: '10:00 AM', fee: '120', status: 'Pending', statusColorKey: 'warning', type: 'in-person', avatarBgKey: 'warningLight', avatarColorKey: 'warning' },
    { id: 3, doctorName: 'Dr. Emily Rodriguez', specialty: 'Neurologist', hospital: 'University Hospital', date: 'June 18, 2025', time: '4:15 PM', fee: '200', status: 'Confirmed', statusColorKey: 'success', type: 'video', avatarBgKey: 'successLight', avatarColorKey: 'success' },
  ],
  past: [
    { id: 4, doctorName: 'Dr. James Wilson', specialty: 'General Medicine', hospital: 'Community Center', date: 'May 28, 2025', time: '11:30 AM', fee: '100', status: 'Completed', statusColorKey: 'success', type: 'in-person', avatarBgKey: 'infoLight', avatarColorKey: 'primary' },
    { id: 5, doctorName: 'Dr. Lisa Thompson', specialty: 'Orthopedic', hospital: 'Sports Clinic', date: 'May 20, 2025', time: '3:00 PM', fee: '180', status: 'Completed', statusColorKey: 'success', type: 'in-person', avatarBgKey: 'successLight', avatarColorKey: 'success' },
  ],
  cancelled: [
    { id: 6, doctorName: 'Dr. Robert Brown', specialty: 'Psychiatrist', hospital: 'Mental Health Center', date: 'June 10, 2025', time: '1:00 PM', fee: '160', status: 'Cancelled', statusColorKey: 'danger', type: 'video', avatarBgKey: 'dangerLight', avatarColorKey: 'danger' },
  ],
};

const AppointmentScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<string>('upcoming');
  const appointments = allAppointments[selectedTab] || [];

  const TabBtn = ({ tab, title, count }: { tab: string; title: string; count: number }) => (
    <TouchableOpacity style={[styles.tabBtn, selectedTab === tab && { backgroundColor: colors.primary }]} onPress={() => setSelectedTab(tab)}>
      <Text style={[styles.tabText, { color: selectedTab === tab ? '#fff' : colors.text }]}>{title}</Text>
      {count > 0 && <View style={[styles.countBadge, { backgroundColor: colors.danger }]}><Text style={styles.countText}>{count}</Text></View>}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>My Appointments</Text>
          <Text style={[styles.headerSub, { color: colors.textSecondary }]}>Manage your healthcare schedule</Text>
        </View>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]}><AntIcon name="plus" size={20} color="#fff" /></TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        {[{ n: '3', l: 'Upcoming' }, { n: '12', l: 'This Month' }, { n: '2', l: 'Video Calls' }].map((s, i) => (
          <View key={i} style={[styles.stat, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{s.n}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{s.l}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.tabRow, { backgroundColor: colors.surface }]}>
        <TabBtn tab="upcoming" title="Upcoming" count={3} />
        <TabBtn tab="past" title="Past" count={2} />
        <TabBtn tab="cancelled" title="Cancelled" count={1} />
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {appointments.map((a) => (
          <View key={a.id} style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: colors[a.avatarBgKey] }]}>
                <Icon name="person" size={24} color={colors[a.avatarColorKey]} />
              </View>
              <View style={styles.info}>
                <Text style={[styles.docName, { color: colors.text }]}>{a.doctorName}</Text>
                <Text style={[styles.specialty, { color: colors.textSecondary }]}>{a.specialty}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="location-on" size={14} color={colors.textSecondary} />
                  <Text style={[styles.hospital, { color: colors.textSecondary }]}>{a.hospital}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors[a.statusColorKey] }]}>
                <Text style={styles.statusText}>{a.status}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}><Icon name="today" size={14} color={colors.primary} /><Text style={[styles.detailText, { color: colors.text }]}>{a.date}</Text></View>
              <View style={styles.detailItem}><Icon name="access-time" size={14} color={colors.primary} /><Text style={[styles.detailText, { color: colors.text }]}>{a.time}</Text></View>
              <View style={styles.detailItem}><Icon name="payment" size={14} color={colors.primary} /><Text style={[styles.detailText, { color: colors.text }]}>${a.fee}</Text></View>
            </View>

            {a.type === 'video' && (
              <View style={[styles.videoBanner, { backgroundColor: colors.infoLight }]}>
                <Icon name="videocam" size={16} color={colors.primary} />
                <Text style={[styles.videoText, { color: colors.primary }]}> Video Consultation Available</Text>
              </View>
            )}

            <View style={styles.actionsRow}>
              {selectedTab === 'upcoming' && (
                <>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.infoLight }]}><Icon name="chat" size={14} color={colors.primary} /><Text style={[styles.actionText, { color: colors.primary }]}> Message</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}><Icon name="videocam" size={14} color="#fff" /><Text style={[styles.actionText, { color: '#fff' }]}> Join</Text></TouchableOpacity>
                </>
              )}
              {selectedTab === 'past' && (
                <>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.infoLight }]}><Icon name="receipt" size={14} color={colors.primary} /><Text style={[styles.actionText, { color: colors.primary }]}> Report</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.successLight }]}><Icon name="refresh" size={14} color={colors.success} /><Text style={[styles.actionText, { color: colors.success }]}> Book Again</Text></TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}><Icon name="add" size={24} color="#fff" /></TouchableOpacity>
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  headerSub: { fontSize: 14 },
  addBtn: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, marginVertical: 12, gap: 8 },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 12, elevation: 1 },
  statNum: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 2 },
  tabRow: { flexDirection: 'row', marginHorizontal: 20, borderRadius: 12, padding: 4, marginBottom: 12 },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8 },
  tabText: { fontSize: 13, fontWeight: '500' },
  countBadge: { borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1, marginLeft: 6 },
  countText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  list: { flex: 1, paddingHorizontal: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 14, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  info: { flex: 1 },
  docName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  specialty: { fontSize: 12, marginBottom: 2 },
  hospital: { fontSize: 11, marginLeft: 4 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: 12, fontWeight: '500' },
  videoBanner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 10 },
  videoText: { fontSize: 12, fontWeight: '500' },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, flex: 1, justifyContent: 'center' },
  actionText: { fontSize: 12, fontWeight: '500' },
  fab: { position: 'absolute', bottom: 24, right: 20, width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', elevation: 6 },
});

