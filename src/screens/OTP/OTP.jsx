import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomKeyboard from '../../components/CustomKeyboard';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';

function OTP({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 3000);
  };

  const handleKeyPress = key => {
    if (key === 'backspace') {
      const lastFilledIndex = otp.findLastIndex(val => val !== '');
      if (lastFilledIndex >= 0) {
        const newOtp = [...otp];
        newOtp[lastFilledIndex] = '';
        setOtp(newOtp);
        inputs.current[lastFilledIndex]?.focus();
      }
    } else {
      const emptyIndex = otp.findIndex(val => val === '');
      if (emptyIndex !== -1) {
        const newOtp = [...otp];
        newOtp[emptyIndex] = key;
        setOtp(newOtp);
        inputs.current[emptyIndex]?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 4) return showToast('Please enter the full OTP.', 'error');

    try {
      // Fake OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = { status: 200, data: { message: 'OTP verified successfully!' } };
      if (res.status === 200) {
        showToast(res.data.message, 'success');
        navigation.navigate('NewPassword');
      }
    } catch (error) {
      showToast('Something went wrong.', 'error');
    }
  };

  return (
    <View className="flex-1 relative px-6 items-center bg-white">
      <View className="px-6 mt-12 items-center">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">Verify OTP</Text>
        <Text className="text-base text-gray-400 text-center leading-6">
          Please enter the code we just sent to email
        </Text>
        <Text className="text-blue-600">youremail@example.com</Text>
      </View>

      <View className="flex-row justify-center mt-5">
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            className="w-12 h-16 mx-2.5 border border-blue-600 rounded-lg text-2xl text-center bg-gray-100"
            maxLength={1}
            keyboardType="numeric"
            value={value}
            editable={false}
            selectTextOnFocus={false}
          />
        ))}
      </View>

      <View className="w-11/12 py-4 px-4">
        <CustomButton title="Verify OTP" onPress={handleVerifyOtp} />
      </View>

      <View className="absolute bottom-[5%]">
        <CustomKeyboard onKeyPress={handleKeyPress} />
      </View>

      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </View>
  );
}

export default OTP;
