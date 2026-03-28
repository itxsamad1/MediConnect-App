import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomToastProps } from '../types';

const BACKGROUNDS: Record<string, string> = {
  success: '#16a34a',
  error: '#dc2626',
  info: '#3470c3',
  warning: '#d97706',
};

const CustomToast: React.FC<CustomToastProps> = ({ type = 'info', message = '', visible }) => {
  if (!visible) return null;
  return (
    <View style={[styles.container, { backgroundColor: BACKGROUNDS[type] || BACKGROUNDS.info }]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 20, left: 20, right: 20, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, zIndex: 1000, elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  text: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
});

export default CustomToast;
