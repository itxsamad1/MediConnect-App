import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../../components/home/Header';
import HealthStatusCard from '../../components/home/HealthStatusCard';
import Upcoming from '../../components/home/UpcomingAppointment';
import QuickAction from '../../components/home/QuickAction';
import RecentActivity from '../../components/home/RecentActivity';
import HealthTip from '../../components/home/HealthTip';
import { useTheme } from '../../context/ThemeContext';

export function HomeScreen() {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <HealthStatusCard />
      <Upcoming />
      <QuickAction />
      <RecentActivity />
      <HealthTip />
    </ScrollView>
  );
}

export default HomeScreen;
