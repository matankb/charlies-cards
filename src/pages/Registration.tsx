import React, { useState, FC } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import { CharlieAccount } from '../components/registration/CharlieAccount'
import { RegistrationSuccess } from '../components/registration/RegistrationSuccess'
import PaginationDot from 'react-native-animated-pagination-dot'
import { CharlieCard } from '../components/registration/CharlieCard'

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
      submitButtonText: 'Select Card',
      component: <CharlieCard control={control} />,
    },
    {
      submitButtonText: 'Open App',
      component: <RegistrationSuccess />,
    },
  ]

  const handleNextPage = () => {
    if (index === pages.length - 1) {
      setRegisteredComplete()
      return
    }

    setIndex(index + 1)
  }

  const handlePrevPage = () => {
    if (index === 0) return

    setIndex(index - 1)
  }

  const renderBackButton = () => {
    if (index === 0) return null

    return (
      <Pressable
        className="bg-blue w-full rounded-lg p-2"
        onPress={handlePrevPage}
      >
        <Text className="text-white text-center">Back</Text>
      </Pressable>
    )
  }

  return (
    <View className="flex p-4 flex-col h-full justify-between">
      {renderBackButton()}
      {pages[index].component}
      <View className="flex w-full">
        <View className="flex flex-row justify-center">
          <PaginationDot
            activeDotColor={'green'}
            curPage={index}
            maxPage={pages.length}
            sizeRatio={1.25}
          />
        </View>
        <Pressable
          className="bg-blue rounded-lg p-2 mt-4"
          onPress={handleSubmit(handleNextPage)}
        >
          <Text className="text-white text-center" style={{ color: 'white' }}>
            {pages[index].submitButtonText}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
