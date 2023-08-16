import { FC } from 'react'
import { Pressable, Text } from 'react-native'

interface SubmitButtonProps {
  onSubmit: () => void
  text: string
}

export const SubmitButton: FC<SubmitButtonProps> = ({ onSubmit, text }) => {
  return (
    <Pressable
      className="w-full bg-blue rounded-lg p-2 mt-4"
      onPress={onSubmit}
    >
      <Text className="text-white text-center" style={{ color: 'white' }}>
        {text}
      </Text>
    </Pressable>
  )
}
