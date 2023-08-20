import { FC } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface TransactionDisplayProps {
  transaction: {
    amount: number
    date: Date
  }
}

export const TransactionDisplay: FC<TransactionDisplayProps> = ({
  transaction: { amount, date },
}) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <View
        style={{
          backgroundColor: 'white',
          display: 'flex',
          maxHeight: 40,
          justifyContent: 'center',
          padding: 8,
          borderRadius: 50,
          marginRight: 27,
        }}
      >
        <Icon name="arrow-up-right" size={25} color="#428A4E" />
      </View>
      <View className="flex justify-center gap-2">
        <Text style={{ fontFamily: 'LatoBold', fontSize: 18 }}>
          ${amount} Refill
        </Text>
        <Text
          style={{ fontFamily: 'LatoRegular', fontSize: 16, color: '#878787' }}
        >
          {date.toDateString()}
        </Text>
      </View>
    </View>
  )
}
