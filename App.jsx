import './global.css';
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Auth Screens
import SplashScreen from './src/features/splash/SplashScreen';
import SplashCore from './src/features/splash/SplashCore';
import LoginScreen from './src/features/auth/LoginScreen';
import SignupScreen from './src/features/auth/SignupScreen';
import NewPasswordScreen from './src/features/auth/NewPasswordScreen';
import OTPScreen from './src/features/auth/OTPScreen';
import ForgotPasswordScreen from './src/features/auth/ForgotPasswordScreen';
import MedicalProfileScreen from './src/features/profile/MedicalProfileScreen';

// App Navigation
import BottomTabs from './src/navigation/BottomTabs';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, loading } = useContext(AuthContext);
  const { isDark } = useTheme();

  if (loading) return <SplashCore />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainApp" component={BottomTabs} />
      ) : (
        <>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          <Stack.Screen name="MedicalProfileScreen" component={MedicalProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function AppContent() {
  const { isDark, colors } = useTheme();
  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
