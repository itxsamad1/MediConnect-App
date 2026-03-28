import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomCheckbox from '../components/CheckBox';
import { useTheme } from '../context/ThemeContext';

const Screen3: React.FC = () => {
  const { colors } = useTheme();
  const activityOptions = ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'];
  const [formData, setFormData] = useState({ activityLevel: '', location: '' });
  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  return (
    <View style={styles.step}>
      <Text style={[styles.title, { color: colors.primary }]}>Lifestyle Information</Text>
      <CustomCheckbox title="Activity Level" options={activityOptions} selectedValue={formData.activityLevel} onSelect={(v) => update('activityLevel', v)} />
      <CustomInput placeholder="Location" value={formData.location} onChangeText={(v) => update('location', v)} />
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  step: { paddingBottom: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
});

