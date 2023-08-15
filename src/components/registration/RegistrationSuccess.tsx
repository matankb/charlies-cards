import { Text } from 'react-native'
import { setIsRegistered } from '../../controllers/settings'
import { FC } from 'react'
import { SubmitButton } from '../form/SubmitButton'

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
      <SubmitButton onSubmit={handleSubmit} text="Use App" />
    </>
  )
}
