import { View, Text } from 'react-native'
import { FC } from 'react'
import { Button } from '../Button'
import { FormTextInput } from '../form/FormTextInput'
import { CreditCardModel } from '../../controllers/settings'
import { RegisterFlowTitle } from '../form/RegisterFlowTitle'

interface CreditCardProps {
  onSubmit: () => void
  card: CreditCardModel
  setCard: (v: CreditCardModel) => void
  cardNumberError: string
  setCardNumberError: (v: string) => void
  cardHolderError: string
  setCardHolderError: (v: string) => void
  cvvError: string
  setCvvError: (v: string) => void
  expirationError: string
  setExpirationError: (v: string) => void
  handlePrevPage: () => void
}

export const CreditCard: FC<CreditCardProps> = ({
  onSubmit,
  card,
  setCard,
  cardNumberError,
  setCardNumberError,
  cardHolderError,
  setCardHolderError,
  cvvError,
  setCvvError,
  expirationError,
  setExpirationError,
  handlePrevPage,
}) => {
  const updateCardNumber = (value: string) => {
    setCardNumberError(undefined)
    setCard({ ...card, cardNumber: value })
  }

  const updateCardHolder = (value: string) => {
    setCardHolderError(undefined)
    setCard({ ...card, cardHolder: value })
  }

  const updateCvv = (value: string) => {
    setCvvError(undefined)
    setCard({ ...card, cvv: value })
  }

  const updateExpiration = (value: string) => {
    setExpirationError(undefined)
    setCard({ ...card, expiration: value })
  }

  const validateInputs = () => {
    if (
      card.cardHolder !== '' &&
      card.cardNumber !== '' &&
      card.cvv !== '' &&
      card.expiration !== ''
    )
      return true

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

  const trySubmit = () => {
    if (validateInputs()) {
      onSubmit()
    }
  }

  return (
    <View className="h-full flex justify-between pb-2">
      <View className="px-6 items-center">
        <RegisterFlowTitle
          title="Add a Credit Card"
          handlePrevPage={handlePrevPage}
        />
        <Text className="text-gray-400">
          Enter your Credit Card information.
        </Text>
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
        <View className="flex flex-row" style={{ gap: 50 }}>
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
        <Text className="text-gray-400 mt-8">
          This information is stored entirely on your phone, and all
          transactions will be done through your phone. Our server will never
          know your credit card information.
        </Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button onSubmit={trySubmit} text="Submit" />
      </View>
    </View>
  )
}
