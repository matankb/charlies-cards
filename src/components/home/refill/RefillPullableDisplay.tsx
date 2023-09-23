import { FC, useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native'
import { PullableElement } from '../../PullableElement'
import { STANDARD_CHARLIE_GREEN } from '../../../utils/constants'

interface RefillPullableDisplayProps {
  currentAmount: number
  initialAddedAmount: number
  handleUpdatedAmount: (number) => void
}

const MAX_REFILL = 150
const MIN_REFILL = 5
// TODO: make the 22 (min width) calculated based on digits in amount displayed
const MIN_WIDTH = 22
const CONTAINER_PADDING = 8

const roundTo5 = (x: number, floor = false) => {
  return (floor ? Math.floor(x / 5) : Math.ceil(x / 5)) * 5
}

export const RefillPullableDisplay: FC<RefillPullableDisplayProps> = ({
  currentAmount,
  initialAddedAmount,
  handleUpdatedAmount,
}) => {
  const [addedAmount, setAddedAmount] = useState(initialAddedAmount) // $
  const [pulledWidth, setPulledWidth] = useState(null) // %
  const [componentWidth, setComponentWidth] = useState(null)

  const currentAmountWidth = Math.max(MIN_WIDTH, currentAmount / MAX_REFILL)
  const amountFromPullableWidth = (width: number) => {
    const out = roundTo5(
      (MAX_REFILL - currentAmount) * (width / (100 - currentAmountWidth)),
    )

    if (MAX_REFILL < out + currentAmount) {
      return roundTo5(MAX_REFILL - currentAmount, true)
    } else {
      return out
    }
  }
  const pullableWidthFromAmount = (amount: number) => {
    return (100 - currentAmountWidth) * (amount / (MAX_REFILL - currentAmount))
  }

  useLayoutEffect(() => {
    setPulledWidth(pullableWidthFromAmount(initialAddedAmount))
  }, [])

  const handleUpdatePulledWidth = (width: number) => {
    const amount = amountFromPullableWidth(width)
    setAddedAmount(amount)
    handleUpdatedAmount(amount)
    setPulledWidth(width)
  }

  const fetchPadding = (event: LayoutChangeEvent) => {
    setComponentWidth(event.nativeEvent.layout.width - CONTAINER_PADDING * 2)
  }

  return (
    <View
      className="flex flex-row justify-start w-full"
      style={styles.container}
      onLayout={fetchPadding}
    >
      <View
        className="rounded-l-xl bg-blue py-5 px-2.5"
        style={{
          width: `${currentAmountWidth}%`,
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
          +${addedAmount}
        </Text>
        {componentWidth && (
          <PullableElement
            min={pullableWidthFromAmount(MIN_REFILL)}
            max={100 - currentAmountWidth}
            startingValue={pullableWidthFromAmount(addedAmount)}
            componentWidth={componentWidth}
            onChange={handleUpdatePulledWidth}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECECEC',
    borderRadius: 16,
    padding: CONTAINER_PADDING,
  },
  currentAmountText: {
    color: 'white',
    fontFamily: 'LatoSemibold',
    fontSize: 16,
  },
  addedAmountContainer: {
    backgroundColor: STANDARD_CHARLIE_GREEN,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addedAmountText: { color: 'white', fontFamily: 'LatoSemibold', fontSize: 16 },
})
