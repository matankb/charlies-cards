import { View, Text } from 'react-native'

export const BalanceDisplay = () => {
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
        <View
          className="flex flex-row items-start"
          style={{ gap: 6, paddingBottom: 44 }}
        >
          <Text
            style={{ fontFamily: 'LatoRegular', fontSize: 24, color: 'black' }}
            className="pt-3"
          >
            $
          </Text>
          <View className="flex flex-row">
            <Text
              style={{ fontFamily: 'LatoBold', fontSize: 56, color: 'black' }}
            >
              20
            </Text>
            <Text
              style={{
                fontFamily: 'LatoBold',
                fontSize: 56,
                color: '#B8B8B8',
              }}
            >
              .32
            </Text>
          </View>
        </View>
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
          Jacob's Card
        </Text>
      </View>
      <View className="flex flex-row items-center" style={{ paddingLeft: 30 }}>
        <Text style={{ fontFamily: 'LatoRegular', fontSize: 12 }}>
          05-038471732832
        </Text>
      </View>
    </View>
  )
}
