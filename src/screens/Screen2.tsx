import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import { useTheme } from '../context/ThemeContext';

const Screen2: React.FC = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({ existingConditions: '', medications: '', pastSurgeries: '', familyMedicalHistory: '' });
  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  return (
    <View style={styles.step}>
      <Text style={[styles.title, { color: colors.primary }]}>Medical History</Text>
      <CustomInput placeholder="Existing Medical Conditions" value={formData.existingConditions} onChangeText={(v) => update('existingConditions', v)} multiline />
      <CustomInput placeholder="Current Medications" value={formData.medications} onChangeText={(v) => update('medications', v)} multiline />
      <CustomInput placeholder="Past Surgeries" value={formData.pastSurgeries} onChangeText={(v) => update('pastSurgeries', v)} multiline />
      <CustomInput placeholder="Family Medical History" value={formData.familyMedicalHistory} onChangeText={(v) => update('familyMedicalHistory', v)} multiline />
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  step: { paddingBottom: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
});
