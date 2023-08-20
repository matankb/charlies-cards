import { Pressable, ScrollView, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { BalanceDisplay } from '../components/home/BalanceDisplay'
import { TransactionDisplay } from '../components/home/TransactionDisplay'

export const HomePage = () => {
  const fakeData = [
    {
      id: 2,
      amount: 50,
      date: new Date(),
    },
    {
      id: 1,
      amount: 40,
      date: new Date(),
    },
    {
      id: 2,
      amount: 700,
      date: new Date(),
    },
  ]
  return (
    <>
      <View
        className="bg-blue p-7 flex flex-row justify-between"
        style={{ height: '32%' }}
      >
        <Text style={{ fontFamily: 'Lato', fontSize: 20, color: 'white' }}>
          Cardlie Wallet
        </Text>
        <Pressable>
          <Entypo name="cog" size={25} color="white" />
        </Pressable>
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
      <ScrollView
        style={{
          marginTop: 70,
          width: '90%',
          alignSelf: 'center',
        }}
      >
        {fakeData.map((transaction, index) => (
          <>
            <TransactionDisplay
              key={transaction.id}
              transaction={transaction}
            />
            {index < fakeData.length - 1 && (
              <View
                className="h-px my-4 mr-2"
                style={{
                  backgroundColor: '#D9D9D9',
                  width: '80%',
                  alignSelf: 'flex-end',
                }}
              ></View>
            )}
          </>
        ))}
      </ScrollView>
    </>
  )
}
