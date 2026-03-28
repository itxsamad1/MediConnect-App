import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import StepIndicator from './StepIndicator';

const MedicalProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleSubmit = () => {
    Alert.alert('Profile Updated', 'Your medical profile has been successfully updated!');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>Medical Profile</Text>
        <Text style={[styles.headerSub, { color: colors.textSecondary }]}>Complete your profile information</Text>
      </View>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && <Screen1 />}
        {currentStep === 2 && <Screen2 />}
        {currentStep === 3 && <Screen3 />}
      </ScrollView>
      <View style={styles.btnRow}>
        {currentStep > 1 && <CustomButton title="Back" onPress={prevStep} containerStyle={[styles.btn, { backgroundColor: colors.textSecondary }]} />}
        {currentStep < totalSteps ? (
          <CustomButton title="Next" onPress={nextStep} containerStyle={styles.btn} />
        ) : (
          <CustomButton title="Submit" onPress={handleSubmit} containerStyle={[styles.btn, { backgroundColor: colors.success }]} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MedicalProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', marginBottom: 5 },
  headerSub: { fontSize: 14, textAlign: 'center' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  btnRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 20, gap: 10 },
  btn: { flex: 1, marginBottom: 0 },
});