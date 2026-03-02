import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  success: '#4CAF50',
  warning: '#FF9800',
  lightBlue: '#E3F2FD',
  lightGreen: '#E8F5E8',
  lightOrange: '#FFF3E0',
  lightRed: '#FFEBEE',
};

const DoctorCard = ({ doctor, onPress }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={12} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={12} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-border" size={12} color="#FFD700" />
      );
    }

    return stars;
  };

  const getSpecialtyColor = (specialty) => {
    const specialtyColors = {
      'Cardiologist': colors.secondary,
      'Dermatologist': colors.warning,
      'General Physician': colors.success,
      'Neurologist': colors.primary,
      'Pediatrician': '#E91E63',
      'Orthopedic': '#795548',
    };
    return specialtyColors[specialty] || colors.primary;
  };

  const getSpecialtyBackground = (specialty) => {
    const specialtyBgs = {
      'Cardiologist': colors.lightRed,
      'Dermatologist': colors.lightOrange,
      'General Physician': colors.lightGreen,
      'Neurologist': colors.lightBlue,
      'Pediatrician': '#FCE4EC',
      'Orthopedic': '#EFEBE9',
    };
    return specialtyBgs[specialty] || colors.lightBlue;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(doctor)}>
      {/* Doctor Header */}
      <View style={styles.cardHeader}>
        <View style={styles.doctorInfo}>
          <View style={[styles.doctorAvatar, { backgroundColor: getSpecialtyBackground(doctor.specialty) }]}>
            <Icon name="person" size={24} color={getSpecialtyColor(doctor.specialty)} />
          </View>
          <View style={styles.doctorDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              {doctor.isOnline && (
                <View style={styles.onlineIndicator}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Online</Text>
                </View>
              )}
            </View>
            <View style={styles.specialtyRow}>
              <View style={[styles.specialtyBadge, { backgroundColor: getSpecialtyBackground(doctor.specialty) }]}>
                <Text style={[styles.specialtyText, { color: getSpecialtyColor(doctor.specialty) }]}>
                  {doctor.specialty}
                </Text>
              </View>
              <Text style={styles.experience}>{doctor.experience} exp</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <AntIcon name="hearto" size={16} color={colors.placeholder} />
        </TouchableOpacity>
      </View>

      {/* Rating and Reviews */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingRow}>
          <View style={styles.starsContainer}>
            {renderStars(doctor.rating)}
          </View>
          <Text style={styles.ratingText}>{doctor.rating}</Text>
          <Text style={styles.reviewsText}>({doctor.reviews} reviews)</Text>
        </View>
      </View>

      {/* Hospital and Location */}
      <View style={styles.locationSection}>
        <View style={styles.locationRow}>
          <Icon name="local-hospital" size={14} color={colors.placeholder} />
          <Text style={styles.hospitalText}>{doctor.hospital}</Text>
        </View>
        <View style={styles.locationRow}>
          <Icon name="location-on" size={14} color={colors.placeholder} />
          <Text style={styles.locationText}>{doctor.location}</Text>
        </View>
      </View>

      {/* Availability and Fee */}
      <View style={styles.availabilitySection}>
        <View style={styles.availabilityRow}>
          <View style={styles.availabilityItem}>
            <Icon name="schedule" size={14} color={colors.success} />
            <Text style={styles.availableText}>Available {doctor.available}</Text>
          </View>
          <View style={styles.feeContainer}>
            <Text style={styles.feeText}>${doctor.fee}</Text>
            <Text style={styles.feeLabel}>consultation</Text>
          </View>
        </View>
        <View style={styles.nextAvailableRow}>
          <Text style={styles.nextAvailableLabel}>Next available:</Text>
          <Text style={styles.nextAvailableTime}>{doctor.nextAvailable}</Text>
        </View>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <View style={styles.featuresRow}>
          {doctor.videoConsultation && (
            <View style={styles.featureItem}>
              <Icon name="videocam" size={12} color={colors.primary} />
              <Text style={styles.featureText}>Video Call</Text>
            </View>
          )}
          <View style={styles.featureItem}>
            <Icon name="chat" size={12} color={colors.success} />
            <Text style={styles.featureText}>Chat</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="language" size={12} color={colors.warning} />
            <Text style={styles.featureText}>{doctor.languages.join(', ')}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.bookButton}>
          <Icon name="event" size={16} color="#fff" />
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <FeatherIcon name="user" size={16} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton}>
          <Icon name="chat" size={16} color={colors.success} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorInfo: {
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 4,
  },
  onlineText: {
    fontSize: 10,
    color: colors.success,
    fontWeight: '500',
  },
  specialtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialtyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  experience: {
    fontSize: 12,
    color: colors.placeholder,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 8,
  },
  ratingSection: {
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: colors.placeholder,
  },
  locationSection: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  hospitalText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 6,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 12,
    color: colors.placeholder,
    marginLeft: 6,
  },
  availabilitySection: {
    marginBottom: 12,
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '500',
  },
  feeContainer: {
    alignItems: 'flex-end',
  },
  feeText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  feeLabel: {
    fontSize: 11,
    color: colors.placeholder,
    marginTop: 1,
  },
  nextAvailableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextAvailableLabel: {
    fontSize: 12,
    color: colors.placeholder,
    marginRight: 6,
  },
  nextAvailableTime: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    fontSize: 11,
    color: colors.text,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  bookButtonText: {
    color: colors.buttonText,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  profileButton: {
    backgroundColor: colors.lightBlue,
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  chatButton: {
    backgroundColor: colors.lightGreen,
    padding: 12,
    borderRadius: 12,
  },
});

export default DoctorCard;