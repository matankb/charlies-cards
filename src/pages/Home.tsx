import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { BalanceDisplay } from '../components/home/BalanceDisplay'
import { TransactionDisplay } from '../components/home/TransactionDisplay'
import { PrimaryButton } from '../components/PrimaryButton'
import React, { useEffect, useState } from 'react'
import { RefillModal } from '../components/home/refill/RefillModal'
import { Transaction, getTransactionHistory } from '../controllers/card'
import { CharlieCard, getCardInfo } from '../controllers/account'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const HomePage = () => {
  const [loading, setLoading] = useState(true) // TODO: make work
  const [showModal, setShowModal] = useState(false)

  const [transactions, setTransactions] = useState<Transaction[]>([]) // TODO: switch to null once loading is implemented
  const [card, setCard] = useState<CharlieCard>(null)
  const [cardAmount, setCardAmount] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      setTransactions(await getTransactionHistory())
      setCard(await getCardInfo())
      // TODO: setCardAmount
      setCardAmount(20.32)

      setLoading(false)
    }

    setShowModal(false)
    fetchData()
  }, [])

  /* CALLBACK FUNCTIONS */

  const showRefill = () => {
    setShowModal(true)
  }

  const handleSubmitRefill = () => {
    setShowModal(false)
  }

  const handleDismiss = () => {
    setShowModal(false)
  }

  /* RENDERING FUNCTIONS */

  const InternalModal = () => {
    return (
      <>
        <Modal
          visible={showModal}
          onRequestClose={handleSubmitRefill}
          transparent
          animationType="slide"
          onDismiss={handleDismiss}
        >
          <TouchableWithoutFeedback onPress={handleDismiss}>
            <View style={styles.modalDismissBackground} />
          </TouchableWithoutFeedback>
          <RefillModal
            handleDismiss={handleDismiss}
            cardName={card.name}
            currentAmount={cardAmount}
          />
        </Modal>
        <View style={styles.modalBackground} />
      </>
    )
  }

  return (
    <>
      <View
        className="bg-blue p-7 flex flex-row justify-between"
        style={{ height: '33%' }}
      >
        <Text style={styles.walletTitleText}>Cardlie Wallet</Text>
        <Pressable>
          <Entypo name="cog" size={25} color="white" />
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
        <PrimaryButton onSubmit={showRefill} text="Refill" disabled={loading} />
      </View>
      {loading && <LoadingSpinner />}
      {showModal && <InternalModal />}
    </>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 2,
  },
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
  modalDismissBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})
