import React, { useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmail, validatePassword, validateName, validatePhoneNumber } from '../../utils/validation';
import FancyImageButton from '../../components/FancyImageButton';
import CheckBoxIcon from 'react-native-vector-icons/Ionicons';
import CustomToast from '../../components/CustomToast';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type }), 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    const newErrors = {
      fullName: validateName(formData.fullName),
      email: validateEmail(formData.email),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
      password: validatePassword(formData.password),
      termsAccepted: termsAccepted ? null : 'You must accept the terms',
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(err => err !== null);
    if (hasErrors) { showToast('Please fix the errors above.', 'error'); return; }

    try {
      // Fake signup response
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Account created successfully!', 'success');
      navigation.navigate('Login');
    } catch (error) {
      showToast('Something went wrong.', 'error');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-10" showsVerticalScrollIndicator={false}>
        <View className="items-center w-full">
          <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">Create an Account</Text>
          <Text className="text-base text-gray-400 mb-2 text-center leading-6">
            Create your account by filling in the information below.
          </Text>

          <View className="w-full py-5">
            <CustomInput placeholder="Full Name" value={formData.fullName} onChangeText={val => handleChange('fullName', val)} error={errors.fullName} />
            <CustomInput placeholder="Email" value={formData.email} onChangeText={val => handleChange('email', val)} error={errors.email} />
            <CustomInput placeholder="Phone Number" value={formData.phoneNumber} onChangeText={val => handleChange('phoneNumber', val)} error={errors.phoneNumber} />
            <CustomInput placeholder="Password" value={formData.password} onChangeText={val => handleChange('password', val)} secureTextEntry error={errors.password} />

            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => setTermsAccepted(prev => !prev)} activeOpacity={0.7}>
                <CheckBoxIcon name={termsAccepted ? 'checkbox-outline' : 'square-outline'} size={24} color={'#000'} />
              </TouchableOpacity>
              <Text className="text-gray-900 text-sm ml-2">
                I agree to the{' '}
                <Text className="text-blue-600 font-semibold underline" onPress={() => console.log('Terms')}>
                  Terms &amp; Conditions
                </Text>
              </Text>
            </View>
            {!!errors.termsAccepted && <Text className="text-red-500 text-xs mb-2 -mt-2">{errors.termsAccepted}</Text>}

            <CustomButton title="Sign Up" onPress={handleSignup} containerStyle={{ marginTop: 15 }} />

            <View className="flex-row items-center my-2.5">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-2.5 text-gray-400 text-sm">Or sign with</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            <View className="flex-row justify-center">
              <FancyImageButton type="google" imageSource={require('../../assets/google-remove-bg.png')} onPress={() => console.log('Google')} />
              <FancyImageButton type="apple" imageSource={require('../../assets/Iphone.png')} onPress={() => console.log('Apple')} />
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </SafeAreaView>
  );
};

export default Signup;