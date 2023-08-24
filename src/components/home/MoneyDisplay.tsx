import { FC } from 'react'
import { View, Text } from 'react-native'

interface MoneyDisplayProps {
  amount: number
  dollarColor?: string
  centColor?: string
  shrinkCents?: boolean
}

export const MoneyDisplay: FC<MoneyDisplayProps> = ({
  amount,
  dollarColor = 'black',
  centColor = '#B8B8B8',
  shrinkCents = false,
}) => {
  const [dollars, cents] = amount.toString().split('.')

  return (
    <View
      className="flex flex-row items-start"
      style={{ gap: 6, marginBottom: 25 }}
    >
      <Text
        style={{ fontFamily: 'LatoRegular', fontSize: 24, color: dollarColor }}
        className="pt-3"
      >
        $
      </Text>
      <View className={`flex flex-row ${shrinkCents ? 'items-end' : ''}`}>
        <Text
          style={{ fontFamily: 'LatoBold', fontSize: 56, color: dollarColor }}
        >
          {dollars}
        </Text>
        <Text
          style={{
            fontFamily: 'LatoBold',
            fontSize: shrinkCents ? 20 : 56,
            color: centColor,
            paddingBottom: 8,
          }}
        >
          .{cents}
        </Text>
      </View>
    </View>
  )
}
