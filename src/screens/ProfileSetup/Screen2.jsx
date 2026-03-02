import { View, Text, StyleSheet } from 'react-native'
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';
import colors from '../../theme/Color';
 const Screen2 = () => {

 const [formData, setFormData] = useState({
      existingConditions: '',
      allergies: '',
      medications: '',
      pastSurgeries: '',
      familyMedicalHistory: '',
      
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
           <Text style={styles.stepTitle}>Medical History</Text>
      
      <CustomInput
        placeholder="Existing Medical Conditions"
        value={formData.existingConditions}
        onChangeText={(value) => updateFormData('existingConditions', value)}
        inputStyle={styles.textArea}
      />


      <CustomInput
        placeholder="Current Medications"
        value={formData.medications}
        onChangeText={(value) => updateFormData('medications', value)}
        inputStyle={styles.textArea}
      />

      <CustomInput
        placeholder="Past Surgeries"
        value={formData.pastSurgeries}
        onChangeText={(value) => updateFormData('pastSurgeries', value)}
        inputStyle={styles.textArea}
      />

      <CustomInput
        placeholder="Family Medical History"
        value={formData.familyMedicalHistory}
        onChangeText={(value) => updateFormData('familyMedicalHistory', value)}
        inputStyle={styles.textArea}
      />
    </View>
            </>
        )
 }


export default Screen2;

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
    textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
})