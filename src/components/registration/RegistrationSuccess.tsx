import { Text } from 'react-native'
import { setIsRegistered } from '../../controllers/settings'

export const RegistrationSuccess = () => {
  setIsRegistered(true)

  return (
    <>
      <Text>Success registering</Text>
    </>
  )
}
