import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmail, validatePassword } from '../../utils/validation';
import colors from '../../theme/Color';
import FancyImageButton from '../../components/FancyImageButton';
import CustomToast from '../../components/CustomToast';
import {AuthContext} from "../../context/AuthContext"


const Login = ({ navigation }) => {
  const {login} = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info',
  });

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
      const response = await axios.post('http://192.168.100.2:3000/login', formData);

      if (response.status === 200) {
    
        console.log('Login response:', response.data);
        const {token, user} = response.data;
        console.log('Token & user:', token, user);
        await login(user, token);
            showToast('Login successful! 🎉', 'success');
        navigation.navigate("MainApp")
  
      }
    } catch (error) {
      let msg = 'Something went wrong.';
      if (error.response?.data?.error) {
        msg = error.response.data.error;
      }
      showToast(msg, 'error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Hi, Welcome back, you have been missed.</Text>

        <View style={styles.form}>
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
            style={styles.forgotContainer}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <CustomButton title="Login" onPress={handleLogin} />

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or sign with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.buttonContainer}>
            <FancyImageButton
              type="google"
              imageSource={require('../../assets/google-remove-bg.png')}
              onPress={() => console.log('Google pressed')}
              containerStyle={styles.authButton}
            />
            <FancyImageButton
              type="apple"
              imageSource={require('../../assets/Iphone.png')}
              onPress={() => console.log('Apple ID')}
              containerStyle={styles.authButton}
            />
          </View>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.background,
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
  },
  form: {
    width: '100%',
  },
  forgotContainer: {
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  forgotText: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    marginHorizontal: 10,
    color: colors.placeholder,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  authButton: {
    backgroundColor: '#e9ecef',
  },
});

export default Login;
