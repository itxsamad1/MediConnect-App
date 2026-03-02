// components/CustomToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomToast = ({ type = 'info', message = '', visible }) => {
  if (!visible) return null;

  return (
    <View style={[styles.toastContainer, styles[type]]}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#2ecc71',
  },
  error: {
    backgroundColor: '#e74c3c',
  },
  info: {
    backgroundColor: '#3498db',
  },
});

export default CustomToast;
