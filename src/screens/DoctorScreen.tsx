import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DoctorCard from '../components/DoctorCard';
import { useTheme } from '../context/ThemeContext';

const doctors = [
  { id: '1', name: 'Dr. Ayesha Khan', specialty: 'Cardiologist', location: 'Lahore, PK', hospital: 'Shaukat Khanum Hospital', available: 'Mon-Fri', rating: 4.8, reviews: 142, experience: '12 years', fee: 150, nextAvailable: 'Today 3:00 PM', languages: ['English', 'Urdu'], education: 'MBBS, MD', isOnline: true, videoConsultation: true, profileImage: 'a1' },
  { id: '2', name: 'Dr. Usman Raza', specialty: 'Dermatologist', location: 'Karachi, PK', hospital: 'Aga Khan Hospital', available: 'Tue-Thu, Sat', rating: 4.6, reviews: 89, experience: '8 years', fee: 120, nextAvailable: 'Tomorrow 10:00 AM', languages: ['English', 'Urdu', 'Sindhi'], education: 'MBBS, MD', isOnline: false, videoConsultation: true, profileImage: 'a2' },
  { id: '3', name: 'Dr. Sana Malik', specialty: 'General Physician', location: 'Islamabad, PK', hospital: 'PIMS', available: 'Mon-Sat', rating: 4.9, reviews: 203, experience: '15 years', fee: 100, nextAvailable: 'Today 5:30 PM', languages: ['English', 'Urdu'], education: 'MBBS, FCPS', isOnline: true, videoConsultation: false, profileImage: 'a3' },
  { id: '4', name: 'Dr. Ahmed Hassan', specialty: 'Neurologist', location: 'Lahore, PK', hospital: 'Services Hospital', available: 'Mon, Wed, Fri', rating: 4.7, reviews: 156, experience: '20 years', fee: 200, nextAvailable: 'June 13, 2:00 PM', languages: ['English', 'Urdu', 'Punjabi'], education: 'MBBS, FCPS', isOnline: true, videoConsultation: true, profileImage: 'a4' },
  { id: '5', name: 'Dr. Fatima Ali', specialty: 'Pediatrician', location: 'Karachi, PK', hospital: 'NICH', available: 'Mon-Fri', rating: 4.9, reviews: 178, experience: '10 years', fee: 130, nextAvailable: 'Today 4:15 PM', languages: ['English', 'Urdu'], education: 'MBBS, FCPS', isOnline: true, videoConsultation: true, profileImage: 'a5' },
];

const specialties = ['All', 'Cardiologist', 'Dermatologist', 'General Physician', 'Neurologist', 'Pediatrician'];

const DoctorScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filtered = doctors.filter((d) => {
    const matchSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpec = selectedSpecialty === 'All' || d.specialty === selectedSpecialty;
    return matchSearch && matchSpec;
  });

  const onlineDoctors = filtered.filter((d) => d.isOnline).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Find Doctors</Text>
        <Text style={[styles.headerSub, { color: colors.textSecondary }]}>Book appointments with top specialists</Text>
      </View>

      <View style={styles.searchRow}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Icon name="search" size={20} color={colors.placeholder} />
          <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search doctors..." placeholderTextColor={colors.placeholder} value={searchQuery} onChangeText={setSearchQuery} />
          {!!searchQuery && <TouchableOpacity onPress={() => setSearchQuery('')}><Icon name="clear" size={20} color={colors.placeholder} /></TouchableOpacity>}
        </View>
        <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <FeatherIcon name="sliders" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        {[{ n: filtered.length, l: 'Available' }, { n: onlineDoctors, l: 'Online' }, { n: '4.7', l: 'Avg Rating' }].map((s, i) => (
          <View key={i} style={[styles.stat, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{s.n}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{s.l}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {specialties.map((s) => (
          <TouchableOpacity key={s} style={[styles.chip, { backgroundColor: selectedSpecialty === s ? colors.primary : colors.surface, borderColor: colors.border }]} onPress={() => setSelectedSpecialty(s)}>
            <Text style={[styles.chipText, { color: selectedSpecialty === s ? '#fff' : colors.text }]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.resultCount, { color: colors.textSecondary }]}>{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</Text>

      <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={({ item }) => <DoctorCard doctor={item} onPress={() => {}} />} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  headerSub: { fontSize: 14 },
  searchRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 14, gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, justifyContent: 'center', borderWidth: 1 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 14, gap: 8 },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 12, elevation: 1 },
  statNum: { fontSize: 17, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 2 },
  chipScroll: { paddingLeft: 20, marginBottom: 12, maxHeight: 40 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginRight: 8, borderWidth: 1 },
  chipText: { fontSize: 13, fontWeight: '500' },
  resultCount: { paddingHorizontal: 20, marginBottom: 10, fontSize: 13 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
});

