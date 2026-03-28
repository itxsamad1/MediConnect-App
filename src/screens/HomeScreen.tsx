import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/home/Header';
import HealthStatusCard from '../components/home/HealthStatusCard';
import UpcomingAppointment from '../components/home/UpcomingAppointment';
import QuickAction from '../components/home/QuickAction';
import RecentActivity from '../components/home/RecentActivity';
import HealthTip from '../components/home/HealthTip';
import { useTheme } from '../context/ThemeContext';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    // NativeWind: flex-1
    <ScrollView className="flex-1" style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <Header />
      <HealthStatusCard />
      <UpcomingAppointment />
      <QuickAction />
      <RecentActivity />
      <HealthTip />
    </ScrollView>
  );
};

export default HomeScreen;
