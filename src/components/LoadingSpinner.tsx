import { View } from 'react-native'
import textLoading from '../../assets/text-loading.json'
import AnimatedLoader from 'react-native-animated-loader'

export const LoadingSpinner = () => {
  return (
    <View>
      <AnimatedLoader
        visible
        overlayColor="rgba(0,0,0,0.5)"
        source={textLoading}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
      />
    </View>
  )
}
