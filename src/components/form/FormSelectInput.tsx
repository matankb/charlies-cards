import { FC, useState } from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

interface SelectInputProps {
  title: string
  options: string[]
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
}

export const FormSelectInput: FC<SelectInputProps> = ({
  title,
  value,
  options,
  onChange,
  error,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <Text className="text-2xl my-1">{title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={options.map((option) => ({ label: option, value: option }))}
        setOpen={setOpen}
        setValue={(callback) => onChange(callback(value))}
        dropDownContainerStyle={{ backgroundColor: '#EBEBEB' }}
      />
      {error && <Text style={{ color: '#D50606' }}>{error}</Text>}
    </View>
  )
}
