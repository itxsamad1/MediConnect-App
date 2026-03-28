import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  hospital: string;
  available: string;
  rating: number;
  reviews: number;
  experience: string;
  fee: number;
  nextAvailable: string;
  languages: string[];
  education: string;
  isOnline: boolean;
  videoConsultation: boolean;
  profileImage: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onPress: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onPress }) => {
  const { colors } = useTheme();

  const renderStars = (rating: number) => {
    const stars = [];
    const full = Math.floor(rating);
    for (let i = 0; i < full; i++) stars.push(<Icon key={i} name="star" size={12} color="#FFD700" />);
    if (rating % 1 !== 0) stars.push(<Icon key="h" name="star-half" size={12} color="#FFD700" />);
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<Icon key={`e-${i}`} name="star-border" size={12} color="#FFD700" />);
    return stars;
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => onPress(doctor)}>
      <View style={styles.header}>
        <View style={styles.docInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.infoLight }]}>
            <Icon name="person" size={24} color={colors.primary} />
          </View>
          <View style={styles.details}>
            <View style={styles.nameRow}>
              <Text style={[styles.name, { color: colors.text }]}>{doctor.name}</Text>
              {doctor.isOnline && (
                <View style={[styles.onlineBadge, { backgroundColor: colors.successLight }]}>
                  <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
                  <Text style={[styles.onlineText, { color: colors.success }]}>Online</Text>
                </View>
              )}
            </View>
            <View style={styles.specRow}>
              <View style={[styles.specBadge, { backgroundColor: colors.infoLight }]}>
                <Text style={[styles.specText, { color: colors.primary }]}>{doctor.specialty}</Text>
              </View>
              <Text style={[styles.exp, { color: colors.textSecondary }]}>{doctor.experience} exp</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.favBtn}><AntIcon name="hearto" size={16} color={colors.textSecondary} /></TouchableOpacity>
      </View>

      <View style={styles.ratingRow}>
        <View style={styles.stars}>{renderStars(doctor.rating)}</View>
        <Text style={[styles.ratingText, { color: colors.text }]}>{doctor.rating}</Text>
        <Text style={[styles.reviews, { color: colors.textSecondary }]}>({doctor.reviews} reviews)</Text>
      </View>

      <View style={styles.locRow}>
        <Icon name="local-hospital" size={14} color={colors.textSecondary} />
        <Text style={[styles.hospital, { color: colors.text }]}>{doctor.hospital}</Text>
      </View>
      <View style={styles.locRow}>
        <Icon name="location-on" size={14} color={colors.textSecondary} />
        <Text style={[styles.location, { color: colors.textSecondary }]}>{doctor.location}</Text>
      </View>

      <View style={styles.availRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="schedule" size={14} color={colors.success} />
          <Text style={[styles.availText, { color: colors.success }]}> Available {doctor.available}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.fee, { color: colors.text }]}>${doctor.fee}</Text>
          <Text style={[styles.feeLabel, { color: colors.textSecondary }]}>consultation</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.bookBtn, { backgroundColor: colors.primary }]}>
          <Icon name="event" size={16} color="#fff" />
          <Text style={styles.bookText}> Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.infoLight }]}>
          <FeatherIcon name="user" size={16} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.successLight }]}>
          <Icon name="chat" size={16} color={colors.success} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 18, marginBottom: 14, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  docInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  details: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 15, fontWeight: '600', flex: 1 },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, marginRight: 3 },
  onlineText: { fontSize: 10, fontWeight: '500' },
  specRow: { flexDirection: 'row', alignItems: 'center' },
  specBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginRight: 8 },
  specText: { fontSize: 11, fontWeight: '500' },
  exp: { fontSize: 11 },
  favBtn: { padding: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stars: { flexDirection: 'row', marginRight: 6 },
  ratingText: { fontSize: 13, fontWeight: '600', marginRight: 4 },
  reviews: { fontSize: 11 },
  locRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  hospital: { fontSize: 12, fontWeight: '500' },
  location: { fontSize: 11 },
  availRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  availText: { fontSize: 12, fontWeight: '500' },
  fee: { fontSize: 15, fontWeight: '700' },
  feeLabel: { fontSize: 10 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bookBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 12 },
  bookText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  iconBtn: { padding: 10, borderRadius: 12 },
});
