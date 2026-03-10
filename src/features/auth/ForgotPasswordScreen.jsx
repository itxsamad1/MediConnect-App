import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';
import CustomToast from '../../components/CustomToast';
import { validateEmail } from '../../utils/validation';
import { useTheme } from '../../context/ThemeContext';

const ForgotPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleSendOTP = async () => {
    const emailError = validateEmail(email);
    setError(emailError || '');
    if (emailError) return showToast('Please enter a valid email.', 'error');
    try {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      showToast('OTP sent successfully.', 'success');
      navigation.navigate('OTP');
    } catch {
      showToast('Unable to connect to the server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <CustomBackButton onPress={() => navigation.goBack()} />
      <View style={styles.inner}>
        <Text style={[styles.title, { color: colors.text }]}>Forgot Password?</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter your registered email and we'll send you an OTP to reset your password.
        </Text>
        <CustomInput placeholder="Enter your email" value={email} onChangeText={setEmail} error={error} keyboardType="email-address" autoCapitalize="none" />
        <CustomButton title={loading ? 'Sending...' : 'Send OTP'} onPress={handleSendOTP} disabled={loading} />
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

export default ForgotPasswordScreen;
