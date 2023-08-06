import { useCallback, useEffect, useState } from 'react'
import { getCreditCard } from '../controllers/settings'
import * as SplashScreen from 'expo-splash-screen'

export default function useRegistered(): [boolean, boolean, () => void] {
  const [appIsReady, setAppIsReady] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    async function prepare() {
      const card = await getCreditCard()
      if (card !== null && typeof card !== 'undefined') {
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

  return [appIsReady, isRegistered, onLayoutRootView]
}
