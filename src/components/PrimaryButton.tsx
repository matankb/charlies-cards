import { FC, useState } from 'react'
import { Pressable, Text } from 'react-native'

interface SubmitButtonProps {
  onSubmit: () => void
  text: string
  buttonColor?: string
  pressedButtonColor?: string
}

export const PrimaryButton: FC<SubmitButtonProps> = ({
  onSubmit,
  text,
  buttonColor = '#155C96',
  pressedButtonColor = '#124B7A',
}) => {
  const [pressed, setPressed] = useState(false)

  return (
    <Pressable
      className="w-full rounded-lg p-2"
      onPress={onSubmit}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ backgroundColor: pressed ? pressedButtonColor : buttonColor }}
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
