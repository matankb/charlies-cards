import { View, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FC } from 'react'
import { MoneyDisplay } from './MoneyDisplay'
import { FontAwesome } from '@expo/vector-icons'
import { RefillPullableDisplay } from './RefillPullableDisplay'
import { PrimaryButton } from '../PrimaryButton'

interface RefillModalPropsimport {
  handleDismiss: () => void
  cardName: string
  currentAmount: number
  refillTransactions: number[]
}

export const RefillModal: FC<RefillModalPropsimport> = ({
  handleDismiss,
  cardName,
  currentAmount,
  refillTransactions,
}) => {
  const calculatedAddition = () => {
    if (refillTransactions.length === 0) return currentAmount

    return refillTransactions.reduce((partialSum, a) => partialSum + a, 0)
  }

  const telegraphedTransactions = () => {
    const out = refillTransactions
      .slice(0, -1)
      .map((x) => '$' + x.toString())
      .join(', ')

    return out + ` and then $${refillTransactions.findLast(() => true)}`
  }

  const sendRefill = () => {
    console.log('send refill') // TODO: connect to actual refill
  }

  return (
    <View
      style={{
        width: '100%',
        height: '50%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 19,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Pressable
        style={{
          borderRadius: 50,
          backgroundColor: '#EBEBEB',
          position: 'absolute',
          top: 13,
          right: 13,
          padding: 6,
        }}
        onPress={handleDismiss}
      >
        <AntDesign name="close" size={16} color="gray" />
      </Pressable>
      <Text style={{ fontFamily: 'LatoSemibold', fontSize: 16 }}>
        Refill {cardName}
      </Text>
      <View className="flex flex-row justify-between align-center pt-5">
        <MoneyDisplay
          amount={currentAmount}
          dollarColor="#B8B8B8"
          shrinkCents
        />
        <FontAwesome
          name="long-arrow-right"
          size={32}
          color="#B8B8B8"
          style={{ paddingHorizontal: 12, paddingVertical: 16 }}
        />
        <MoneyDisplay
          amount={currentAmount + calculatedAddition()}
          centColor="black"
          shrinkCents
        />
      </View>
      <RefillPullableDisplay
        currentAmount={currentAmount}
        addedAmount={calculatedAddition()}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
        }}
      >
        <Text
          style={{
            fontFamily: 'LatoRegular',
            fontSize: 12,
            color: '#878787',
            alignSelf: 'center',
            paddingBottom: 8,
          }}
        >
          You will be billed {telegraphedTransactions()}
        </Text>
        <PrimaryButton
          text={`Pay $${calculatedAddition()}`}
          onSubmit={sendRefill}
          buttonColor="#428A4E"
          pressedButtonColor="#336B3C"
        />
      </View>
    </View>
  )
}
