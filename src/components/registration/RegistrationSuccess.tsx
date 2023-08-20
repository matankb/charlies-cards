import { Text } from 'react-native'
import { setIsRegistered } from '../../controllers/settings'
import { FC } from 'react'
import { PrimaryButton } from '../PrimaryButton'

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
      <PrimaryButton onSubmit={handleSubmit} text="Use App" />
    </>
  )
}
