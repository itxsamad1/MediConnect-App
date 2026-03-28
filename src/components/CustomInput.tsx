import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { CustomInputProps } from '../types';

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder, value, onChangeText, secureTextEntry = false,
  error, inputStyle, containerStyle, multiline = false,
  keyboardType, autoCapitalize,
}) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        <TextInput
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[
            styles.input,
            { backgroundColor: colors.inputBackground, borderColor: error ? colors.danger : colors.border, color: colors.text },
            secureTextEntry && { paddingRight: 50 },
            inputStyle as TextStyle,
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsPasswordVisible((v) => !v)} style={styles.eyeIcon}>
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={22} color={colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  inputWrapper: { position: 'relative' },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15 },
  eyeIcon: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
  error: { marginTop: 4, fontSize: 12 },
});

export default CustomInput;
