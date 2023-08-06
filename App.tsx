import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import useRegistered from './src/hooks/registered-provider'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/components/navigators/StackNavigator'
import useAppReadyChecks from './src/hooks/app-ready'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isRegistered, loading] = useRegistered()
  const [appIsReady, onLayoutRootView] = useAppReadyChecks([loading])

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
