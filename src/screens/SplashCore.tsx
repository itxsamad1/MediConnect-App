import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, Image, Platform, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SplashCore: React.FC = () => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.inner, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image source={require('../assets/logo-bg-remove.png')} style={styles.image} resizeMode="contain" />
        <Text style={[styles.logoText, { color: colors.primary }]}>MediConnect</Text>
      </Animated.View>
    </View>
  );
};

export default SplashCore;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inner: { justifyContent: 'center', alignItems: 'center' },
  image: { width: 240, height: 140 },
  logoText: { fontSize: 30, fontWeight: '700', marginTop: 10, fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }), letterSpacing: 1 },
});

