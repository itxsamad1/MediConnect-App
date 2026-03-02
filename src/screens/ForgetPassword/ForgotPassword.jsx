import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';
import { validateEmail } from '../../utils/validation';
import CustomToast from '../../components/CustomToast';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 3000);
  };

  const handleSendOTP = async () => {
    const emailError = validateEmail(email);
    setError(emailError || '');
    if (emailError) return showToast('Please enter a valid email.', 'error');

    try {
      setLoading(true);
      // Fake send OTP response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = { status: 200, data: { message: 'OTP sent successfully.' } };
      const { status, data } = res;

      if (status === 200) {
        showToast(data.message || 'OTP sent successfully.', 'success');
        navigation.navigate('OTP');
      }
    } catch (err) {
      showToast('Unable to connect to the server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomBackButton onPress={() => navigation.navigate('Login')} />
      <View className="flex-1 px-6 mt-12 items-center">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2.5">Forgot Password?</Text>
        <Text className="text-base text-gray-400 text-center mb-7 leading-6">
          Enter your registered email and we'll send you an OTP to reset your password.
        </Text>
        <View className="w-full">
          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={error}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomButton title={loading ? 'Sending...' : 'Send OTP'} onPress={handleSendOTP} disabled={loading} />
        </View>
        <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
