import { View, Text } from 'react-native'
import { MoneyDisplay } from './MoneyDisplay'
import { FC } from 'react'

interface BalanceDisplayProps {
  cardName: string
  cardNumber: string
}

export const BalanceDisplay: FC<BalanceDisplayProps> = ({
  cardName,
  cardNumber,
}) => {
  return (
    <View
      className="pt-5 rounded-3xl bg-white flex self-center"
      style={{ width: '85%', paddingBottom: 10 }}
    >
      <View className="pl-6">
        <Text
          className=""
          style={{ fontFamily: 'LatoRegular', color: '#7A7A7A', fontSize: 10 }}
        >
          CURRENT BALANCE
        </Text>
        <MoneyDisplay amount={20.32} />
      </View>
      <View
        className="flex flex-row items-center"
        style={{
          width: '100%',
          height: 35,
          backgroundColor: '#428A4E',
          paddingLeft: 30,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'LatoRegular',
            color: 'white',
            fontSize: 16,
          }}
        >
          {cardName}
        </Text>
      </View>
      <View className="flex flex-row items-center" style={{ paddingLeft: 30 }}>
        <Text style={{ fontFamily: 'LatoRegular', fontSize: 12 }}>
          {cardNumber}
        </Text>
      </View>
    </View>
  )
}
