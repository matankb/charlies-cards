import { StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'

export const FAQSettingsPage = ({ navigation }) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>FAQ</Text>
      </View>
      <Text style={styles.bodyText}>Coming soon. So stop asking.</Text>
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 26,
    flexDirection: 'row',
    backgroundColor: '#155C96',
    gap: 8,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'LatoSemibold',
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },
  bodyText: {
    padding: 24,
    fontFamily: 'LatoSemibold',
    fontSize: 24,
    alignSelf: 'center',
  },
})
