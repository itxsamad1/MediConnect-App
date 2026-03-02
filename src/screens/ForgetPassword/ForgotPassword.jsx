import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomBackButton from '../../components/CustomBackButton';
import { validateEmail } from '../../utils/validation';
import colors from '../../theme/Color';
import CustomToast from '../../components/CustomToast';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'info' });
    }, 3000);
  };

  const handleSendOTP = async () => {
  const emailError = validateEmail(email);
  setError(emailError || '');
  if (emailError) return showToast('Please enter a valid email.', 'error');

  try {
    setLoading(true);
    const res = await axios.post('http://192.168.100.2:3000/sent-otp', { email });
    const { status, data } = res;

    switch (status) {
      case 200:
        showToast(data.message || 'OTP sent successfully.', 'success');
        navigation.navigate('OTP');
        break;
      case 400:
        showToast(data.message || 'Email is required.', 'error');
        break;
      case 404:
        showToast(data.message || 'User not found.', 'error');
        break;
      case 502:
        showToast(data.message || 'Error sending OTP.', 'error');
        break;
      default:
        showToast('Unexpected server response.', 'error');
    }
  } catch (err) {
    const status = err.response?.status;
    const message = err.response?.data?.message || 'Something went wrong.';

    switch (status) {
      case 400:
        showToast(message, 'error');
        break;
      case 404:
        showToast(message, 'error');
        break;
      case 502:
        showToast(message, 'error');
        break;
      default:
        showToast('Unable to connect to the server.', 'error');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomBackButton onPress={() => navigation.navigate('Login')} />

      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your registered email and we’ll send you an OTP to reset your password.
        </Text>

        <View style={styles.form}>
          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={error}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomButton
            title={loading ? 'Sending...' : 'Send OTP'}
            onPress={handleSendOTP}
            disabled={loading}
          />
        </View>

        <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.placeholder,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
});

export default ForgotPassword;
