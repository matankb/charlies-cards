import { View, Text } from 'react-native'
import { FC } from 'react'
import { PrimaryButton } from '../PrimaryButton'
import { FormTextInput } from '../form/FormTextInput'
import { RegisterFlowTitle } from '../form/RegisterFlowTitle'

interface CharlieCardProps {
  onSubmit: () => void
  card: string
  setCard: (string) => void
  error: string
  setError: (string) => void
  handlePrevPage: () => void
}

export const CharlieCard: FC<CharlieCardProps> = ({
  onSubmit,
  card,
  setCard,
  error,
  setError,
  handlePrevPage,
}) => {
  const updateCard = (value: string) => {
    setError(undefined)
    setCard(value)
  }

  const validateInputs = () => {
    if (card !== '') return true

    if (card === '') {
      setError('Please enter a card.')
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
        <FormTextInput
          title="Charlie Card:"
          value={card}
          placeholder="X-XXXXXXXXXX"
          onChange={updateCard}
          error={error}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <PrimaryButton onSubmit={trySubmit} text="Submit" />
      </View>
    </View>
  )
}
