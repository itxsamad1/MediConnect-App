import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmail, validatePassword } from '../../utils/validation';
import FancyImageButton from '../../components/FancyImageButton';
import CustomToast from '../../components/CustomToast';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type }), 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);
    setErrors({ email: emailErr || '', password: passwordErr || '' });

    if (emailErr || passwordErr) {
      showToast('Please fix the errors above.', 'error');
      return;
    }

    try {
      // Fake login response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = {
        status: 200,
        data: {
          token: 'dummy-token-123',
          user: { id: 1, name: 'Dummy User', email: formData.email }
        }
      };

      if (response.status === 200) {
        const { token, user } = response.data;
        await login(user, token);
        showToast('Login successful!', 'success');
        navigation.navigate('MainApp');
      }
    } catch (error) {
      showToast('Something went wrong.', 'error');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6 bg-white">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">Sign In</Text>
        <Text className="text-base text-gray-400 text-center mb-6">Hi, Welcome back, you have been missed.</Text>

        <View className="w-full">
          <CustomInput
            placeholder="Email"
            value={formData.email}
            onChangeText={val => handleChange('email', val)}
            error={errors.email}
          />
          <CustomInput
            placeholder="Password"
            value={formData.password}
            onChangeText={val => handleChange('password', val)}
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            className="mb-4 items-end"
          >
            <Text className="text-blue-600 underline text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          <CustomButton title="Login" onPress={handleLogin} />

          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-2.5 text-gray-400 text-sm">Or sign with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <View className="flex-row justify-center">
            <FancyImageButton
              type="google"
              imageSource={require('../../assets/google-remove-bg.png')}
              onPress={() => console.log('Google pressed')}
            />
            <FancyImageButton
              type="apple"
              imageSource={require('../../assets/Iphone.png')}
              onPress={() => console.log('Apple ID')}
            />
          </View>
        </View>

        <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
