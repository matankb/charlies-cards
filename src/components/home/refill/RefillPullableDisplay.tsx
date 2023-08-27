import { FC, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PullableElement } from '../../PullableElement'

interface RefillPullableDisplayProps {
  currentAmount: number
  addedAmount: number
  handleUpdatedAmount: (number) => void
}

const MAX_REFILL = 150
const DEFAULT_WIDTH = 22

export const RefillPullableDisplay: FC<RefillPullableDisplayProps> = ({
  currentAmount,
  addedAmount: initialAddedAmount,
  handleUpdatedAmount,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addedAmount, setAddedAmount] = useState(initialAddedAmount) // $
  const [pulledWidth, setPulledWidth] = useState(DEFAULT_WIDTH)

  useEffect(() => handleUpdatedAmount(addedAmount), [addedAmount])

  const currentAmountWidth = () => {
    // todo: make the 22 (min width) calculated based on digits in amount displayed
    return Math.max(DEFAULT_WIDTH, currentAmount / MAX_REFILL)
  }

  const handleUpdatePulledWidth = (width: number) => {
    const amount = Math.ceil((MAX_REFILL * (width / 100)) / 5) * 5
    setAddedAmount(amount)
    setPulledWidth(width)
  }

  return (
    <View
      className="flex flex-row justify-start w-full"
      style={styles.container}
    >
      <View
        className="rounded-l-xl bg-blue py-5 px-2.5"
        style={{
          width: `${currentAmountWidth()}%`,
        }}
      >
        <Text numberOfLines={1} style={styles.currentAmountText}>
          ${currentAmount}
        </Text>
      </View>
      <View
        className="rounded-r-md pl-2.5 pr-1.5 py-3"
        style={[styles.addedAmountContainer, { width: `${pulledWidth}%` }]}
      >
        <Text numberOfLines={1} style={styles.addedAmountText}>
          +${addedAmount - 25}
        </Text>
        <PullableElement
          min={DEFAULT_WIDTH}
          max={100 - currentAmountWidth()}
          startingValue={DEFAULT_WIDTH}
          updateWidth={handleUpdatePulledWidth}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECECEC',
    borderRadius: 16,
    padding: 8,
  },
  currentAmountText: {
    color: 'white',
    fontFamily: 'LatoSemibold',
    fontSize: 16,
  },
  addedAmountContainer: {
    backgroundColor: '#428A4E',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addedAmountText: { color: 'white', fontFamily: 'LatoSemibold', fontSize: 16 },
})
