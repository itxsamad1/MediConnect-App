import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/Color';

const CustomButton = ({ title, onPress, containerStyle }) => (
  <TouchableOpacity
    style={[styles.button, containerStyle]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;
