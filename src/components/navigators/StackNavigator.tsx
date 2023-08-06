import { FC } from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationPage } from "../../pages/Registration";

const Stack = createNativeStackNavigator();

interface StackNavigatorProps {
  isRegistered: boolean;
}

export enum ScreenName {
  HOME = "Home",
  REGISTER = "Register",
}

export const StackNavigator: FC<StackNavigatorProps> = (props) => {
  return (
    <Stack.Navigator>
      {props.isRegistered ? (
        <>
          <Stack.Screen name="Home" component={() => <Text>Text</Text>} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={() => <RegistrationPage />}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
