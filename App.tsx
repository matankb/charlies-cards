import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { RegistrationPage } from "./src/pages/Registration";
import useRegistered from "./src/hooks/registered-provider";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/components/navigators/StackNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, isRegistered, onLayoutRootView] = useRegistered();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <View onLayout={onLayoutRootView}>
        <StackNavigator isRegistered={isRegistered} />
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
