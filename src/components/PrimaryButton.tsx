import { FC, useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

interface SubmitButtonProps {
  onSubmit: () => void
  text: string
  disabled?: boolean
  buttonColor?: string
  pressedButtonColor?: string
  disabledButtonColor?: string
}

export const PrimaryButton: FC<SubmitButtonProps> = ({
  onSubmit,
  text,
  disabled = false,
  buttonColor = '#155C96',
  pressedButtonColor = '#124B7A',
  disabledButtonColor = '#457CAA',
}) => {
  const [pressed, setPressed] = useState(false)

  return (
    <Pressable
      className="w-full rounded-lg p-2"
      disabled={disabled}
      onPress={onSubmit}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        backgroundColor: disabled
          ? disabledButtonColor
          : pressed
          ? pressedButtonColor
          : buttonColor,
      }}
    >
      <Text className="text-white text-center" style={styles.text}>
        {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: { color: 'white', fontFamily: 'LatoBold', fontSize: 22 },
})
