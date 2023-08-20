import { FC, useState } from 'react'
import { Pressable, Text } from 'react-native'

interface SubmitButtonProps {
  onSubmit: () => void
  text: string
}

export const PrimaryButton: FC<SubmitButtonProps> = ({ onSubmit, text }) => {
  const [pressed, setPressed] = useState(false)

  return (
    <Pressable
      className="w-full rounded-lg p-2"
      onPress={onSubmit}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ backgroundColor: pressed ? '#124B7A' : '#155C96' }}
    >
      <Text
        className="text-white text-center"
        style={{ color: 'white', fontFamily: 'LatoBold', fontSize: 22 }}
      >
        {text}
      </Text>
    </Pressable>
  )
}
