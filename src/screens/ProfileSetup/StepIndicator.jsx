import { View, Text, StyleSheet } from 'react-native'
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';

import colors from '../../theme/Color';
 const StepIndicator = ({currentStep, totalSteps}) => {

        return(
            <>
               <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step && styles.stepCircleActive
          ]}>
            <Text style={[
              styles.stepText,
              currentStep >= step && styles.stepTextActive
            ]}>
              {step}
            </Text>
          </View>
          {step < totalSteps && (
            <View style={[
              styles.stepLine,
              currentStep > step && styles.stepLineActive
            ]} />
          )}
        </View>
      ))}
    </View>
            </>
        )
 }


export default StepIndicator;

const styles = StyleSheet.create({
     stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.placeholder,
  },
  stepTextActive: {
    color: colors.buttonText,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 5,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
})