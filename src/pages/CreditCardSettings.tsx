import { StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import { FormTextInput } from '../components/form/FormTextInput'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'
import {
  CreditCardModel,
  getCreditCard,
  setCreditCard,
} from '../controllers/settings'

export const CreditCardSettingsPage = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const [card, setCard] = useState<CreditCardModel>(null)
  const [oldCard, setOldCard] = useState<CreditCardModel>(null)

  const [cardNumberError, setCardNumberError] = useState(null)
  const [cardHolderError, setCardHolderError] = useState(null)
  const [cvvError, setCvvError] = useState(null)
  const [expirationError, setExpirationError] = useState(null)

  async function load() {
    const card = await getCreditCard()

    setCard(card)
    setOldCard(card)

    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const disableSave = () => {
    return (
      !card ||
      !oldCard ||
      (card.cardHolder === oldCard.cardHolder &&
        card.cardNumber === oldCard.cardNumber &&
        card.cvv === oldCard.cvv &&
        card.expiration === oldCard.expiration)
    )
  }

  const updateCardNumber = (value: string) => {
    setCardNumberError(null)
    setCard({ ...card, cardNumber: value })
  }

  const updateCardHolder = (value: string) => {
    setCardHolderError(null)
    setCard({ ...card, cardHolder: value })
  }

  const updateCvv = (value: string) => {
    setCvvError(null)
    setCard({ ...card, cvv: value })
  }

  const updateExpiration = (value: string) => {
    setExpirationError(null)
    setCard({ ...card, expiration: value })
  }

  const validateInputs = () => {
    if (
      card.cardHolder !== '' &&
      card.cardNumber !== '' &&
      card.cvv !== '' &&
      card.expiration !== ''
    ) {
      return true
    }

    if (card.cardHolder === '') {
      setCardHolderError('Please enter a card holder.')
    }

    if (card.cardNumber === '') {
      setCardNumberError('Please enter a card number.')
    }

    if (card.cvv === '') {
      setCvvError('Please enter a cvv.')
    }

    if (card.expiration === '') {
      setExpirationError('Please enter a card expiration.')
    }

    return false
  }

  const saveConfiguration = () => {
    if (!validateInputs()) return

    setCardHolderError(null)
    setCardNumberError(null)
    setCvvError(null)
    setExpirationError(null)

    setCreditCard(card)
    setLoading(true)
    load()
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Credit Card Settings</Text>
      </View>
      {card && (
        <View style={styles.contentContainer}>
          <FormTextInput
            title="Card Number:"
            value={card.cardNumber}
            placeholder="5555555555554444"
            onChange={updateCardNumber}
            error={cardNumberError}
          />
          <FormTextInput
            title="Card Holder:"
            value={card.cardHolder}
            placeholder="Charlie C. Card"
            onChange={updateCardHolder}
            error={cardHolderError}
          />
          <View style={styles.cvvContainer}>
            <FormTextInput
              title="CVV:"
              value={card.cvv}
              isSecure
              onChange={updateCvv}
              error={cvvError}
              width={80}
            />
            <FormTextInput
              title="Expiration:"
              value={card.expiration}
              placeholder="01/25"
              onChange={updateExpiration}
              error={expirationError}
              width={125}
            />
          </View>
        </View>
      )}
      {loading && <LoadingSpinner />}
      <View style={styles.submitContainer}>
        <Button
          onPress={saveConfiguration}
          disabled={disableSave()}
          text="Save Configuration"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 26,
    flexDirection: 'row',
    backgroundColor: '#155C96',
    gap: 8,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'LatoSemibold',
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },
  contentContainer: {
    gap: 10,
    padding: 26,
    backgroundColor: 'white',
    flex: 1,
  },
  submitContainer: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cvvContainer: {
    flexDirection: 'row',
    gap: 50,
  },
})
