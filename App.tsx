import { StatusBar } from 'expo-status-bar'
import { Button, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import useRegistered from './src/hooks/registered-provider'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/components/navigators/PageProvider'
import { clear } from './src/controllers/settings'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, isRegistered, setRegisteredComplete, onLayoutRootView] =
    useRegistered()

  if (!appIsReady) {
    return null
  }

  return (
    <>
      <View className="h-full" onLayout={onLayoutRootView}>
        <NavigationContainer>
          <StackNavigator
            isRegistered={isRegistered}
            setRegisteredComplete={setRegisteredComplete}
          />
        </NavigationContainer>
        <Button title="Clear store" onPress={clear} />
        {/* Above line is temporary - allows dev deletion of async storage */}
      </View>
      <StatusBar style="auto" />
    </>
  )
}
