import { View, Text, StyleSheet } from 'react-native'
import { MoneyDisplay } from './MoneyDisplay'
import { FC } from 'react'

interface BalanceDisplayProps {
  cardName: string
  cardNumber: string
  currentAmount: number
}

const styles = StyleSheet.create({
  container: { width: '85%', paddingBottom: 10 },
  balanceTitle: { fontFamily: 'LatoRegular', color: '#7A7A7A', fontSize: 10 },
  cardContainer: {
    width: '100%',
    height: 35,
    backgroundColor: '#428A4E',
    paddingLeft: 30,
    marginBottom: 10,
  },
  cardNameText: {
    fontFamily: 'LatoRegular',
    color: 'white',
    fontSize: 16,
  },
  cardNumberContainer: { paddingLeft: 30 },
  cardNumberText: { fontFamily: 'LatoRegular', fontSize: 12 },
})

export const BalanceDisplay: FC<BalanceDisplayProps> = ({
  cardName,
  cardNumber,
  currentAmount,
}) => {
  return (
    <View
      className="pt-5 rounded-3xl bg-white flex self-center"
      style={styles.container}
    >
      <View className="pl-6">
        <Text className="" style={styles.balanceTitle}>
          CURRENT BALANCE
        </Text>
        <MoneyDisplay amount={currentAmount} />
      </View>
      <View className="flex flex-row items-center" style={styles.cardContainer}>
        <Text style={styles.cardNameText}>{cardName}</Text>
      </View>
      <View
        className="flex flex-row items-center"
        style={styles.cardNumberContainer}
      >
        <Text style={styles.cardNumberText}>{cardNumber}</Text>
      </View>
    </View>
  )
}
