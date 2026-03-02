import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import { validatePassword } from '../../utils/validation';

const NewPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 3000);
  };

  const handleCreatePassword = async () => {
    const passwordErr = validatePassword(password);
    const confirmErr = password !== confirmPassword ? 'Passwords do not match' : '';
    setErrors({ password: passwordErr || '', confirmPassword: confirmErr });
    if (passwordErr || confirmErr) return;

    try {
      setLoading(true);
      // Fake update password response
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Password updated successfully.', 'success');
      navigation.navigate('Login');
    } catch (err) {
      showToast('Could not connect to server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-8 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-full bg-gray-900 items-center justify-center">
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 mt-12 items-center">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">Create New Password</Text>
        <Text className="text-base text-gray-400 text-center mb-6 leading-6">
          Your new password must be different from previous ones.
        </Text>

        <View className="w-full">
          <CustomInput placeholder="New Password" value={password} onChangeText={setPassword} secureTextEntry error={errors.password} />
          <CustomInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry error={errors.confirmPassword} />
          <CustomButton title={loading ? 'Updating...' : 'Create New Password'} onPress={handleCreatePassword} disabled={loading} />
        </View>
      </View>

      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
