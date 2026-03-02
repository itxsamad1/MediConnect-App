import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import colors from '../../theme/Color';
const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../assets/splash1.png'),
    title: 'MediConnect',
    subtitle:
      'Get instant doctor consultation anytime and anywhere on your mobile.',
  },
  {
    id: '2',
    image: require('../../assets/splash2.png'),
    title: 'Easy Appointments',
    subtitle: 'Book appointments with specialists in just a few taps.',
  },
  {
    id: '3',
    image: require('../../assets/splash3.png'),
    title: 'Trusted Doctors',
    subtitle: 'Connect with certified and experienced doctors online.',
  },
];

const SplashScreen = ({navigation}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex});
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.flex1}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.fixedPagination}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Get Started"
          onPress={()=> navigation.navigate("Signup")}
          containerStyle={styles.button}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex1: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: '100%',
    height: height * 0.35,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.placeholder,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  fixedPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: colors.primary,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 80,
    backgroundColor: colors.background,
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    marginBottom: 14,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: colors.placeholder,
  },
  loginLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
