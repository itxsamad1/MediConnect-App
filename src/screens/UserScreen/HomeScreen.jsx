import React from 'react';
import { ScrollView } from 'react-native';
import Headers from '../../components/HomeScreen/Header';
import HealthStatusCard from '../../components/HomeScreen/HealthStatusCard';
import Upcoming from '../../components/HomeScreen/UpcomingAppionment';
import QuickAction from '../../components/HomeScreen/QuickAction';
import RecentActivity from '../../components/HomeScreen/RecentActivity';
import HealthTip from '../../components/HomeScreen/HealthTip';

export function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <Headers />
      <HealthStatusCard />
      <Upcoming />
      <QuickAction />
      <RecentActivity />
      <HealthTip />
    </ScrollView>
  );
}

export default HomeScreen;
