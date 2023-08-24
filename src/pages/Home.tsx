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
import React, { useState } from 'react'
import { RefillModal } from '../components/home/refill/RefillModal'

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

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false)

  // TODO: extract from actual sources
  const history = [
    {
      id: 2,
      amount: 50,
      date: new Date(),
    },
    {
      id: 1,
      amount: 40,
      date: new Date(),
    },
    {
      id: 3,
      amount: 700,
      date: new Date(),
    },
  ]
  const cardName = "Jacob's card"
  const cardNumber = '05-038471732832'
  const currentAmount = 20.32
  const nextTransactions = [25, 5]

  const showRefill = () => {
    setShowModal(true)
  }

  const handleSubmitRefill = () => {
    setShowModal(false)
  }

  const handleDismiss = () => {
    setShowModal(false)
  }

  return (
    <>
      {showModal && <View style={styles.modalBackground} />}
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
          cardName={cardName}
          cardNumber={cardNumber}
          currentAmount={currentAmount}
        />
      </View>
      <ScrollView style={styles.transactionScrollableContainer}>
        {history.map((transaction, index) => (
          <React.Fragment key={transaction.id}>
            <TransactionDisplay transaction={transaction} />
            {index < history.length - 1 && (
              <View
                className="h-px my-4 mr-2"
                style={styles.transactionContainer}
              ></View>
            )}
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <PrimaryButton onSubmit={showRefill} text="Refill" />
      </View>
      {showModal && (
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
            cardName={cardName}
            currentAmount={currentAmount}
            refillTransactions={nextTransactions}
          />
        </Modal>
      )}
    </>
  )
}
