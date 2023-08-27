import { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenName } from './ScreenName'
import { HomePage } from '../../pages/Home'
import { RegistrationPage } from '../../pages/Registration'
import { SettingsPage } from '../../pages/Settings'
import { AccountSettingsPage } from '../../pages/AccountSettings'
import { FAQSettingsPage } from '../../pages/FAQSettings'
import { CreditCardSettingsPage } from '../../pages/CreditCardSettings'

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
          <Stack.Screen name={ScreenName.SETTINGS} component={SettingsPage} />
          <Stack.Screen
            name={ScreenName.SETTINGS_ACCOUNT}
            component={AccountSettingsPage}
          />
          <Stack.Screen
            name={ScreenName.SETTINGS_CREDIT_CARD}
            component={CreditCardSettingsPage}
          />
          <Stack.Screen
            name={ScreenName.SETTINGS_FAQ}
            component={FAQSettingsPage}
          />
        </Stack.Navigator>
      ) : (
        <RegistrationPage setRegisteredComplete={setRegisteredComplete} />
      )}
    </>
  )
}
