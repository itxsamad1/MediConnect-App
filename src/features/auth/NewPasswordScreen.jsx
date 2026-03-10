import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';
import CustomToast from '../../components/CustomToast';
import { validatePassword } from '../../utils/validation';
import { useTheme } from '../../context/ThemeContext';

const NewPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleCreate = async () => {
    const passErr = validatePassword(password);
    const confirmErr = password !== confirmPassword ? 'Passwords do not match' : '';
    setErrors({ password: passErr || '', confirm: confirmErr });
    if (passErr || confirmErr) return;
    try {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      showToast('Password updated successfully.', 'success');
      setTimeout(() => navigation.navigate('Login'), 1500);
    } catch {
      showToast('Could not connect.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <CustomBackButton onPress={() => navigation.goBack()} />
      <View style={styles.inner}>
        <Text style={[styles.title, { color: colors.text }]}>New Password</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your new password must be different from previous ones.
        </Text>
        <CustomInput placeholder="New Password" value={password} onChangeText={setPassword} secureTextEntry error={errors.password} />
        <CustomInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry error={errors.confirm} />
        <CustomButton title={loading ? 'Updating...' : 'Create New Password'} onPress={handleCreate} disabled={loading} />
      </View>
      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
});

export default NewPasswordScreen;
