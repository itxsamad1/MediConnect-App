import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DoctorCard from '../../components/DoctorCard';

const colors = {
  primary: '#3670c4',
  secondary: '#FF6F61',
  background: '#F9F9F9',
  text: '#1C1C1E',
  placeholder: '#A0A0A0',
  inputBackground: '#FFFFFF',
  buttonText: '#FFFFFF',
  border: '#E5E5E5',
  success: '#4CAF50',
  warning: '#FF9800',
  lightBlue: '#E3F2FD',
  lightGreen: '#E8F5E8',
  lightOrange: '#FFF3E0',
  lightRed: '#FFEBEE',
};

export function DoctorScreen({ navigation }) {
  state = {
    searchQuery: '',
    selectedSpecialty: 'All',
    selectedLocation: 'All',
    selectedSort: 'rating',
    doctors: [
      {
        id: '1',
        name: 'Dr. Ayesha Khan',
        specialty: 'Cardiologist',
        location: 'Lahore, PK',
        hospital: 'Shaukat Khanum Hospital',
        available: 'Mon-Fri',
        rating: 4.8,
        reviews: 142,
        experience: '12 years',
        fee: 150,
        nextAvailable: 'Today 3:00 PM',
        languages: ['English', 'Urdu'],
        education: 'MBBS, MD Cardiology',
        isOnline: true,
        videoConsultation: true,
        profileImage: 'avatar1',
      },
      {
        id: '2',
        name: 'Dr. Usman Raza',
        specialty: 'Dermatologist',
        location: 'Karachi, PK',
        hospital: 'Aga Khan University Hospital',
        available: 'Tue-Thu, Sat',
        rating: 4.6,
        reviews: 89,
        experience: '8 years',
        fee: 120,
        nextAvailable: 'Tomorrow 10:00 AM',
        languages: ['English', 'Urdu', 'Sindhi'],
        education: 'MBBS, MD Dermatology',
        isOnline: false,
        videoConsultation: true,
        profileImage: 'avatar2',
      },
      {
        id: '3',
        name: 'Dr. Sana Malik',
        specialty: 'General Physician',
        location: 'Islamabad, PK',
        hospital: 'Pakistan Institute of Medical Sciences',
        available: 'Mon-Sat',
        rating: 4.9,
        reviews: 203,
        experience: '15 years',
        fee: 100,
        nextAvailable: 'Today 5:30 PM',
        languages: ['English', 'Urdu'],
        education: 'MBBS, FCPS Family Medicine',
        isOnline: true,
        videoConsultation: false,
        profileImage: 'avatar3',
      },
      {
        id: '4',
        name: 'Dr. Ahmed Hassan',
        specialty: 'Neurologist',
        location: 'Lahore, PK',
        hospital: 'Services Hospital',
        available: 'Mon, Wed, Fri',
        rating: 4.7,
        reviews: 156,
        experience: '20 years',
        fee: 200,
        nextAvailable: 'June 13, 2:00 PM',
        languages: ['English', 'Urdu', 'Punjabi'],
        education: 'MBBS, FCPS Neurology',
        isOnline: true,
        videoConsultation: true,
        profileImage: 'avatar4',
      },
      {
        id: '5',
        name: 'Dr. Fatima Ali',
        specialty: 'Pediatrician',
        location: 'Karachi, PK',
        hospital: 'National Institute of Child Health',
        available: 'Mon-Fri',
        rating: 4.9,
        reviews: 178,
        experience: '10 years',
        fee: 130,
        nextAvailable: 'Today 4:15 PM',
        languages: ['English', 'Urdu'],
        education: 'MBBS, FCPS Pediatrics',
        isOnline: true,
        videoConsultation: true,
        profileImage: 'avatar5',
      },
      {
        id: '6',
        name: 'Dr. Imran Shah',
        specialty: 'Orthopedic',
        location: 'Islamabad, PK',
        hospital: 'Combined Military Hospital',
        available: 'Tue-Sat',
        rating: 4.5,
        reviews: 94,
        experience: '14 years',
        fee: 180,
        nextAvailable: 'Tomorrow 11:30 AM',
        languages: ['English', 'Urdu'],
        education: 'MBBS, MS Orthopedics',
        isOnline: false,
        videoConsultation: false,
        profileImage: 'avatar6',
      },
    ],
  };

  specialties = ['All', 'Cardiologist', 'Dermatologist', 'General Physician', 'Neurologist', 'Pediatrician', 'Orthopedic'];
  locations = ['All', 'Lahore, PK', 'Karachi, PK', 'Islamabad, PK'];
  sortOptions = [
    { key: 'rating', label: 'Highest Rated' },
    { key: 'experience', label: 'Most Experienced' },
    { key: 'fee_low', label: 'Lowest Fee' },
    { key: 'fee_high', label: 'Highest Fee' },
  ];

  handleDoctorSelect = (doctor) => {
    // Navigate to doctor detail screen
    console.log('Selected doctor:', doctor.name);
  };

  getFilteredDoctors = () => {
    let filtered = this.state.doctors;

    // Filter by search query
    if (this.state.searchQuery) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    }

    // Filter by specialty
    if (this.state.selectedSpecialty !== 'All') {
      filtered = filtered.filter(doctor => doctor.specialty === this.state.selectedSpecialty);
    }

    // Filter by location
    if (this.state.selectedLocation !== 'All') {
      filtered = filtered.filter(doctor => doctor.location === this.state.selectedLocation);
    }

    // Sort results
    switch (this.state.selectedSort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'experience':
        filtered.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
      case 'fee_low':
        filtered.sort((a, b) => a.fee - b.fee);
        break;
      case 'fee_high':
        filtered.sort((a, b) => b.fee - a.fee);
        break;
    }

    return filtered;
  };

  renderSpecialtyFilter = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
      {this.specialties.map(specialty => (
        <TouchableOpacity
          key={specialty}
          style={[
            styles.filterChip,
            this.state.selectedSpecialty === specialty && styles.activeFilterChip
          ]}
          onPress={() => this.setState({ selectedSpecialty: specialty })}
        >
          <Text style={[
            styles.filterChipText,
            this.state.selectedSpecialty === specialty && styles.activeFilterChipText
          ]}>
            {specialty}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  renderQuickStats = () => {
    const filteredDoctors = this.getFilteredDoctors();
    const onlineDoctors = filteredDoctors.filter(d => d.isOnline).length;
    const avgRating = filteredDoctors.reduce((sum, d) => sum + d.rating, 0) / filteredDoctors.length;
    const videoConsultation = filteredDoctors.filter(d => d.videoConsultation).length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{filteredDoctors.length}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{onlineDoctors}</Text>
          <Text style={styles.statLabel}>Online Now</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{avgRating ? avgRating.toFixed(1) : '0'}</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{videoConsultation}</Text>
          <Text style={styles.statLabel}>Video Call</Text>
        </View>
      </View>
    );
  };

 
    const filteredDoctors = this.getFilteredDoctors();

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Find Doctors</Text>
            <Text style={styles.headerSubtitle}>Book appointments with top specialists</Text>
          </View>
          <TouchableOpacity style={styles.mapButton}>
            <Icon name="map" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color={colors.placeholder} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors, specialties, hospitals..."
              value={this.state.searchQuery}
              onChangeText={(text) => this.setState({ searchQuery: text })}
              placeholderTextColor={colors.placeholder}
            />
            {this.state.searchQuery ? (
              <TouchableOpacity onPress={() => this.setState({ searchQuery: '' })}>
                <Icon name="clear" size={20} color={colors.placeholder} />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <FeatherIcon name="sliders" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        {this.renderQuickStats()}

        {/* Specialty Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Specialties</Text>
          {this.renderSpecialtyFilter()}
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.sortOptions.map(option => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortChip,
                  this.state.selectedSort === option.key && styles.activeSortChip
                ]}
                onPress={() => this.setState({ selectedSort: option.key })}
              >
                <Text style={[
                  styles.sortChipText,
                  this.state.selectedSort === option.key && styles.activeSortChipText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
          </Text>
          <TouchableOpacity style={styles.viewToggle}>
            <Icon name="view-list" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Doctors List */}
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DoctorCard doctor={item} onPress={this.handleDoctorSelect} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }


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
  mapButton: {
    padding: 8,
    backgroundColor: colors.lightBlue,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
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
  filterButton: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.placeholder,
    fontWeight: '500',
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeSortChip: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.primary,
  },
  sortChipText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  activeSortChipText: {
    color: colors.primary,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '500',
  },
  viewToggle: {
    padding: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default DoctorScreen;