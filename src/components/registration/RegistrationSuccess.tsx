import { Text } from 'react-native'
import { setIsRegistered } from '../../controllers/settings'
import { FC } from 'react'
import { Button } from '../Button'

interface RegistrationSuccessProps {
  handleSubmit: () => void
}

export const RegistrationSuccess: FC<RegistrationSuccessProps> = ({
  handleSubmit,
}) => {
  setIsRegistered(true)

  return (
    <>
      <Text>Success registering</Text>
      <Button onPress={handleSubmit} text="Use App" />
    </>
  )
}
