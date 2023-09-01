import { FC } from 'react'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

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
          color={pressed ? '#E4E4E4' : 'white'}
        />
      )}
    </Pressable>
  )
}
