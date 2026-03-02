import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomKeyboard = ({ onKeyPress }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

  return (
    <View style={styles.keyboardContainer}>
      {keys.map((key) => (
        <TouchableOpacity
          key={key}
          style={styles.keyButton}
          onPress={() => onKeyPress(key)}
          activeOpacity={0.7}
        >
          <Text style={styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.keyButton, styles.backspaceButton]}
        onPress={() => onKeyPress('backspace')}
        activeOpacity={0.7}
      >
        <Text style={styles.keyText}>⌫</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomKeyboard;

const styles = StyleSheet.create({
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  keyButton: {
    width: 70,
    height: 70,
    marginVertical: 7,
    marginHorizontal: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  backspaceButton: {
    backgroundColor: '#ddd',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
  },
});
