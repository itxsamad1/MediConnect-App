import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import CustomBackButton from '../../components/CustomBackButton';
import { useTheme } from '../../context/ThemeContext';

function OTPScreen({ navigation }) {
  const { colors } = useTheme();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleKeyPress = key => {
    if (key === 'backspace') {
      const lastFilled = [...otp].reverse().findIndex(v => v !== '');
      const idx = lastFilled >= 0 ? 3 - lastFilled : -1;
      if (idx >= 0) {
        const next = [...otp]; next[idx] = ''; setOtp(next);
        inputs.current[idx]?.focus();
      }
    } else {
      const empty = otp.findIndex(v => v === '');
      if (empty !== -1) {
        const next = [...otp]; next[empty] = key; setOtp(next);
        if (empty < 3) inputs.current[empty + 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 4) return showToast('Please enter the full OTP.', 'error');
    try {
      await new Promise(r => setTimeout(r, 1000));
      showToast('OTP verified!', 'success');
      navigation.navigate('NewPassword');
    } catch {
      showToast('Verification failed.', 'error');
    }
  };

  const keypadKeys = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', 'backspace']];

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <CustomBackButton onPress={() => navigation.goBack()} />
      <View style={styles.inner}>
        <Text style={[styles.title, { color: colors.text }]}>Verify OTP</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter the 4-digit code sent to your email
        </Text>

        <View style={styles.otpRow}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={r => (inputs.current[index] = r)}
              style={[styles.otpBox, { borderColor: value ? colors.primary : colors.border, backgroundColor: colors.inputBackground, color: colors.text }]}
              maxLength={1}
              keyboardType="numeric"
              value={value}
              editable={false}
            />
          ))}
        </View>

        <View style={styles.keypad}>
          {keypadKeys.map((row, ri) => (
            <View key={ri} style={styles.keypadRow}>
              {row.map((key, ki) => (
                <TouchableOpacity
                  key={ki}
                  style={[styles.keypadKey, { backgroundColor: key ? colors.surface : 'transparent', borderColor: colors.border }]}
                  onPress={() => key && handleKeyPress(key)}
                  activeOpacity={key ? 0.7 : 1}
                >
                  {key === 'backspace' ? (
                    <Text style={[styles.keyText, { color: colors.text }]}>⌫</Text>
                  ) : key ? (
                    <Text style={[styles.keyText, { color: colors.text }]}>{key}</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <CustomButton title="Verify OTP" onPress={handleVerify} />
      </View>
      <CustomToast visible={toast.visible} message={toast.message} type={toast.type} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 12 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  otpRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 28, gap: 14 },
  otpBox: { width: 60, height: 68, borderWidth: 2, borderRadius: 12, textAlign: 'center', fontSize: 24, fontWeight: '700' },
  keypad: { marginBottom: 24, gap: 8 },
  keypadRow: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  keypadKey: { width: 78, height: 58, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  keyText: { fontSize: 22, fontWeight: '600' },
});

export default OTPScreen;
