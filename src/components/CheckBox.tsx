import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CheckBoxProps } from '../types';

const CustomCheckbox: React.FC<CheckBoxProps> = ({ options, selectedValue, onSelect, title }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>
      <View style={styles.grid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              { borderColor: colors.border, backgroundColor: colors.inputBackground },
              selectedValue === option && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.text, { color: colors.placeholder }, selectedValue === option && { color: colors.textOnPrimary }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  option: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, marginRight: 8, marginBottom: 8 },
  text: { fontSize: 14, fontWeight: '500' },
});

export default CustomCheckbox;
