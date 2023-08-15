import { Pressable, Text, View } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

interface RegisterFlowTitleProps {
  title: string
  handlePrevPage?: () => void
}

export const RegisterFlowTitle: FC<RegisterFlowTitleProps> = ({
  title,
  handlePrevPage,
}) => {
  return (
    <>
      {handlePrevPage && (
        <Pressable
          onPress={handlePrevPage}
          style={{ position: 'absolute', left: 0, top: 6 }}
        >
          <Icon name="arrowleft" size={25} />
        </Pressable>
      )}
      <Text className="text-black text-4xl">{title}</Text>
      <View
        className="h-px w-full my-2.5"
        style={{ backgroundColor: '#D2D2D2' }}
      ></View>
    </>
  )
}
