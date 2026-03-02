import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomBackButton = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="arrow-back" size={22} color="black" />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer:{   
    width: '100%',
     marginTop: 60,
     paddingHorizontal: 10,
    },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#d3d3d3', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
   
  },
});

export default CustomBackButton;
