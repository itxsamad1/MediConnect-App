import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../UserScreen/HomeScreen';
import AppointmentScreen from '../UserScreen/AppointmentScreen';
import DoctorScreen from '../UserScreen/DoctorScreen';
import PrescriptionScreen from '../UserScreen/PrescriptionScreen';
import SettingsScreen from '../UserScreen/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Appointments':
              iconName = 'event';
              break;
            case 'Doctors':
              iconName = 'search';
              break;
            case 'Prescriptions':
              iconName = 'receipt';
              break;
            case 'Settings':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={AppointmentScreen} />
      <Tab.Screen name="Doctors" component={DoctorScreen} />
      <Tab.Screen name="Prescriptions" component={PrescriptionScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
