import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { BalanceDisplay } from '../components/home/BalanceDisplay'
import { TransactionDisplay } from '../components/home/TransactionDisplay'
import { Button } from '../components/Button'
import React, { useEffect, useState } from 'react'
import {
  Transaction,
  addTransaction,
  getCardValue,
  getTransactionHistory,
} from '../controllers/card'
import { CharlieCard, getCardInfo } from '../controllers/account'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ScreenName } from '../components/navigators/ScreenName'
import { STANDARD_PRESSED_WHITE } from '../utils/constants'
import { ModalWrapper } from '../components/home/refill/ModalWrapper'
import { MbtaRefiller } from '../components/MBTARefiller'

export const HomePage = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [refilling, setRefilling] = useState(false)
  const [refillAmount, setRefillAmount] = useState<number>(null)

  const [transactions, setTransactions] = useState<Transaction[]>(null)
  const [card, setCard] = useState<CharlieCard>(null)
  const [cardAmount, setCardAmount] = useState(null)

  const fetchData = async () => {
    // fetch data from different sources in parallel
    const requests = [
      getTransactionHistory().then(setTransactions),
      getCardInfo().then(setCard),
      getCardValue().then(setCardAmount),
    ]

    return Promise.all(requests)
  }

  useEffect(() => {
    async function _fetchData() {
      setLoading(true)
      await fetchData()
      setLoading(false)
    }

    setShowModal(false)
    _fetchData().catch((error) => console.log(error))
  }, [])

  /* CALLBACK FUNCTIONS */

  const showRefill = () => {
    setShowModal(true)
  }

  const handleSubmitRefill = async (amounts: number[]) => {
    setRefillAmount(amounts[0])
    setRefilling(true)
  }

  const handleRefillComplete = async () => {
    addTransaction(refillAmount)
    setRefilling(false)
    setRefillAmount(null)
    setShowModal(false)
    fetchData()
  }

  const handleRefillError = async (error: string) => {
    setRefilling(false)
    Alert.alert('There was a problem refilling your card.', error)
  }

  const handleDismiss = () => {
    setShowModal(false)
  }

  const handleSettingsClick = () => {
    navigation.navigate(ScreenName.SETTINGS)
  }

  return (
    <>
      <View
        className="bg-blue p-7 flex flex-row justify-between"
        style={{ height: '33%' }}
      >
        <Text style={styles.walletTitleText}>Cardlie Wallet</Text>
        <Pressable onPress={handleSettingsClick}>
          {({ pressed }) => (
            <Entypo
              name="cog"
              size={25}
              color={pressed ? STANDARD_PRESSED_WHITE : 'white'}
            />
          )}
        </Pressable>
      </View>
      <View style={styles.container} className="w-full">
        <BalanceDisplay
          card={card}
          currentAmount={cardAmount}
          loading={loading}
        />
      </View>
      <ScrollView style={styles.transactionScrollableContainer}>
        {!loading &&
          transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <TransactionDisplay transaction={transaction} />
              {index < transactions.length - 1 && (
                <View
                  className="h-px my-4 mr-2"
                  style={styles.transactionContainer}
                ></View>
              )}
            </React.Fragment>
          ))}
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <Button onPress={showRefill} text="Refill" disabled={loading} />
      </View>
      {loading && <LoadingSpinner />}
      {showModal && (
        <ModalWrapper
          cardAmount={cardAmount}
          cardName={card.name}
          handleDismiss={handleDismiss}
          refilling={refilling}
          handleSubmitRefill={handleSubmitRefill}
          showModal={showModal}
        />
      )}
      {refilling && (
        <MbtaRefiller
          amount={refillAmount}
          callback={handleRefillComplete}
          onError={handleRefillError}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  walletTitleText: { fontFamily: 'Lato', fontSize: 20, color: 'white' },
  container: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    width: '100%',
    top: 70,
  },
  transactionScrollableContainer: {
    marginTop: 70,
    width: '90%',
    alignSelf: 'center',
  },
  transactionContainer: {
    backgroundColor: '#D9D9D9',
    width: '80%',
    alignSelf: 'flex-end',
  },
  submitButtonContainer: {
    padding: 16,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})
