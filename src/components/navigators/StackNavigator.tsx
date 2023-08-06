import { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RegistrationPage } from '../../pages/Registration'
import { HomePage } from '../../pages/Home'

const Stack = createNativeStackNavigator()

interface StackNavigatorProps {
  isRegistered: boolean
}

export enum ScreenName {
  HOME = 'Home',
  REGISTER = 'Register',
}

export const StackNavigator: FC<StackNavigatorProps> = ({ isRegistered }) => {
  return (
    <Stack.Navigator
      initialRouteName={isRegistered ? ScreenName.HOME : ScreenName.REGISTER}
    >
      <Stack.Screen name={ScreenName.HOME} component={HomePage} />
      <Stack.Screen name={ScreenName.REGISTER} component={RegistrationPage} />
    </Stack.Navigator>
  )
}
