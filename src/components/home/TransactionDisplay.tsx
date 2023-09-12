import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { STANDARD_CHARLIE_GREEN } from '../../utils/constants'

interface TransactionDisplayProps {
  transaction: {
    amount: number
    date: Date
  }
}

export const TransactionDisplay: FC<TransactionDisplayProps> = ({
  transaction: { amount, date },
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="arrow-up-right" size={25} color={STANDARD_CHARLIE_GREEN} />
      </View>
      <View className="flex justify-center gap-2">
        <Text style={styles.amountText}>${amount} Refill</Text>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'row' },
  iconContainer: {
    backgroundColor: 'white',
    display: 'flex',
    maxHeight: 40,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 50,
    marginRight: 27,
  },
  amountText: { fontFamily: 'LatoSemibold', fontSize: 18 },
  dateText: { fontFamily: 'LatoRegular', fontSize: 16, color: '#878787' },
})
