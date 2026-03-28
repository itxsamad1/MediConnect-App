import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[styles.circle, { backgroundColor: currentStep >= step ? colors.primary : colors.border }]}>
            <Text style={[styles.text, { color: currentStep >= step ? colors.textOnPrimary : colors.placeholder }]}>{step}</Text>
          </View>
          {step < totalSteps && <View style={[styles.line, { backgroundColor: currentStep > step ? colors.primary : colors.border }]} />}
        </View>
      ))}
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20 },
  stepContainer: { flexDirection: 'row', alignItems: 'center' },
  circle: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 14, fontWeight: '700' },
  line: { width: 40, height: 2, marginHorizontal: 5 },
});
