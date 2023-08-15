import { View, Text } from 'react-native'
import { FC } from 'react'
import { SubmitButton } from '../form/SubmitButton'
import { FormTextInput } from '../form/FormTextInput'
import { RegisterFlowTitle } from '../form/RegisterFlowTitle'

interface CharlieAccountProps {
  onSubmit: () => void
  userName: string
  setUserName: (string) => void
  userError: string
  setUserError: (string) => void
  password: string
  setPassword: (string) => void
  passwordError: string
  setPasswordError: (string) => void
}

export const CharlieAccount: FC<CharlieAccountProps> = ({
  onSubmit,
  userName,
  setUserName,
  userError,
  setUserError,
  password,
  setPassword,
  passwordError,
  setPasswordError,
}) => {
  const updateUserName = (value: string) => {
    // TODO: dont remove error unless input is now valid (but also dont show error unless submit has been attempted already)
    setUserError(undefined)
    setUserName(value)
  }

  const updatePassword = (value: string) => {
    setPasswordError(undefined)
    setPassword(value)
  }

  const validateInputs = () => {
    if (userName !== '' && password !== '') return true

    if (userName === '') {
      setUserError('Please enter an email.')
    }

    if (password === '') {
      setPasswordError('Please enter a password.')
    }

    return false
  }

  const trySubmit = () => {
    if (validateInputs()) {
      onSubmit()
    }
  }

  return (
    <View className="h-full flex justify-between pb-2">
      <View className="px-6 items-center">
        <RegisterFlowTitle title="Register" />
        <Text className="text-gray-400">Welcome!</Text>
        <Text className="text-gray-400 mb-7">
          Enter your MyCharlie credentials.
        </Text>

        <FormTextInput
          title="MyCharlie Username:"
          value={userName}
          placeholder="charlie@card.com"
          onChange={updateUserName}
          error={userError}
        />
        <FormTextInput
          title="MyCharlie Password:"
          value={password}
          onChange={updatePassword}
          isSecure
          error={passwordError}
        />

        <Text className="mt-8" style={{ color: '#686868' }}>
          Do not reuse a password from another service. If you currently are,
          then change your password before entering it here.
        </Text>
        <Text className="mt-8" style={{ color: '#686868' }}>
          If you don’t have a MyCharlie account, click here to create one.
        </Text>
      </View>
      <SubmitButton onSubmit={trySubmit} text="Submit" />
    </View>
  )
}
