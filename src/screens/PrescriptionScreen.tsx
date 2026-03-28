import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Modal, ListRenderItem } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  prescribedBy: string;
  prescribedDate: string;
  expiryDate: string;
  status: string;
  instructions: string;
  category: string;
  sideEffects: string[];
  warnings: string[];
  notes: string;
}

const PRESCRIPTIONS: Prescription[] = [
  { id: '1', medicationName: 'Metformin 500mg', dosage: '500mg twice daily', prescribedBy: 'Dr. Ayesha Khan', prescribedDate: '2025-05-15', expiryDate: '2025-11-15', status: 'current', instructions: 'Take with meals', category: 'Diabetes', sideEffects: ['Nausea', 'Diarrhea'], warnings: ['Monitor blood sugar'], notes: 'Patient responding well' },
  { id: '2', medicationName: 'Lisinopril 10mg', dosage: '10mg once daily', prescribedBy: 'Dr. Ahmed Hassan', prescribedDate: '2025-04-20', expiryDate: '2025-10-20', status: 'current', instructions: 'Take in the morning', category: 'Blood Pressure', sideEffects: ['Dizziness', 'Dry cough'], warnings: ['May cause dizziness'], notes: 'Check BP weekly' },
  { id: '3', medicationName: 'Amoxicillin 250mg', dosage: '250mg 3x daily', prescribedBy: 'Dr. Fatima Ali', prescribedDate: '2025-01-05', expiryDate: '2025-01-15', status: 'past', instructions: 'Take with food', category: 'Antibiotic', sideEffects: ['Stomach upset'], warnings: ['Complete full course'], notes: 'Infection cleared' },
  { id: '4', medicationName: 'Tramadol 50mg', dosage: '50mg as needed', prescribedBy: 'Dr. Imran Shah', prescribedDate: '2025-03-10', expiryDate: '2025-06-10', status: 'past', instructions: 'Max 4 times daily', category: 'Pain Relief', sideEffects: ['Drowsiness'], warnings: ['Do not drive'], notes: 'Treatment completed' },
];

const FILTERS = ['All', 'Current', 'Past'];

const PrescriptionScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Prescription | null>(null);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const filtered = useMemo(() => {
    let result = [...PRESCRIPTIONS];
    if (searchQuery) result = result.filter((p) => p.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) || p.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedFilter === 'Current') result = result.filter((p) => p.status === 'current');
    if (selectedFilter === 'Past') result = result.filter((p) => p.status === 'past');
    return result;
  }, [searchQuery, selectedFilter]);

  const currentCount = PRESCRIPTIONS.filter((p) => p.status === 'current').length;
  const pastCount = PRESCRIPTIONS.filter((p) => p.status === 'past').length;

  const renderItem: ListRenderItem<Prescription> = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => { setSelected(item); setShowModal(true); }}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.medName, { color: colors.text }]}>{item.medicationName}</Text>
          <Text style={[styles.dosage, { color: colors.textSecondary }]}>{item.dosage}</Text>
          <Text style={[styles.prescribedBy, { color: colors.textSecondary }]}>By {item.prescribedBy}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'current' ? colors.success : colors.warning }]}>
          <Text style={styles.statusText}>{item.status === 'current' ? 'Current' : 'Past'}</Text>
        </View>
      </View>
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}><Icon name="event" size={14} color={colors.textSecondary} /><Text style={[styles.detailText, { color: colors.text }]}>{formatDate(item.prescribedDate)}</Text></View>
        <View style={styles.detailItem}><Icon name="category" size={14} color={colors.textSecondary} /><Text style={[styles.detailText, { color: colors.text }]}>{item.category}</Text></View>
      </View>
      <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
        <Text style={[styles.viewText, { color: colors.primary }]}>Tap to view full prescription</Text>
        <Icon name="chevron-right" size={18} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>My Prescriptions</Text>
          <Text style={[styles.headerSub, { color: colors.textSecondary }]}>View your medical prescriptions</Text>
        </View>
        <TouchableOpacity style={[styles.scanBtn, { backgroundColor: colors.infoLight }]}><Icon name="qr-code-scanner" size={20} color={colors.primary} /></TouchableOpacity>
      </View>

      <View style={[styles.searchBar, { backgroundColor: colors.surface, marginHorizontal: 20, marginVertical: 12, borderColor: colors.border }]}>
        <Icon name="search" size={20} color={colors.placeholder} />
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search medications..." placeholderTextColor={colors.placeholder} value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <View style={styles.statsRow}>
        {[{ n: PRESCRIPTIONS.length, l: 'Total' }, { n: currentCount, l: 'Current' }, { n: pastCount, l: 'Past' }].map((s, i) => (
          <View key={i} style={[styles.stat, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{s.n}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{s.l}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f} style={[styles.chip, { backgroundColor: selectedFilter === f ? colors.primary : colors.surface }]} onPress={() => setSelectedFilter(f)}>
            <Text style={[styles.chipText, { color: selectedFilter === f ? '#fff' : colors.text }]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.resultCount, { color: colors.textSecondary }]}>{filtered.length} prescription{filtered.length !== 1 ? 's' : ''}</Text>
      <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={renderItem} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />

      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Prescription Details</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}><Icon name="close" size={24} color={colors.textSecondary} /></TouchableOpacity>
            </View>
            {selected && (
              <ScrollView style={{ padding: 20 }}>
                <Text style={[styles.medName, { color: colors.text, fontSize: 18, marginBottom: 10 }]}>{selected.medicationName}</Text>
                {[['Dosage', selected.dosage], ['Category', selected.category], ['Instructions', selected.instructions], ['Prescribed by', selected.prescribedBy], ['Date', formatDate(selected.prescribedDate)], ['Expiry', formatDate(selected.expiryDate)]].map(([l, v], i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{l}:</Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>{v}</Text>
                  </View>
                ))}
                {selected.notes && <View style={[styles.notesBox, { backgroundColor: colors.infoLight }]}><Text style={[styles.notesTitle, { color: colors.primary }]}>Doctor's Notes:</Text><Text style={[styles.notesText, { color: colors.text }]}>{selected.notes}</Text></View>}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PrescriptionScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSub: { fontSize: 14, marginTop: 4 },
  scanBtn: { padding: 10, borderRadius: 8 },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 12, gap: 8 },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12, elevation: 1 },
  statNum: { fontSize: 17, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 2 },
  chipScroll: { paddingLeft: 20, marginBottom: 10, maxHeight: 36 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 18, marginRight: 8 },
  chipText: { fontSize: 13, fontWeight: '500' },
  resultCount: { paddingHorizontal: 20, marginBottom: 8, fontSize: 13 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { borderRadius: 14, padding: 16, marginBottom: 14, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  medName: { fontSize: 16, fontWeight: '700' },
  dosage: { fontSize: 12, marginTop: 2 },
  prescribedBy: { fontSize: 11, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, alignSelf: 'flex-start' },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  detailsRow: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 1 },
  viewText: { fontSize: 12, fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  detailLabel: { width: 110, fontSize: 13, fontWeight: '500' },
  detailValue: { flex: 1, fontSize: 13 },
  notesBox: { marginTop: 12, padding: 12, borderRadius: 8 },
  notesTitle: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  notesText: { fontSize: 13, lineHeight: 20 },
});

