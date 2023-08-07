import { View, Text, TextInput } from 'react-native'
import { FC } from 'react'
import { Control, FieldValues, useController } from 'react-hook-form'

interface CharlieAccountProps {
  control: Control<FieldValues, unknown>
}

export const CharlieAccount: FC<CharlieAccountProps> = ({ control }) => {
  const userNameField = useController({
    control,
    defaultValue: '',
    name: 'charlieUsername',
  })

  const passwordField = useController({
    control,
    defaultValue: '',
    name: 'charliePassword',
  })

  return (
    <View className="px-6 items-center">
      <Text className="text-gray-400">Welcome!</Text>
      <Text className="text-gray-400">Enter your MyCharlie credentials.</Text>

      <Text className="mt-12 text-2xl mb-1">MyCharlie Username:</Text>
      <TextInput
        className="border bg-stone-200 border-gray-300 rounded-lg w-full p-2.5"
        placeholder="charlie@card.com"
        value={userNameField.field.value}
        onChangeText={userNameField.field.onChange}
      ></TextInput>

      <Text className="mt-6 text-2xl mb-1">MyCharlie Password:</Text>
      <TextInput
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        secureTextEntry={true}
        value={passwordField.field.value}
        onChangeText={passwordField.field.onChange}
      ></TextInput>

      <Text className="text-gray-400 mt-8">
        Do not reuse a password from another service. If you currently are, then
        change your password before entering it here.
      </Text>
      <Text className="text-gray-400 mt-8">
        If you don’t have a MyCharlie account, click here to create one.
      </Text>
    </View>
  )
}
