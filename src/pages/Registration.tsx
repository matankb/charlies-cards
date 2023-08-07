import React, { useState, FC } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import { CharlieAccount } from '../components/registration/CharlieAccount'
import { RegistrationSuccess } from '../components/registration/RegistrationSuccess'

interface RegistrationStep {
  submitButtonText: string
  component: React.ReactElement
}

interface RegistrationPageProps {
  setRegisteredComplete: () => void
}

export const RegistrationPage: FC<RegistrationPageProps> = ({
  setRegisteredComplete,
}) => {
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

  const advancePage = () => {
    if (index === pages.length - 1) {
      setRegisteredComplete()
      return
    }

    setIndex(index + 1)
  }

  return (
    <View className="flex p-4 flex-col h-full justify-between">
      {pages[index].component}
      <Pressable
        className="bg-blue w-full rounded-lg p-2"
        onPress={handleSubmit(advancePage)}
      >
        <Text className="text-white text-center">
          {pages[index].submitButtonText}
        </Text>
      </Pressable>
    </View>
  )
}
