import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import colors from '../../theme/Color';

const { width, height } = Dimensions.get('window');

const SplashCore = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale: 0.8

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../../assets/logo-bg-remove.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.logoText}>
          <Text style={styles.logoTextStyling}>MediConnect</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashCore;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 140,
  },
  logoText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoTextStyling: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
    }),
    letterSpacing: 1,
  },
});
