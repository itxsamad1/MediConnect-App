import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomButtonProps } from '../types';

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, containerStyle, disabled = false }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? colors.textDisabled : colors.primary }, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: colors.textOnPrimary }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { width: '100%', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  text: { fontWeight: '700', fontSize: 16 },
});

export default CustomButton;
