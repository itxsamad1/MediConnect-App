import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../theme/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face' }}
              style={styles.avatar}
            />
            <View style={styles.statusIndicator} />
          </View>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>Dr. Adeel</Text>
            <Text style={styles.subText}>How are you feeling today?</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="search" size={22} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.notificationIconContainer}>
              <Icon name="notifications-none" size={24} color={colors.primary} />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.healthStatus}>
        <View style={styles.statusCard}>
          <Icon name="favorite" size={16} color={colors.secondary} />
          <Text style={styles.statusText}>Heart Rate: 72 BPM</Text>
        </View>
    
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputBackground,
    paddingTop: 50,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.success,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.inputBackground,
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '500',
    marginBottom: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '400',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationIconContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.inputBackground,
  },
  badgeText: {
    color: colors.buttonText,
    fontSize: 11,
    fontWeight: 'bold',
  },
  healthStatus: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statusCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
});
