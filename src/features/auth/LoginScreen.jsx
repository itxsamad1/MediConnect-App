import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmail, validatePassword } from '../../utils/validation';
import FancyImageButton from '../../components/FancyImageButton';
import CustomToast from '../../components/CustomToast';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const { colors } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleLogin = async () => {
    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);
    setErrors({ email: emailErr || '', password: passwordErr || '' });
    if (emailErr || passwordErr) return showToast('Please fix the errors above.', 'error');
    try {
      await new Promise(r => setTimeout(r, 1000));
      const response = { status: 200, data: { token: 'dummy-token-123', user: { id: 1, name: 'Sam', email: formData.email } } };
      if (response.status === 200) {
        await login(response.data.user, response.data.token);
        showToast('Login successful!', 'success');
      }
    } catch {
      showToast('Something went wrong.', 'error');
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: colors.text }]}>Sign In</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Hi, Welcome back!
        </Text>

        <View style={styles.form}>
          <CustomInput placeholder="Email" value={formData.email} onChangeText={v => handleChange('email', v)} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
          <CustomInput placeholder="Password" value={formData.password} onChangeText={v => handleChange('password', v)} secureTextEntry error={errors.password} />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotWrap}>
            <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
          </TouchableOpacity>

          <CustomButton title="Login" onPress={handleLogin} />

          <View style={styles.dividerRow}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>Or sign with</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.socialRow}>
            <FancyImageButton type="google" imageSource={require('../../assets/google-remove-bg.png')} onPress={() => { }} />
            <FancyImageButton type="apple" imageSource={require('../../assets/Iphone.png')} onPress={() => { }} />
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.signupLink, { color: colors.textSecondary }]}>
            Don't have an account? <Text style={{ color: colors.primary, fontWeight: '700' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 28 },
  form: { width: '100%' },
  forgotWrap: { alignItems: 'flex-end', marginBottom: 16 },
  forgotText: { fontSize: 13, fontWeight: '600' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  divider: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 10, fontSize: 13 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  signupLink: { textAlign: 'center', fontSize: 14, marginTop: 8 },
});

export default LoginScreen;
