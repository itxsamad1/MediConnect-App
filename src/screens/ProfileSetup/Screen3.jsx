import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../../components/CustomInput';
import {useState} from 'react';
import colors from '../../theme/Color';
import CustomCheckbox from '../../components/CheckBox';
const Screen3 = () => {

     const activityLevelOptions = ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'];
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
      [field]: value,
    }));
  };
  return (
    <>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Lifestyle Information</Text>

        <CustomCheckbox
          title="Activity Level"
          options={activityLevelOptions}
          selectedValue={formData.activityLevel}
          onSelect={value => updateFormData('activityLevel', value)}
        />

        <CustomInput
          placeholder="Location"
          value={formData.location}
          onChangeText={value => updateFormData('location', value)}
        />
      </View>
    </>
  );
};

export default Screen3;

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
  }
});
