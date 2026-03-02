import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import colors from '../../theme/Color';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import StepIndicator from './StepIndicator';

const MedicalProfileScreen = () => {
  

  const [formData, setFormData] = useState({

    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    address: '',
    
    // Step 2
    existingConditions: '',
    allergies: '',
    medications: '',
    pastSurgeries: '',
    familyMedicalHistory: '',
    
    // Step 3
    smoking: '',
    alcoholConsumption: '',
    activityLevel: '',
    location: '',
  });

  // Gender options
  
  
  // Activity level options
    const [currentStep, setCurrentStep] = useState(1);
      const totalSteps = 3;
        const nextStep = () => {
              if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
              }
            };
          
            const prevStep = () => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              }
            };
            

  const handleSubmit = () => {
    Alert.alert(
      'Profile Updated',
      'Your medical profile has been successfully updated!',
      [{ text: 'OK', onPress: () => console.log('Profile submitted:', formData) }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Profile</Text>
        <Text style={styles.headerSubtitle}>Complete your profile information</Text>
      </View>

      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && Screen1()}
        {currentStep === 2 && Screen2()}
        {currentStep === 3 && Screen3()}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <CustomButton
            title="Back"
            onPress={prevStep}
            containerStyle={[styles.button, styles.backButton]
              
            }
          />
        )}
        
        {currentStep < totalSteps ? (
          <CustomButton
            title="Next"
            onPress={nextStep}
            containerStyle={[styles.button, styles.nextButton]}
          />
        ) : (
          <CustomButton
            title="Submit"
            onPress={handleSubmit}
            containerStyle={[styles.button, styles.submitButton]}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.placeholder,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
 
  yesNoContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  yesNoOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    marginBottom: 0,
  },
  backButton: {
    backgroundColor: colors.secondary,
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  submitButton: {
    backgroundColor: colors.success,
  },
});

export default MedicalProfileScreen;