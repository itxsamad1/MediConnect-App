import React, {useContext} from 'react';
import { StyleSheet, ScrollView} from 'react-native'
import Headers from '../../components/HomeScreen/Header';
import HealthStatusCard from '../../components/HomeScreen/HealthStatusCard';
import Upcoming from '../../components/HomeScreen/UpcomingAppionment';
import QuickAction from '../../components/HomeScreen/QuickAction';
import RecentActivity from '../../components/HomeScreen/RecentActivity';
import HealthTip from '../../components/HomeScreen/HealthTip';
import colors from '../../theme/Color';

export function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Headers />
      <HealthStatusCard />
      <Upcoming />
      <QuickAction />
      <RecentActivity />
      <HealthTip />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default HomeScreen;
