import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FancyImageButtonProps } from '../types';

const FancyImageButton: React.FC<FancyImageButtonProps> = ({ type, onPress, imageSource, containerStyle }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[styles.circle, { backgroundColor: colors.surfaceSecondary }, containerStyle]} activeOpacity={0.7}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: { width: 52, height: 52, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  image: { width: 26, height: 26 },
});

export default FancyImageButton;
