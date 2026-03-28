import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { CustomBackButtonProps } from '../types';

const CustomBackButton: React.FC<CustomBackButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.surfaceSecondary }]} onPress={onPress} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={22} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 55, paddingHorizontal: 16 },
  button: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
});

export default CustomBackButton;
