import { useFonts } from 'expo-font'

export default function useAddFonts(): boolean {
  const [fontsLoaded, fontError] = useFonts({
    Lato: require('../../assets/fonts/Lato-Black.ttf'),
    LatoBlackItalic: require('../../assets/fonts/Lato-BlackItalic.ttf'),
    LatoBold: require('../../assets/fonts/Lato-Bold.ttf'),
    LatoBoldItalic: require('../../assets/fonts/Lato-BoldItalic.ttf'),
    LatoItalic: require('../../assets/fonts/Lato-Italic.ttf'),
    LatoLight: require('../../assets/fonts/Lato-Light.ttf'),
    LatoLightItalic: require('../../assets/fonts/Lato-LightItalic.ttf'),
    LatoRegular: require('../../assets/fonts/Lato-Regular.ttf'),
    LatoThin: require('../../assets/fonts/Lato-Thin.ttf'),
    LatoThinItalic: require('../../assets/fonts/Lato-ThinItalic.ttf'),
  })

  return fontsLoaded && !fontError
}
