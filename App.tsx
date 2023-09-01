import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import useRegistered from './src/hooks/registered-provider'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/components/navigators/PageProvider'
import useAddFonts from './src/hooks/load-fonts'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, isRegistered, setRegisteredComplete, onLayoutRootView] =
    useRegistered()

  const fontsLoaded = useAddFonts()

  if (!appIsReady || !fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync()

  return (
    <>
      <View className="h-full" onLayout={onLayoutRootView}>
        <NavigationContainer>
          <StackNavigator
            isRegistered={isRegistered}
            setRegisteredComplete={setRegisteredComplete}
          />
        </NavigationContainer>
        {/* <View style={{ position: 'absolute', bottom: 0 }}>
          <Button title="Clear store" onPress={clear} />
        </View> */}
        {/* Above view and button are temporary - allows dev deletion of async storage */}
      </View>
      <StatusBar style="auto" />
    </>
  )
}
