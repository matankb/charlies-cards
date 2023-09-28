import { FC } from 'react'
import { Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { View } from 'react-native-animatable'
import { RefillModal } from './RefillModal'

interface ModalWrapperProps {
  showModal: boolean
  cardName: string
  cardAmount: number
  handleDismiss: () => void
  handleSubmitRefill: (amounts: number[]) => Promise<void>
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  showModal,
  cardName,
  cardAmount,
  handleDismiss,
  handleSubmitRefill,
}) => {
  return (
    <>
      <Modal
        visible={showModal}
        onRequestClose={handleDismiss}
        transparent
        animationType="slide"
        onDismiss={handleDismiss}
      >
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <View style={styles.modalDismissBackground} />
        </TouchableWithoutFeedback>
        <RefillModal
          handleDismiss={handleDismiss}
          handleRefill={handleSubmitRefill}
          cardName={cardName}
          currentAmount={cardAmount}
        />
      </Modal>
      <View style={styles.modalBackground} />
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
  modalDismissBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})
