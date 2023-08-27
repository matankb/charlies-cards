import { StyleSheet, Text, View } from 'react-native'

export const CreditCardSettingsPage = () => {
  return (
    <View style={styles.container}>
      <Text>Credit Card Settings</Text>
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
})
