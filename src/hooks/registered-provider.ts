import { useCallback, useEffect, useState } from 'react'
import { getIsRegistered } from '../controllers/settings'
import * as SplashScreen from 'expo-splash-screen'

export default function useRegistered(): [
  boolean,
  boolean,
  () => void,
  () => void,
] {
  const [appIsReady, setAppIsReady] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    async function prepare() {
      if (await getIsRegistered()) {
        setIsRegistered(true)
      }

      setAppIsReady(true)
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  return [
    appIsReady,
    isRegistered,
    () => setIsRegistered(true),
    onLayoutRootView,
  ]
}
