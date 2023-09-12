import { FC } from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { STANDARD_PRESSED_WHITE } from '../utils/constants'

interface BackButtonProps {
  onPress: () => void
}

export const BackButton: FC<BackButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Ionicons
          name="chevron-back"
          size={32}
          color={pressed ? STANDARD_PRESSED_WHITE : 'white'}
        />
      )}
    </Pressable>
  )
}
