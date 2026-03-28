import { ImageSourcePropType } from 'react-native';

// ─── Auth ───────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  fullName?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User, authToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ─── Theme ──────────────────────────────────────────────
export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  textOnPrimary: string;
  border: string;
  borderFocus: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  info: string;
  infoLight: string;
  tabBar: string;
  tabBarBorder: string;
  shadow: string;
  overlay: string;
  placeholder: string;
  inputBackground: string;
  [key: string]: string; // allow dynamic key access
}

export interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => Promise<void>;
}

// ─── Navigation ─────────────────────────────────────────
export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OTP: undefined;
  NewPassword: undefined;
  MedicalProfileScreen: undefined;
  MainApp: undefined;
  HomeScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Doctors: undefined;
  Prescriptions: undefined;
  Settings: undefined;
};

// ─── Component Props ────────────────────────────────────
export interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string | null;
  inputStyle?: object;
  containerStyle?: object;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: object;
  disabled?: boolean;
}

export interface CustomBackButtonProps {
  onPress: () => void;
}

export interface CustomToastProps {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  visible: boolean;
}

export interface FancyImageButtonProps {
  type: string;
  onPress: () => void;
  imageSource: ImageSourcePropType;
  containerStyle?: object;
}

export interface CheckBoxProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  title: string;
}
