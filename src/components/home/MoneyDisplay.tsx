import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
  const [dollars, cents] = amount.toFixed(2).toString().split('.')

  return (
    <View className="flex flex-row items-start" style={styles.container}>
      <Text
        style={[styles.dollarSignText, { color: dollarColor }]}
        className="pt-3"
      >
        $
      </Text>
      <View className={`flex flex-row ${shrinkCents ? 'items-end' : ''}`}>
        <Text style={[styles.dollarsText, { color: dollarColor }]}>
          {dollars}
        </Text>
        <Text
          style={[
            styles.centsText,
            {
              fontSize: shrinkCents ? 20 : 56,
              color: centColor,
            },
          ]}
        >
          .{cents}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 6, marginBottom: 25 },
  dollarSignText: {
    fontFamily: 'LatoRegular',
    fontSize: 24,
  },
  dollarsText: { fontFamily: 'LatoBold', fontSize: 56 },
  centsText: {
    fontFamily: 'LatoBold',
    paddingBottom: 8,
  },
})
