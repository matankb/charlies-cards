import { View, Text, TextInput } from 'react-native'
import { FC } from 'react'
import { Control, FieldValues, useController } from 'react-hook-form'

interface CharlieCardProps {
  control: Control<FieldValues, unknown>
}

export const CharlieCard: FC<CharlieCardProps> = ({ control }) => {
  const cardField = useController({
    control,
    defaultValue: '',
    name: 'charlieCard',
    rules: { required: true },
  })

  return (
    <View className="px-6 items-center">
      <Text className="text-gray-400">Enter your Charlie Card number.</Text>

      <Text className="mt-12 text-2xl mb-1">Charlie Card:</Text>
      <TextInput
        className="border bg-amber-500 border-gray-300 rounded-lg w-full p-2.5"
        placeholder="X-XXXXXXXXXX"
        value={cardField.field.value}
        onChangeText={cardField.field.onChange}
      ></TextInput>
    </View>
  )
}
