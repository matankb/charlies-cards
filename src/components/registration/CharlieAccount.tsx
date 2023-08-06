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
    <View className="p-6 items-center">
      <Text className="text-4xl">Register</Text>
      <View
        className="my-4"
        style={{
          borderBottomColor: '#D2D2D2',
          borderBottomWidth: 1,
          width: '90%',
        }}
      />
      <Text className="text-gray-400">Welcome!</Text>
      <Text className="text-gray-400">Enter your MyCharlie credentials.</Text>

      <Text className="mt-12 text-2xl mb-1">MyCharlie Username:</Text>
      <TextInput
        className="bg-stone-200 rounded-2xl px-4 py-2 w-full"
        placeholder="Charlie"
        value={userNameField.field.value}
        onChangeText={userNameField.field.onChange}
      ></TextInput>

      <Text className="mt-6 text-2xl mb-1">MyCharlie Password:</Text>
      <TextInput
        className="bg-stone-200 rounded-2xl px-4 py-2 w-full"
        secureTextEntry={true}
        value={passwordField.field.value}
        onChangeText={passwordField.field.onChange}
      ></TextInput>

      <Text className="text-gray-400 mt-8">
        Do not reuse a password from another service. If you currently are, then
        change your password before entering it here.
      </Text>
      <Text className="text-gray-400 mt-8">
        If you don't have a MyCharlie account, click here to create one.
      </Text>
    </View>
  )
}
