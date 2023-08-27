import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { ScreenName } from '../components/navigators/ScreenName'

export const SettingsPage = ({ navigation }) => {
  const InternalButton = ({ text, icon, onPress }) => {
    return (
      <Pressable
        style={({ pressed }) => {
          return [styles.button, pressed && styles.pressedButton]
        }}
        onPress={onPress}
      >
        <AntDesign name={icon} size={32} color="black" />
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <InternalButton
        text="Account Settings"
        icon="user"
        onPress={() => navigation.navigate(ScreenName.SETTINGS_ACCOUNT)}
      />
      <InternalButton
        text="Credit Cards"
        icon="creditcard"
        onPress={() => navigation.navigate(ScreenName.SETTINGS_CREDIT_CARD)}
      />
      <InternalButton
        text="FAQ"
        icon="questioncircleo"
        onPress={() => navigation.navigate(ScreenName.SETTINGS_FAQ)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#155C96',
    padding: 26,
    gap: 24,
  },
  headerContainer: {
    paddingTop: 4,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'LatoSemibold',
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 24,
    flexDirection: 'row',
    padding: 20,
    gap: 24,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowYOffset: 8,
    shadowRadius: 16,
  },
  pressedButton: {
    backgroundColor: '#E4E4E4',
  },
  buttonText: {
    fontFamily: 'LatoSemibold',
    fontSize: 20,
  },
})
