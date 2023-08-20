import { FC } from 'react'
import { Pressable, Text } from 'react-native'

interface SubmitButtonProps {
  onSubmit: () => void
  text: string
}

export const PrimaryButton: FC<SubmitButtonProps> = ({ onSubmit, text }) => {
  return (
    <Pressable className="w-full bg-blue rounded-lg p-2" onPress={onSubmit}>
      <Text
        className="text-white text-center"
        style={{ color: 'white', fontFamily: 'LatoBold', fontSize: 22 }}
      >
        {text}
      </Text>
    </Pressable>
  )
}
