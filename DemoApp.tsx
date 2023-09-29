import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Notifications from 'expo-notifications';
import { registerPushNotifications } from "./src/controllers/notifications";

// TODO: potential problem is needing to reset the cookies - think about how to handle that... I mean it should be fine, actually, possibly.

export default function App() {
  // const [shouldGetBalance, setShouldGetBalance] = useState(false);
  // const [balance, setBalance] = useState(null);

  // const getBalanceCallback = (balance: number) => {
  //   setBalance(balance);
  //   setShouldGetBalance(false);
  // }

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerPushNotifications().then(console.log)
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          // await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  )

  // return (
  //   <View style={styles.container}>
  //     <StatusBar style="auto" />
  //     <Button title="Get Balance" onPress={() => setShouldGetBalance(true)} />
  //     {shouldGetBalance && <Text>Getting balance...</Text>}
  //     {balance !== null && <Text>Balance: {balance}</Text>}
  //     {shouldGetBalance && (
  //       <MbtaScraper
  //         command={MbtaScraperCommand.REFILL}
  //         data={5}
  //         callback={getBalanceCallback}
  //         onError={console.log}
  //       />
  //     )}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },
});
