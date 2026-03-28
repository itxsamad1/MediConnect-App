import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { validateEmail, validatePassword } from '../utils/validation';
import FancyImageButton from '../components/FancyImageButton';
import CustomToast from '../components/CustomToast';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useContext(AuthContext);
  const { colors } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as ToastType });

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const handleChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleLogin = async () => {
    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);
    setErrors({ email: emailErr || '', password: passwordErr || '' });
    if (emailErr || passwordErr) return showToast('Please fix the errors above.', 'error');
    try {
      await new Promise((r) => setTimeout(r, 800));
      const userData = { id: 1, name: 'Sam', email: formData.email };
      await login(userData, 'dummy-token-mediconnect-123');
      showToast('Login successful!', 'success');
    } catch {
      showToast('Something went wrong.', 'error');
    }
  };

  return (
    // NativeWind: flex-1 and safe area handled via className
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <Text className="text-3xl font-extrabold text-center mb-2" style={{ color: colors.text }}>
          Sign In
        </Text>
        <Text className="text-base text-center mb-8" style={{ color: colors.textSecondary }}>
          Hi, Welcome back! 👋
        </Text>

        {/* Form */}
        <CustomInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(v) => handleChange('email', v)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(v) => handleChange('password', v)}
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity className="items-end mb-4" onPress={() => navigation.navigate('ForgotPassword')}>
          <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <CustomButton title="Login" onPress={handleLogin} />

        {/* Divider */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
          <Text className="mx-3 text-sm" style={{ color: colors.textSecondary }}>Or sign in with</Text>
          <View className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
        </View>

        {/* Social */}
        <View className="flex-row justify-center mb-6">
          <FancyImageButton type="google" imageSource={require('../assets/google-remove-bg.png')} onPress={() => {}} />
          <FancyImageButton type="apple" imageSource={require('../assets/Iphone.png')} onPress={() => {}} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-sm text-center" style={{ color: colors.textSecondary }}>
            Don't have an account?{' '}
            <Text className="font-bold" style={{ color: colors.primary }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </View>
  );
};

export default LoginScreen;
