import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from '../theme/colors';

const THEME_STORAGE_KEY = '@medi_connect_theme';

const ThemeContext = createContext({
    isDark: false,
    colors: lightColors,
    toggleTheme: () => { },
    setTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
    const deviceScheme = useColorScheme();
    const [isDark, setIsDark] = useState(deviceScheme === 'dark');
    const [loaded, setLoaded] = useState(false);

    // Load persisted preference on mount
    useEffect(() => {
        AsyncStorage.getItem(THEME_STORAGE_KEY)
            .then(stored => {
                if (stored !== null) {
                    setIsDark(stored === 'dark');
                }
                setLoaded(true);
            })
            .catch(() => setLoaded(true));
    }, []);

    const setTheme = useCallback(async (dark) => {
        setIsDark(dark);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
        } catch { }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(!isDark);
    }, [isDark, setTheme]);

    const colors = isDark ? darkColors : lightColors;

    if (!loaded) return null;

    return (
        <ThemeContext.Provider value={{ isDark, colors, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
