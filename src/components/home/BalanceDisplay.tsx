import { View, Text, StyleSheet } from 'react-native'
import { MoneyDisplay } from './MoneyDisplay'
import { FC } from 'react'
import { CharlieCard } from '../../controllers/account'
import {
  STANDARD_CHARLIE_GREEN,
  STANDARD_LIGHT_GRAY,
} from '../../utils/constants'

interface BalanceDisplayProps {
  card: CharlieCard
  currentAmount: number
  loading: boolean
}

export const BalanceDisplay: FC<BalanceDisplayProps> = ({
  card,
  currentAmount,
  loading,
}) => {
  return (
    <View
      className="pt-5 rounded-3xl bg-white flex self-center"
      style={styles.container}
    >
      <View className="pl-6">
        <Text style={styles.balanceTitle}>CURRENT BALANCE</Text>
        {loading ? (
          <Text style={styles.loadingPlaceholderAmountText}>$ --</Text>
        ) : (
          <MoneyDisplay amount={currentAmount} />
        )}
      </View>
      <View className="flex flex-row items-center" style={styles.cardContainer}>
        <Text style={styles.cardNameText}>
          {loading ? 'Loading...' : card.name}
        </Text>
      </View>
      <View
        className="flex flex-row items-center"
        style={styles.cardNumberContainer}
      >
        <Text style={styles.cardNumberText}>
          {loading ? '--' : card.number}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { width: '85%', paddingBottom: 10 },
  balanceTitle: { fontFamily: 'LatoRegular', color: '#7A7A7A', fontSize: 10 },
  cardContainer: {
    width: '100%',
    height: 35,
    backgroundColor: STANDARD_CHARLIE_GREEN,
    paddingLeft: 30,
    marginBottom: 10,
  },
  loadingPlaceholderAmountText: {
    color: STANDARD_LIGHT_GRAY,
    fontFamily: 'LatoSemibold',
    fontSize: 28,
    marginVertical: 33,
    paddingLeft: 6,
  },
  cardNameText: {
    fontFamily: 'LatoRegular',
    color: 'white',
    fontSize: 16,
  },
  cardNumberContainer: { paddingLeft: 30 },
  cardNumberText: { fontFamily: 'LatoRegular', fontSize: 12 },
})
