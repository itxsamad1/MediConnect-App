import React, { useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import colors from '../../theme/Color';
import CustomKeyboard from '../../components/CustomKeyboard';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';

function OTP({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
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
    if (otpCode.length < 4) {
      return showToast('Please enter the full OTP.', 'error');
    }

    try {
      const res = await axios.post('http://192.168.100.2:3000/verify-otp', {
        otp: otpCode,
      });

      switch (res.status) {
        case 200:
          showToast(res.data.message || 'OTP verified successfully!', 'success');
          navigation.navigate('NewPassword'); 
          break;
        case 400:
          showToast(res.data.message || 'OTP is required.', 'error');
          break;
        case 404:
          showToast(res.data.message || 'OTP not found or expired.', 'error');
          break;
        case 410:
          showToast(res.data.message || 'OTP has expired.', 'error');
          break;
        case 401:
          showToast(res.data.message || 'Invalid OTP.', 'error');
          break;
        default:
          showToast('Unexpected server response.', 'error');
      }
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong.';
      showToast(message, 'error');
    }
  };

  return (
    <View style={styles.container}>

      {/* Text Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Please enter the code we just sent to email
        </Text>
        <Text style={{ color: colors.primary }}>adeel8128377@gmail.com</Text>
      </View>

      {/* OTP Inputs */}
      <View style={styles.inputContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            value={value}
            editable={false} 
            selectTextOnFocus={false}
          />
        ))}
      </View>

      {/* Verify Button */}
      <View style={styles.verifyButton}>
        <CustomButton title="Verify OTP" onPress={handleVerifyOtp} />
      </View>

      {/* Custom Keyboard */}
      <View style={styles.customKeyboard}>
        <CustomKeyboard onKeyPress={handleKeyPress} />
      </View>

      {/* Toast Notification */}
      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </View>
  );
}

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topBar: {
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
  content: {
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
    fontSize: 15,
    color: colors.placeholder,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    width: 50,
    height: 60,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  verifyButton: {
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  customKeyboard: {
    position: 'absolute',
    bottom: '5%',
  },
});
