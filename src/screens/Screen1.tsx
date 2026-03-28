import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomCheckbox from '../components/CheckBox';
import CustomInput from '../components/CustomInput';
import { useTheme } from '../context/ThemeContext';

const Screen1: React.FC = () => {
  const { colors } = useTheme();
  const genderOptions = ['Male', 'Female', 'Other'];
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const [formData, setFormData] = useState({ gender: '', dateOfBirth: '', bloodGroup: '' });
  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  return (
    <View style={styles.step}>
      <Text style={[styles.title, { color: colors.primary }]}>Personal Information</Text>
      <CustomCheckbox title="Gender" options={genderOptions} selectedValue={formData.gender} onSelect={(v) => update('gender', v)} />
      <CustomInput placeholder="Date of Birth (DD/MM/YYYY)" value={formData.dateOfBirth} onChangeText={(v) => update('dateOfBirth', v)} />
      <CustomCheckbox title="Blood Group" options={bloodGroupOptions} selectedValue={formData.bloodGroup} onSelect={(v) => update('bloodGroup', v)} />
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  step: { paddingBottom: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
});
