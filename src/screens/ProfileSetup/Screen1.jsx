import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CustomCheckbox from '../../components/CheckBox';
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';
import colors from '../../theme/Color';
 const Screen1 = () => {

    const genderOptions = ['Male', 'Female', 'Other'];
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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


      const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
        return(
            <>
               <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      
      <CustomCheckbox
        title="Gender"
        options={genderOptions}
        selectedValue={formData.gender}
        onSelect={(value) => updateFormData('gender', value)}
      />

      <CustomInput
        placeholder="Date of Birth (DD/MM/YYYY)"
        value={formData.dateOfBirth}
        onChangeText={(value) => updateFormData('dateOfBirth', value)}
      />

      <CustomCheckbox
        title="Blood Group"
        options={bloodGroupOptions}
        selectedValue={formData.bloodGroup}
        onSelect={(value) => updateFormData('bloodGroup', value)}
      />
    </View>
            </>
        )
 }


export default Screen1;

const styles = StyleSheet.create({
     stepContent: {
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
})