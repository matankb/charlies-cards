import { FC, useEffect, useRef, useState } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import {
  getStoredValueInjectableJavascript,
  refillInjectableJavascript,
} from "../controllers/mbta";
import { View } from "react-native";

export enum MbtaScraperCommand {
  GET_BALANCE,
  REFILL,
}

interface MbtaScraperProps {
  command: MbtaScraperCommand;
  data: any;
  callback: (data: any) => void;
  onError: (error: any) => void;
}

const injectedJavascriptMap = {
  [MbtaScraperCommand.GET_BALANCE]: getStoredValueInjectableJavascript,
  [MbtaScraperCommand.REFILL]: refillInjectableJavascript,
};

export const MbtaScraper: FC<MbtaScraperProps> = ({
  command,
  data,
  callback,
  onError,
}) => {
  const [webviewLoaded, setWebviewLoaded] = useState<boolean>(false);
  const webviewRef = useRef<WebView>(null);

  const injectJavascript = async () => {
    const injectableJavascriptGenerator = injectedJavascriptMap[command];
    const injectableJavascript = await injectableJavascriptGenerator(data);
    webviewRef.current.injectJavaScript(injectableJavascript);
  };

  useEffect(() => {
    if (webviewLoaded) {
      injectJavascript();
    }
  }, [webviewLoaded]);

  const handleMessage = (event: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);

    if (type === "callback") {
      callback(data);
    } else if (type === "error") {
      onError(data);
    }
  };

  return (
    <View>
      <WebView
        source={{
          uri: "https://charliecard.mbta.com/CharlieCardWebProgram/pages/charlieCardCenter.jsf",
        }}
        ref={webviewRef}
        onMessage={handleMessage}
        onLoadEnd={() => setWebviewLoaded(true)}
        style={{ height: 500, width: 500 }}
      />
    </View>
  );
};
