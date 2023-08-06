import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import { CharlieAccount } from '../components/registration/CharlieAccount'
import { RegistrationSuccess } from '../components/registration/RegistrationSuccess'

interface RegistrationStep {
  submitButtonText: string
  component: React.ReactElement
}

export const RegistrationPage = () => {
  const [index, setIndex] = useState(0)
  const { control, handleSubmit } = useForm()

  const pages: RegistrationStep[] = [
    {
      submitButtonText: 'Submit',
      component: <CharlieAccount control={control} />,
    },
    {
      submitButtonText: 'Open App',
      component: <RegistrationSuccess />,
    },
  ]

  const press = () => {
    setIndex(index + 1)

    if (index === pages.length) {
    }
  }

  return (
    <View className="flex p-4 justify-around">
      {pages[index].component}
      <Pressable
        className="bg-blue w-full rounded-lg p-2"
        onPress={handleSubmit(press)}
      >
        <Text className="text-white text-center">
          {pages[index].submitButtonText}
        </Text>
      </Pressable>
    </View>
  )
}
