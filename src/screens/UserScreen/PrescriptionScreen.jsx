import React, { useState, useMemo } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  TextInput, ScrollView, Modal 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  primary: '#3670c4',
  secondary: '#FF6F61',
  background: '#F9F9F9',
  text: '#1C1C1E',
  placeholder: '#A0A0A0',
  inputBackground: '#FFFFFF',
  border: '#E5E5E5',
  success: '#4CAF50',
  expired: '#FF5722',
  lightBlue: '#E3F2FD',
};

const SAMPLE_PRESCRIPTIONS = [
  {
    id: '1',
    medicationName: 'Metformin 500mg',
    dosage: '500mg twice daily',
    prescribedBy: 'Dr. Ayesha Khan',
    prescribedDate: '2025-05-15',
    expiryDate: '2025-11-15',
    status: 'current',
    instructions: 'Take with meals to reduce stomach upset',
    category: 'Diabetes',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
    warnings: ['Monitor blood sugar levels regularly'],
    notes: 'Patient responding well to treatment',
  },
  {
    id: '2',
    medicationName: 'Lisinopril 10mg',
    dosage: '10mg once daily',
    prescribedBy: 'Dr. Ahmed Hassan',
    prescribedDate: '2025-04-20',
    expiryDate: '2025-10-20',
    status: 'current',
    instructions: 'Take in the morning, preferably at the same time each day',
    category: 'Blood Pressure',
    sideEffects: ['Dizziness', 'Dry cough', 'Fatigue'],
    warnings: ['May cause dizziness when standing up quickly'],
    notes: 'Continue current dosage, check BP weekly',
  },
  {
    id: '3',
    medicationName: 'Tramadol 50mg',
    dosage: '50mg as needed',
    prescribedBy: 'Dr. Imran Shah',
    prescribedDate: '2025-03-10',
    expiryDate: '2025-06-10',
    status: 'past',
    instructions: 'Take only when needed for pain, maximum 4 times daily',
    category: 'Pain Relief',
    sideEffects: ['Drowsiness', 'Nausea', 'Dizziness'],
    warnings: ['May cause dependence', 'Do not drive while taking'],
    notes: 'Treatment completed successfully',
  },
  {
    id: '4',
    medicationName: 'Atorvastatin 20mg',
    dosage: '20mg at bedtime',
    prescribedBy: 'Dr. Ayesha Khan',
    prescribedDate: '2025-02-15',
    expiryDate: '2025-05-15',
    status: 'past',
    instructions: 'Take at bedtime with or without food',
    category: 'Cholesterol',
    sideEffects: ['Muscle pain', 'Liver problems'],
    warnings: ['Regular liver function tests recommended'],
    notes: 'Switched to different medication due to side effects',
  },
  {
    id: '5',
    medicationName: 'Amoxicillin 250mg',
    dosage: '250mg three times daily',
    prescribedBy: 'Dr. Fatima Ali',
    prescribedDate: '2025-01-05',
    expiryDate: '2025-01-15',
    status: 'past',
    instructions: 'Take with food, complete full course',
    category: 'Antibiotic',
    sideEffects: ['Stomach upset', 'Diarrhea'],
    warnings: ['Complete full course even if feeling better'],
    notes: 'Infection cleared successfully',
  },
];

const FILTER_OPTIONS = ['All', 'Current', 'Past'];
const SORT_OPTIONS = [
  { key: 'date', label: 'Date Prescribed' },
  { key: 'name', label: 'Medication Name' },
  { key: 'doctor', label: 'Doctor Name' },
];

const PrescriptionScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('date');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const getStatusColor = (prescription) => {
    return prescription.status === 'current' ? colors.success : colors.expired;
  };

  const getStatusText = (prescription) => {
    return prescription.status === 'current' ? 'Current' : 'Past';
  };

  const filteredPrescriptions = useMemo(() => {
    let filtered = SAMPLE_PRESCRIPTIONS;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    switch (selectedFilter) {
      case 'Current':
        filtered = filtered.filter(p => p.status === 'current');
        break;
      case 'Past':
        filtered = filtered.filter(p => p.status === 'past');
        break;
    }

    // Sort results
    switch (selectedSort) {
      case 'name':
        filtered.sort((a, b) => a.medicationName.localeCompare(b.medicationName));
        break;
      case 'doctor':
        filtered.sort((a, b) => a.prescribedBy.localeCompare(b.prescribedBy));
        break;
      default:
        filtered.sort((a, b) => new Date(b.prescribedDate) - new Date(a.prescribedDate));
    }

    return filtered;
  }, [searchQuery, selectedFilter, selectedSort]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const QuickStats = () => {
    const currentCount = SAMPLE_PRESCRIPTIONS.filter(p => p.status === 'current').length;
    const pastCount = SAMPLE_PRESCRIPTIONS.filter(p => p.status === 'past').length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{SAMPLE_PRESCRIPTIONS.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{currentCount}</Text>
          <Text style={styles.statLabel}>Current</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pastCount}</Text>
          <Text style={styles.statLabel}>Past</Text>
        </View>
      </View>
    );
  };

  const FilterChips = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
      {FILTER_OPTIONS.map(filter => (
        <TouchableOpacity
          key={filter}
          style={[styles.filterChip, selectedFilter === filter && styles.activeFilterChip]}
          onPress={() => setSelectedFilter(filter)}
        >
          <Text style={[styles.filterChipText, selectedFilter === filter && styles.activeFilterChipText]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const PrescriptionCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.prescriptionCard}
      onPress={() => { 
        setSelectedPrescription(item); 
        setShowDetailsModal(true); 
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>{item.medicationName}</Text>
          <Text style={styles.dosage}>{item.dosage}</Text>
          <Text style={styles.prescribedBy}>Prescribed by {item.prescribedBy}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item) }]}>
          <Text style={styles.statusText}>{getStatusText(item)}</Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Icon name="event" size={16} color={colors.placeholder} />
          <Text style={styles.detailText}>Prescribed: {formatDate(item.prescribedDate)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="category" size={16} color={colors.placeholder} />
          <Text style={styles.detailText}>{item.category}</Text>
        </View>
        {item.status === 'current' && (
          <View style={styles.detailRow}>
            <Icon name="schedule" size={16} color={colors.placeholder} />
            <Text style={styles.detailText}>Expires: {formatDate(item.expiryDate)}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.viewDetailsText}>Tap to view full prescription</Text>
        <Icon name="chevron-right" size={20} color={colors.placeholder} />
      </View>
    </TouchableOpacity>
  );

  const DetailsModal = () => (
    <Modal
      visible={showDetailsModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowDetailsModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.detailsModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Prescription Details</Text>
            <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
              <Icon name="close" size={24} color={colors.placeholder} />
            </TouchableOpacity>
          </View>

          {selectedPrescription && (
            <ScrollView style={styles.detailsScrollView}>
              {/* Medication Info Section */}
              <View style={styles.detailsSection}>
                <Text style={styles.detailsSectionTitle}>Medication Information</Text>
                <View style={styles.prescriptionHeader}>
                  <Text style={styles.modalMedicationName}>{selectedPrescription.medicationName}</Text>
                  <View style={[styles.modalStatusBadge, { backgroundColor: getStatusColor(selectedPrescription) }]}>
                    <Text style={styles.modalStatusText}>{getStatusText(selectedPrescription)}</Text>
                  </View>
                </View>
                
                {[
                  ['Dosage', selectedPrescription.dosage],
                  ['Category', selectedPrescription.category],
                  ['Instructions', selectedPrescription.instructions],
                  ['Prescribed by', selectedPrescription.prescribedBy],
                  ['Prescribed Date', formatDate(selectedPrescription.prescribedDate)],
                  ['Expiry Date', formatDate(selectedPrescription.expiryDate)],
                ].map(([label, value], index) => (
                  <View key={index} style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{label}:</Text>
                    <Text style={styles.detailValue}>{value}</Text>
                  </View>
                ))}

                {selectedPrescription.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesTitle}>Doctor's Notes:</Text>
                    <Text style={styles.notesText}>{selectedPrescription.notes}</Text>
                  </View>
                )}
              </View>

              {/* Side Effects Section */}
              {selectedPrescription.sideEffects?.length > 0 && (
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Possible Side Effects</Text>
                  {selectedPrescription.sideEffects.map((effect, index) => (
                    <View key={index} style={styles.listItemContainer}>
                      <Text style={styles.listBullet}>•</Text>
                      <Text style={styles.sideEffectItem}>{effect}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Warnings Section */}
              {selectedPrescription.warnings?.length > 0 && (
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Important Warnings</Text>
                  {selectedPrescription.warnings.map((warning, index) => (
                    <View key={index} style={styles.warningContainer}>
                      <Icon name="warning" size={16} color={colors.expired} />
                      <Text style={styles.warningItem}>{warning}</Text>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Prescriptions</Text>
          <Text style={styles.headerSubtitle}>View your medical prescriptions</Text>
        </View>
        <TouchableOpacity style={styles.scanButton}>
          <Icon name="qr-code-scanner" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.placeholder} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medications, doctors, categories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.placeholder}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="clear" size={20} color={colors.placeholder} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <QuickStats />

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filter</Text>
        <FilterChips />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SORT_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[styles.sortChip, selectedSort === option.key && styles.activeSortChip]}
              onPress={() => setSelectedSort(option.key)}
            >
              <Text style={[styles.sortChipText, selectedSort === option.key && styles.activeSortChipText]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <Text style={styles.resultsCount}>
        {filteredPrescriptions.length} prescription{filteredPrescriptions.length !== 1 ? 's' : ''} found
      </Text>

      <FlatList
        data={filteredPrescriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PrescriptionCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <DetailsModal />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.placeholder,
    marginTop: 4,
  },
  scanButton: {
    padding: 12,
    backgroundColor: colors.lightBlue,
    borderRadius: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.placeholder,
    marginTop: 4,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterScroll: {
    paddingLeft: 20,
  },
  filterChip: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.text,
  },
  activeFilterChipText: {
    color: '#fff',
  },
  sortContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  sortChip: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeSortChip: {
    backgroundColor: colors.primary,
  },
  sortChipText: {
    fontSize: 12,
    color: colors.text,
  },
  activeSortChipText: {
    color: '#fff',
  },
  resultsCount: {
    fontSize: 14,
    color: colors.placeholder,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  prescriptionCard: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  dosage: {
    fontSize: 14,
    color: colors.placeholder,
    marginTop: 4,
  },
  prescribedBy: {
    fontSize: 12,
    color: colors.placeholder,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  cardDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewDetailsText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  detailsModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  detailsScrollView: {
    flex: 1,
  },
  detailsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalMedicationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  modalStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modalStatusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.placeholder,
    width: 120,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  notesContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.lightBlue,
    borderRadius: 8,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listBullet: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
    marginTop: 2,
  },
  sideEffectItem: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
  },
  warningItem: {
    fontSize: 14,
    color: colors.expired,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});

export default PrescriptionScreen;