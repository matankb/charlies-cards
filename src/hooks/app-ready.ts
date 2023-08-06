import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'

export default function useAppReadyChecks(
  checks: boolean[],
): [boolean, () => void] {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    const allChecksPassed = checks.every((check) => check)

    if (allChecksPassed) {
      setAppIsReady(true)
    }
  }, [checks])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  return [appIsReady, onLayoutRootView]
}
