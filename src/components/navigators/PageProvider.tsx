import { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenName } from './ScreenName'
import { HomePage } from '../../pages/Home'
import { RegistrationPage } from '../../pages/Registration'

const Stack = createNativeStackNavigator()

interface StackNavigatorProps {
  isRegistered: boolean
  setRegisteredComplete: () => void
}

export const StackNavigator: FC<StackNavigatorProps> = ({
  isRegistered,
  setRegisteredComplete,
}) => {
  return (
    <>
      {isRegistered ? (
        <Stack.Navigator
          initialRouteName={ScreenName.HOME}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={ScreenName.HOME} component={HomePage} />
        </Stack.Navigator>
      ) : (
        <RegistrationPage setRegisteredComplete={setRegisteredComplete} />
      )}
    </>
  )
}
