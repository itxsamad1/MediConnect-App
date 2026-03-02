
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../theme/Color';

   const CustomCheckbox = ({ options, selectedValue, onSelect, title }) => (
       <View style={styles.checkboxContainer}>
         <Text style={styles.checkboxTitle}>{title}</Text>
         <View style={styles.checkboxGrid}>
           {options.map((option) => (
             <TouchableOpacity
               key={option}
               style={[
                 styles.checkboxOption,
                 selectedValue === option && styles.checkboxOptionSelected
               ]}
               onPress={() => onSelect(option)}
             >
               <Text style={[
                 styles.checkboxText,
                 selectedValue === option && styles.checkboxTextSelected
               ]}>
                 {option}
               </Text>
             </TouchableOpacity>
           ))}
         </View>
       </View>
     );
   

export default CustomCheckbox;

const styles = StyleSheet.create({
   checkboxContainer: {
    marginBottom: 20,
  },
  checkboxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 10,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  checkboxOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    marginRight: 8,
    marginBottom: 8,
  },
  checkboxOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    fontSize: 14,
    color: colors.placeholder,
    fontWeight: '500',
  },
  checkboxTextSelected: {
    color: colors.buttonText,
  },
})