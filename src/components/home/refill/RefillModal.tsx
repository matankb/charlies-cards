import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { AntDesign as AntDesignIcon } from '@expo/vector-icons'
import { FC, useEffect, useState } from 'react'
import { MoneyDisplay } from '../MoneyDisplay'
import { FontAwesome } from '@expo/vector-icons'
import { RefillPullableDisplay } from './RefillPullableDisplay'
import { Button } from '../../Button'
import { getRefillTarget } from '../../../controllers/settings'
import {
  STANDARD_CHARLIE_GREEN,
  STANDARD_LIGHT_GRAY,
} from '../../../utils/constants'

const VALID_TRANSACTION_AMOUNTS = [5, 10, 20, 25, 50]
const MIN_DEFAULT_TRANSACTION = 10

interface RefillModalPropsimport {
  handleDismiss: () => void
  handleRefill: (amount: number[]) => void
  cardName: string
  currentAmount: number
}

export const RefillModal: FC<RefillModalPropsimport> = ({
  handleDismiss,
  handleRefill,
  cardName,
  currentAmount,
}) => {
  const [loading, setLoading] = useState(true)
  const [targetAmount, setTargetAmount] = useState<number>(null)
  const [transactions, setTransactions] = useState<number[]>(null)

  useEffect(() => {
    async function setInitialTarget() {
      const target = Number(await getRefillTarget())
      setTargetAmount(Math.max(target, currentAmount + MIN_DEFAULT_TRANSACTION))
    }
    setInitialTarget().catch(console.error)
  }, [])

  useEffect(() => {
    async function calculateTransactions() {
      setLoading(true)

      function findNextTransaction(delta: number) {
        return VALID_TRANSACTION_AMOUNTS.findLast(
          (a) => targetAmount >= currentAmount + delta + a,
        )
      }

      // let delta = 0
      // let tempTransactions = []
      // while (findNextTransaction(delta)) {
      //   const next = findNextTransaction(delta)
      //   delta += next
      //   tempTransactions = tempTransactions.concat(next)
      // }
      const tempTransactions = [findNextTransaction(0)]

      setTransactions(tempTransactions)
      setLoading(false)
    }

    if (targetAmount) calculateTransactions().catch(console.error)
  }, [targetAmount])

  const calculatedAddition = transactions.reduce(
    (partialSum, a) => partialSum + a,
    0,
  )

  const telegraphedTransactions = () => {
    if (transactions.length === 0) return '$0'
    if (transactions.length === 1)
      return `$${transactions[0]} as one transaction.`
    const out = transactions
      .slice(0, -1)
      .map((x) => '$' + x.toString())
      .join(', ')

    return out + ` and then $${transactions.findLast(() => true)}`
  }

  const handleAdjustTargetAmount = (addedAmount: number) => {
    setTargetAmount(currentAmount + addedAmount)
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.dismissButton} onPress={handleDismiss}>
        <AntDesignIcon name="close" size={16} color="gray" />
      </Pressable>
      <Text style={styles.refillTitle}>Refill {cardName}</Text>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loadingSpinner} />
      ) : (
        <>
          <View className="flex flex-row justify-between align-center pt-5">
            <MoneyDisplay
              amount={currentAmount}
              dollarColor={STANDARD_LIGHT_GRAY}
              shrinkCents
            />
            <FontAwesome
              name="long-arrow-right"
              size={32}
              color={STANDARD_LIGHT_GRAY}
              style={styles.transactionArrow}
            />
            <MoneyDisplay
              amount={currentAmount + calculatedAddition()}
              centColor="black"
              shrinkCents
            />
          </View>
          <RefillPullableDisplay
            currentAmount={currentAmount}
            initialAddedAmount={calculatedAddition()}
            handleUpdatedAmount={handleAdjustTargetAmount}
          />
          <View style={styles.billingSummaryContainer}>
            <Text style={styles.billingSummaryText}>
              You will be billed {telegraphedTransactions()}
            </Text>
            <Button
              text={`Pay $${calculatedAddition()}`}
              onPress={() => handleRefill(transactions)}
              buttonColor={STANDARD_CHARLIE_GREEN}
              pressedButtonColor="#336B3C"
              disabledButtonColor="#65B772"
              disabled={calculatedAddition() === 0}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 19,
    paddingHorizontal: 16,
  },
  dismissButton: {
    borderRadius: 50,
    backgroundColor: '#EBEBEB',
    position: 'absolute',
    top: 13,
    right: 13,
    padding: 6,
  },
  refillTitle: { fontFamily: 'LatoSemibold', fontSize: 16 },
  transactionArrow: { paddingHorizontal: 12, paddingVertical: 16 },
  billingSummaryContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  billingSummaryText: {
    fontFamily: 'LatoRegular',
    fontSize: 12,
    color: '#878787',
    alignSelf: 'center',
    paddingBottom: 8,
  },
  loadingSpinner: { position: 'absolute', top: '50%' },
})
