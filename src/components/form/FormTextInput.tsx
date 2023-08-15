import { FC } from 'react'
import { TextInput, Text, View } from 'react-native'

interface TextInputProps {
  title: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  isSecure?: boolean
  error?: string
  width?: number
}

export const FormTextInput: FC<TextInputProps> = ({
  title,
  value,
  placeholder,
  onChange,
  isSecure,
  error,
  width,
}) => {
  return (
    <View style={{ width: width || '100%', alignItems: 'center' }}>
      <Text className="text-2xl my-1">{title}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={isSecure}
        style={{
          borderRadius: 15,
          backgroundColor: '#EBEBEB',
          width: '100%',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderWidth: 2,
          borderColor: error ? '#D50606' : '#EBEBEB',
          fontSize: 16,
          marginTop: 12,
          marginBottom: 4,
        }}
      />
      {error && <Text style={{ color: '#D50606' }}>{error}</Text>}
    </View>
  )
}
