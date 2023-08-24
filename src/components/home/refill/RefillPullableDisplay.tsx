import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface RefillPullableDisplayProps {
  currentAmount: number
  addedAmount: number
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECECEC',
    borderRadius: 16,
    padding: 8,
  },
  currentAmountContainer: { width: '40%' },
  currentAmountText: {
    color: 'white',
    fontFamily: 'LatoSemibold',
    fontSize: 16,
  },
  addedAmountContainer: { width: '40%', backgroundColor: '#428A4E' },
  addedAmountText: { color: 'white', fontFamily: 'LatoSemibold', fontSize: 16 },
})

export const RefillPullableDisplay: FC<RefillPullableDisplayProps> = ({
  currentAmount,
  addedAmount,
}) => {
  return (
    <View
      className="flex flex-row justify-start w-full"
      style={styles.container}
    >
      <View
        className="rounded-l-xl bg-blue py-5 px-2.5"
        style={styles.currentAmountContainer}
      >
        <Text numberOfLines={1} style={styles.currentAmountText}>
          ${currentAmount}
        </Text>
      </View>
      <View
        className="rounded-r-md py-5 px-2.5"
        style={styles.addedAmountContainer}
      >
        <Text numberOfLines={1} style={styles.addedAmountText}>
          + ${addedAmount}
        </Text>
      </View>
    </View>
  )
}
