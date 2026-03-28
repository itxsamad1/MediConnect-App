import React, { useState, useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Switch, Image, Alert, Modal, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { logout, user } = useContext(AuthContext);
  const { colors, isDark, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: user?.fullName || 'User',
    email: user?.email || 'user@example.com',
    phone: '+92 300 1234567',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    bloodGroup: 'B+',
    address: 'Karachi, Pakistan',
    emergencyContact: '+92 321 9876543',
  });

  const handleEditField = (field, value) => {
    setEditingField(field); setEditValue(value); setShowEditModal(true);
  };
  const saveFieldEdit = () => {
    if (editingField && editValue.trim()) {
      setUserProfile(prev => ({ ...prev, [editingField]: editValue.trim() }));
      setShowEditModal(false); setEditingField(null); setEditValue('');
    }
  };
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => await logout() },
    ]);
  };
  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'This action cannot be undone. Are you absolutely sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete requested') },
    ]);
  };

  const SettingItem = ({ icon, title, subtitle, onPress, right }) => (
    <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.surface }]} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.settingIconWrap, { backgroundColor: colors.surfaceSecondary }]}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        {!!subtitle && <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      {right || <Icon name="chevron-right" size={20} color={colors.textSecondary} />}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.profileAvatar, { backgroundColor: colors.infoLight }]}>
            <Icon name="person" size={44} color={colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>{userProfile.name}</Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{userProfile.email}</Text>
            <View style={styles.verifiedRow}>
              <Icon name="verified" size={15} color={colors.success} />
              <Text style={[styles.verifiedText, { color: colors.success }]}>  Verified</Text>
            </View>
          </View>
        </View>

        {/* Personal Info */}
        <SectionHeader title="Personal Information" />
        <SettingItem icon={<Icon name="email" size={20} color={colors.primary} />} title="Email Address" subtitle={userProfile.email} onPress={() => handleEditField('email', userProfile.email)} />
        <SettingItem icon={<Icon name="phone" size={20} color={colors.primary} />} title="Phone Number" subtitle={userProfile.phone} onPress={() => handleEditField('phone', userProfile.phone)} />
        <SettingItem icon={<Icon name="cake" size={20} color={colors.primary} />} title="Date of Birth" subtitle={userProfile.dateOfBirth} onPress={() => handleEditField('dateOfBirth', userProfile.dateOfBirth)} />
        <SettingItem icon={<Icon name="opacity" size={20} color={colors.primary} />} title="Blood Group" subtitle={userProfile.bloodGroup} onPress={() => handleEditField('bloodGroup', userProfile.bloodGroup)} />

        {/* Preferences */}
        <SectionHeader title="Preferences" />
        <SettingItem
          icon={<Icon name={isDark ? 'dark-mode' : 'light-mode'} size={20} color={colors.primary} />}
          title="Dark Mode"
          subtitle={isDark ? 'Enabled' : 'Disabled'}
          onPress={toggleTheme}
          right={<Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: colors.border, true: colors.primaryLight }} thumbColor={isDark ? colors.primary : '#f4f3f4'} />}
        />
        <SettingItem
          icon={<Icon name="notifications" size={20} color={colors.primary} />}
          title="Notifications"
          subtitle={notifications ? 'Enabled' : 'Disabled'}
          onPress={() => setNotifications(v => !v)}
          right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: colors.border, true: colors.primaryLight }} thumbColor={notifications ? colors.primary : '#f4f3f4'} />}
        />
        <SettingItem
          icon={<Icon name="fingerprint" size={20} color={colors.primary} />}
          title="Biometric Auth"
          subtitle={biometricAuth ? 'Enabled' : 'Disabled'}
          onPress={() => setBiometricAuth(v => !v)}
          right={<Switch value={biometricAuth} onValueChange={setBiometricAuth} trackColor={{ false: colors.border, true: colors.primaryLight }} thumbColor={biometricAuth ? colors.primary : '#f4f3f4'} />}
        />

        {/* Support */}
        <SectionHeader title="Support & Legal" />
        <SettingItem icon={<Icon name="help-outline" size={20} color={colors.primary} />} title="Help & Support" subtitle="Get help or contact us" onPress={() => { }} />
        <SettingItem icon={<Icon name="description" size={20} color={colors.primary} />} title="Terms of Service" onPress={() => { }} />
        <SettingItem icon={<Icon name="privacy-tip" size={20} color={colors.primary} />} title="Privacy Policy" onPress={() => { }} />
        <SettingItem icon={<Icon name="info-outline" size={20} color={colors.primary} />} title="About" subtitle="Version 1.0.0" onPress={() => { }} />

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: colors.surface }]} onPress={handleLogout}>
            <Icon name="logout" size={20} color={colors.danger} />
            <Text style={[styles.logoutText, { color: colors.danger }]}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.deleteBtn, { backgroundColor: colors.dangerLight }]} onPress={handleDeleteAccount}>
            <Icon name="delete-forever" size={20} color={colors.danger} />
            <Text style={[styles.deleteText, { color: colors.danger }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={showEditModal} animationType="slide" transparent onRequestClose={() => setShowEditModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Edit {editingField}</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.modalInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter ${editingField}`}
              placeholderTextColor={colors.placeholder}
              multiline={editingField === 'address'}
              numberOfLines={editingField === 'address' ? 3 : 1}
            />
            <View style={styles.modalBtns}>
              <TouchableOpacity style={[styles.modalBtn, { borderColor: colors.border, borderWidth: 1 }]} onPress={() => setShowEditModal(false)}>
                <Text style={[styles.cancelText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: colors.primary }]} onPress={saveFieldEdit}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: 1 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  profileCard: { flexDirection: 'row', alignItems: 'center', margin: 16, borderRadius: 16, padding: 18, elevation: 2 },
  profileAvatar: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  profileEmail: { fontSize: 13, marginBottom: 6 },
  verifiedRow: { flexDirection: 'row', alignItems: 'center' },
  verifiedText: { fontSize: 12, fontWeight: '600' },
  sectionTitle: { fontSize: 13, fontWeight: '700', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  settingItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, marginHorizontal: 16, marginBottom: 6, borderRadius: 12, elevation: 1 },
  settingIconWrap: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  settingContent: { flex: 1 },
  settingTitle: { fontSize: 15, fontWeight: '500' },
  settingSubtitle: { fontSize: 12, marginTop: 2 },
  section: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, marginBottom: 10, elevation: 1, gap: 8 },
  logoutText: { fontSize: 15, fontWeight: '600' },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, gap: 8 },
  deleteText: { fontSize: 15, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '88%', borderRadius: 16, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 17, fontWeight: '700' },
  modalInput: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, marginBottom: 20, textAlignVertical: 'top' },
  modalBtns: { flexDirection: 'row', gap: 12 },
  modalBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  cancelText: { fontSize: 15, fontWeight: '500' },
  saveText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});

export default SettingsScreen;
