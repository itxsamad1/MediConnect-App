import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, FlatList, ListRenderItem } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get('window');

interface Slide { id: string; image: any; title: string; subtitle: string }

const slides: Slide[] = [
  { id: '1', image: require('../assets/splash1.png'), title: 'MediConnect', subtitle: 'Get instant doctor consultation anytime and anywhere on your mobile.' },
  { id: '2', image: require('../assets/splash2.png'), title: 'Easy Appointments', subtitle: 'Book appointments with specialists in just a few taps.' },
  { id: '3', image: require('../assets/splash3.png'), title: 'Trusted Doctors', subtitle: 'Connect with certified and experienced doctors online.' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: next });
      setCurrentIndex(next);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem: ListRenderItem<Slide> = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={[styles.image, { height: height * 0.35 }]} resizeMode="contain" />
      <Text style={[styles.title, { color: colors.primary }]}>{item.title}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={{ flex: 1 }}>
        <FlatList ref={flatListRef} data={slides} renderItem={renderItem} keyExtractor={(i) => i.id} horizontal pagingEnabled scrollEnabled={false} showsHorizontalScrollIndicator={false} />
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, currentIndex === i && [styles.activeDot, { backgroundColor: colors.primary }]]} />
          ))}
        </View>
      </View>
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <CustomButton title="Get Started" onPress={() => navigation.navigate('Signup')} />
        <View style={styles.loginRow}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginLink, { color: colors.primary }]}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  slide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  image: { width: '100%', marginBottom: 10 },
  title: { fontSize: 30, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 24, paddingHorizontal: 10 },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  dot: { height: 8, width: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  activeDot: { width: 16 },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 14 },
  loginLink: { fontSize: 14, fontWeight: '700' },
});
