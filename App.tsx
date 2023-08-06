import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato'
import { setCustomText } from 'react-native-global-props'

import useRegistered from './src/hooks/registered-provider'
import { StackNavigator } from './src/components/navigators/StackNavigator'
import useAppReadyChecks from './src/hooks/app-ready'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
  })
  setCustomText({
    style: {
      fontFamily: 'Lato_400Regular',
    },
  })

  const [isRegistered, registeredStatusLoading] = useRegistered()
  const [appIsReady, onLayoutRootView] = useAppReadyChecks([
    fontsLoaded,
    !registeredStatusLoading,
  ])

  if (!appIsReady) {
    return null
  }

  return (
    <>
      <View className="h-full" onLayout={onLayoutRootView}>
        <NavigationContainer>
          <StackNavigator isRegistered={isRegistered} />
        </NavigationContainer>
      </View>
      <StatusBar style="auto" />
    </>
  )
}
