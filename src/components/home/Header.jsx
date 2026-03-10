import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

function Header() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face' }}
              style={[styles.avatar, { borderColor: colors.success }]}
            />
            <View style={[styles.statusIndicator, { backgroundColor: colors.success, borderColor: colors.surface }]} />
          </View>
          <View style={styles.welcomeSection}>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good Morning</Text>
            <Text style={[styles.userName, { color: colors.text }]}>Welcome Back</Text>
            <Text style={[styles.subText, { color: colors.textSecondary }]}>How are you feeling today?</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
            <Icon name="search" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
            <View style={styles.notifWrap}>
              <Icon name="notifications-none" size={24} color={colors.primary} />
              <View style={[styles.badge, { backgroundColor: colors.danger, borderColor: colors.surface }]}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.healthStatus}>
        <View style={[styles.statusCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
          <Icon name="favorite" size={16} color={colors.danger} />
          <Text style={[styles.statusText, { color: colors.text }]}>Heart Rate: 72 BPM</Text>
        </View>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, marginBottom: 15 },
  userSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarContainer: { position: 'relative', marginRight: 15 },
  avatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2 },
  statusIndicator: { position: 'absolute', bottom: 1, right: 1, width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  welcomeSection: { flex: 1 },
  greeting: { fontSize: 13, fontWeight: '500', marginBottom: 2 },
  userName: { fontSize: 20, fontWeight: '700', marginBottom: 2 },
  subText: { fontSize: 13 },
  rightSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconButton: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  notifWrap: { position: 'relative' },
  badge: { position: 'absolute', top: -8, right: -8, borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  healthStatus: { flexDirection: 'row', paddingHorizontal: 20, gap: 12 },
  statusCard: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1 },
  statusText: { marginLeft: 8, fontSize: 13, fontWeight: '600' },
});
