import React, { useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { validateEmail, validatePassword, validateName, validatePhoneNumber } from '../../utils/validation';
import FancyImageButton from '../../components/FancyImageButton';
import CheckBoxIcon from 'react-native-vector-icons/Ionicons';
import CustomToast from '../../components/CustomToast';
import { useTheme } from '../../context/ThemeContext';

const SignupScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSignup = async () => {
    const newErrors = {
      fullName: validateName(formData.fullName) || null,
      email: validateEmail(formData.email) || null,
      phoneNumber: validatePhoneNumber(formData.phoneNumber) || null,
      password: validatePassword(formData.password) || null,
      terms: termsAccepted ? null : 'You must accept the terms',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return showToast('Please fix the errors above.', 'error');
    try {
      await new Promise(r => setTimeout(r, 1000));
      showToast('Account created! Please log in.', 'success');
      setTimeout(() => navigation.navigate('Login'), 1500);
    } catch {
      showToast('Something went wrong.', 'error');
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Fill in the information below to register.
        </Text>

        <View style={styles.form}>
          <CustomInput placeholder="Full Name" value={formData.fullName} onChangeText={v => handleChange('fullName', v)} error={errors.fullName} />
          <CustomInput placeholder="Email" value={formData.email} onChangeText={v => handleChange('email', v)} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
          <CustomInput placeholder="Phone Number" value={formData.phoneNumber} onChangeText={v => handleChange('phoneNumber', v)} error={errors.phoneNumber} keyboardType="phone-pad" />
          <CustomInput placeholder="Password" value={formData.password} onChangeText={v => handleChange('password', v)} secureTextEntry error={errors.password} />

          <TouchableOpacity style={styles.termsRow} onPress={() => setTermsAccepted(v => !v)} activeOpacity={0.7}>
            <CheckBoxIcon name={termsAccepted ? 'checkbox-outline' : 'square-outline'} size={22} color={colors.primary} />
            <Text style={[styles.termsText, { color: colors.textSecondary }]}>
              {'  '}I agree to the{' '}
              <Text style={{ color: colors.primary, fontWeight: '700' }}>Terms & Conditions</Text>
            </Text>
          </TouchableOpacity>
          {!!errors.terms && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.terms}</Text>}

          <CustomButton title="Sign Up" onPress={handleSignup} containerStyle={{ marginTop: 12 }} />

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

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.loginLink, { color: colors.textSecondary }]}>
            Already have an account? <Text style={{ color: colors.primary, fontWeight: '700' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  title: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 24 },
  form: { width: '100%' },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  termsText: { flex: 1, fontSize: 13 },
  errorText: { fontSize: 12, marginBottom: 8 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  divider: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 10, fontSize: 13 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  loginLink: { textAlign: 'center', fontSize: 14 },
});

export default SignupScreen;