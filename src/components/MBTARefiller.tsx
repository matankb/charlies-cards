import { FC, useEffect, useRef, useState } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

import { refillInjectableJavascript } from '../controllers/mbta'
import { View } from 'react-native'

interface MBTARefillerProps {
  amount: number
  callback: () => void
  onError: (error: string) => void
}

export const MbtaRefiller: FC<MBTARefillerProps> = ({
  amount,
  callback,
  onError,
}) => {
  const [webviewLoaded, setWebviewLoaded] = useState<boolean>(false)
  const webviewRef = useRef<WebView>(null)

  const injectJavascript = async () => {
    const injectableJavascript = await refillInjectableJavascript(amount)
    webviewRef.current.injectJavaScript(injectableJavascript)
  }

  useEffect(() => {
    if (webviewLoaded) {
      injectJavascript()
    }
  }, [webviewLoaded])

  const handleMessage = (event: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(event.nativeEvent.data)

    if (type === 'callback') {
      callback()
    } else if (type === 'error') {
      onError(data)
    }
  }

  return (
    <View>
      <WebView
        source={{
          uri: 'https://charliecard.mbta.com/CharlieCardWebProgram/pages/charlieCardCenter.jsf',
        }}
        ref={webviewRef}
        onMessage={handleMessage}
        onLoadEnd={() => setWebviewLoaded(true)}
        style={{ height: 0, width: 0 }}
      />
    </View>
  )
}
