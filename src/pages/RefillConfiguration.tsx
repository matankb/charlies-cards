import { StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'

export const RefillConfigurationPage = ({ navigation }) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Refill Configuration</Text>
      </View>
      <View></View>
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
})
