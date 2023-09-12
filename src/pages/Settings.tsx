import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { ScreenName } from '../components/navigators/ScreenName'
import { BackButton } from '../components/BackButton'
import { STANDARD_PRESSED_WHITE } from '../utils/constants'

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
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.buttonContainer}>
        <InternalButton
          text="Account Settings"
          icon="user"
          onPress={() => navigation.navigate(ScreenName.SETTINGS_ACCOUNT)}
        />
        <Pressable
          style={({ pressed }) => {
            return [styles.button, pressed && styles.pressedButton]
          }}
          onPress={() => navigation.navigate(ScreenName.SETTINGS_REFILL)}
        >
          <Entypo name="cycle" size={32} color="black" />
          <Text style={styles.buttonText}>Refill Configuration</Text>
        </Pressable>
        <InternalButton
          text="Credit Card"
          icon="creditcard"
          onPress={() => navigation.navigate(ScreenName.SETTINGS_CREDIT_CARD)}
        />
        <InternalButton
          text="FAQ"
          icon="questioncircleo"
          onPress={() => navigation.navigate(ScreenName.SETTINGS_FAQ)}
        />
      </View>
      <Text style={styles.versionText}>v16.8.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#155C96',
    paddingVertical: 26,
  },
  headerContainer: {
    paddingTop: 4,
    paddingHorizontal: 8,
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
  buttonContainer: {
    padding: 26,
    gap: 24,
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
    backgroundColor: STANDARD_PRESSED_WHITE,
  },
  buttonText: {
    fontFamily: 'LatoSemibold',
    fontSize: 20,
  },
  versionText: {
    fontFamily: 'LatoSemibold',
    fontSize: 16,
    color: '#D4D4D4',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 18,
  },
})
