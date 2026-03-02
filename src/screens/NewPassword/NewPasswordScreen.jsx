import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import { validatePassword } from '../../utils/validation';
import colors from '../../theme/Color';

const NewPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
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

  const handleCreatePassword = async () => {
    const passwordErr = validatePassword(password);
    const confirmErr = password !== confirmPassword ? 'Passwords do not match' : '';

    setErrors({
      password: passwordErr || '',
      confirmPassword: confirmErr,
    });

    if (passwordErr || confirmErr) return;

    try {
      setLoading(true);
      const res = await axios.post('http://192.168.100.2:3000/update-password', { password }, {
        withCredentials: true, 
      });

      const { status, data } = res;

      switch (status) {
        case 201:
          showToast(data.message || 'Password updated successfully.', 'success');
          navigation.navigate('Login');
          break;
        case 403:
          showToast(data.message || 'Session expired. Please try again.', 'error');
          break;
        case 404:
          showToast(data.message || 'User not found.', 'error');
          break;
        default:
          showToast('Unexpected response from server.', 'error');
      }
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Something went wrong.';

      switch (status) {
        case 403:
        case 404:
          showToast(message, 'error');
          break;
        case 500:
          showToast('Server error. Try again later.', 'error');
          break;
        default:
          showToast('Could not connect to server.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from previous ones.
        </Text>

        <View style={styles.form}>
          <CustomInput
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />
          <CustomInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
          />

          <CustomButton
            title={loading ? 'Updating...' : 'Create New Password'}
            onPress={handleCreatePassword}
            disabled={loading}
          />
        </View>
      </View>

      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight || 12,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.placeholder,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
});

export default NewPasswordScreen;
