import { useFonts } from 'expo-font'

export default function useAddFonts(): boolean {
  const [fontsLoaded, fontError] = useFonts({
    Lato: require('../../assets/fonts/Lato-Black.ttf'),
    LatoBlackItalic: require('../../assets/fonts/Lato-BlackItalic.ttf'),
    LatoBold: require('../../assets/fonts/Lato-Bold.ttf'),
    LatoBoldItalic: require('../../assets/fonts/Lato-BoldItalic.ttf'),
    LatoHairline: require('../../assets/fonts/Lato-Hairline.ttf'),
    LatoHairlineItalic: require('../../assets/fonts/Lato-HairlineItalic.ttf'),
    LatoHeavy: require('../../assets/fonts/Lato-Heavy.ttf'),
    LatoHeavyItalic: require('../../assets/fonts/Lato-HeavyItalic.ttf'),
    LatoItalic: require('../../assets/fonts/Lato-Italic.ttf'),
    LatoLight: require('../../assets/fonts/Lato-Light.ttf'),
    LatoLightItalic: require('../../assets/fonts/Lato-LightItalic.ttf'),
    LatoMedium: require('../../assets/fonts/Lato-Medium.ttf'),
    LatoMediumItalic: require('../../assets/fonts/Lato-MediumItalic.ttf'),
    LatoRegular: require('../../assets/fonts/Lato-Regular.ttf'),
    LatoSemibold: require('../../assets/fonts/Lato-Semibold.ttf'),
    LatoSemiboldItalic: require('../../assets/fonts/Lato-SemiboldItalic.ttf'),
    LatoThin: require('../../assets/fonts/Lato-Thin.ttf'),
    LatoThinItalic: require('../../assets/fonts/Lato-ThinItalic.ttf'),
  })

  return fontsLoaded && !fontError
}
