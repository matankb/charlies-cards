import { FC } from 'react'
import { View, Text } from 'react-native'

interface RefillPullableDisplayProps {
  currentAmount: number
  addedAmount: number
}

export const RefillPullableDisplay: FC<RefillPullableDisplayProps> = ({
  currentAmount,
  addedAmount,
}) => {
  return (
    <View
      className="flex flex-row justify-start w-full"
      style={{
        backgroundColor: '#ECECEC',
        borderRadius: 16,
        padding: 8,
      }}
    >
      <View
        className="rounded-l-xl bg-blue py-5 px-2.5"
        style={{ width: '40%' }}
      >
        <Text
          numberOfLines={1}
          style={{ color: 'white', fontFamily: 'LatoSemibold', fontSize: 16 }}
        >
          ${currentAmount}
        </Text>
      </View>
      <View
        className="rounded-r-md py-5 px-2.5"
        style={{ width: '40%', backgroundColor: '#428A4E' }}
      >
        <Text
          numberOfLines={1}
          style={{ color: 'white', fontFamily: 'LatoSemibold', fontSize: 16 }}
        >
          + ${addedAmount}
        </Text>
      </View>
    </View>
  )
}
