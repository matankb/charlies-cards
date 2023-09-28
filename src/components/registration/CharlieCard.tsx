import { View, Text } from 'react-native'
import { FC } from 'react'
import { Button } from '../Button'
import { FormTextInput } from '../form/FormTextInput'
import { RegisterFlowTitle } from '../form/RegisterFlowTitle'

interface CharlieCardProps {
  onSubmit: () => void
  card: string
  setCard: (string) => void
  cardError: string
  setCardError: (string) => void
  cardName: string
  setCardName: (string) => void
  cardNameError: string
  setCardNameError: (string) => void
  handlePrevPage: () => void
}

export const CharlieCard: FC<CharlieCardProps> = ({
  onSubmit,
  card,
  setCard,
  cardError,
  setCardError,
  cardName,
  setCardName,
  cardNameError,
  setCardNameError,
  handlePrevPage,
}) => {
  const updateCard = (value: string) => {
    setCardError(undefined)
    setCard(value)
  }

  const updateCardName = (value: string) => {
    setCardNameError(undefined)
    setCardName(value)
  }

  const validateInputs = () => {
    if (card !== '' && cardName !== '') return true

    if (card === '') {
      setCardError('Please enter a card.')
    }

    if (cardName === '') {
      setCardNameError('Please enter a card name')
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
          title="Select a Card"
          handlePrevPage={handlePrevPage}
        />
        <Text className="text-gray-400">Enter your Charlie Card number.</Text>
        {/* TODO: switch this to fetch from website? Then combine into Card Name (Card Number) and one input */}
        <FormTextInput
          title="Charlie Card:"
          value={card}
          placeholder="X-XXXXXXXXXX"
          onChange={updateCard}
          error={cardError}
        />
        <FormTextInput
          title="Card Name:"
          value={cardName}
          placeholder="Charlie's Card"
          onChange={updateCardName}
          error={cardNameError}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button onPress={trySubmit} text="Submit" />
      </View>
    </View>
  )
}
