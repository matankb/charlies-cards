import { ScrollView, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { BalanceDisplay } from '../components/home/BalanceDisplay'

export const HomePage = () => {
  return (
    <>
      <View
        className="bg-blue p-7 flex flex-row justify-between"
        style={{ height: '30%' }}
      >
        <Text style={{ fontFamily: 'Lato', fontSize: 20, color: 'white' }}>
          Cardlie Wallet
        </Text>
        <Entypo name="cog" size={28} color="white" />
      </View>
      <View
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          width: '100%',
          top: 70,
        }}
        className="w-full"
      >
        <BalanceDisplay />
      </View>
      <ScrollView></ScrollView>
    </>
  )
}
