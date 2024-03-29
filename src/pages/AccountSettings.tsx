import { StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import { FormTextInput } from '../components/form/FormTextInput'
import { useEffect, useState } from 'react'
import {
  CharlieCard,
  getCardInfo,
  setMyCharlieCredentials,
} from '../controllers/account'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const AccountSettingsPage = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const [userName, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [cardNumber, setCardNumber] = useState(null)
  const [cardName, setCardName] = useState(null)

  const [userError, setUserError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [cardNumberError, setCardNumberError] = useState(null)
  const [cardNameError, setCardNameError] = useState(null)

  const [card, setCard] = useState<CharlieCard>(null)

  async function load() {
    const card = await getCardInfo()

    setCard(card)
    setUsername(card.username)
    setPassword(card.password)
    setCardNumber(card.number)
    setCardName(card.name)

    setLoading(false)
  }

  useEffect(() => {
    load().catch((error) => console.log(error))
  }, [])

  const disableSave = () => {
    return (
      !card ||
      (card.username === userName && card.password === password) ||
      card.number === cardNumber ||
      card.name === cardName
    )
  }

  const validateInputs = () => {
    if (userName === '') {
      setUserError('Please provide a username')
    }

    if (password === '') {
      setPasswordError('Please provide a password')
    }

    if (cardNumber === '') {
      setCardNumberError('Please provide a card number')
    }

    if (cardName === '') {
      setCardNameError('Please provide a card name')
    }

    return !(userName === '' || password === '')
  }

  const saveConfiguration = () => {
    if (!validateInputs()) return

    setPasswordError(null)
    setUserError(null)

    setMyCharlieCredentials(userName, password, card.number, card.name)
    setLoading(true)
    load().catch((error) => console.log(error))
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Account Settings</Text>
      </View>
      {card && (
        <View style={styles.contentContainer}>
          <FormTextInput
            title="MyCharlie Username:"
            value={userName}
            onChange={setUsername}
            error={userError}
          />
          <FormTextInput
            title="MyCharlie Password:"
            value={password}
            isSecure
            onChange={setPassword}
            error={passwordError}
          />
          <FormTextInput
            title="MyCharlie Card Number:"
            value={cardNumber}
            onChange={setCardNumber}
            error={cardNumberError}
          />
          <FormTextInput
            title="MyCharlie Card Name:"
            value={cardName}
            isSecure
            onChange={setCardName}
            error={cardNameError}
          />
        </View>
      )}
      {loading && <LoadingSpinner />}
      <View style={styles.submitContainer}>
        <Button
          onPress={saveConfiguration}
          disabled={disableSave()}
          text="Save Configuration"
        />
      </View>
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
  contentContainer: {
    gap: 10,
    padding: 26,
    backgroundColor: 'white',
    flex: 1,
  },
  submitContainer: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
