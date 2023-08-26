import { FC, useEffect, useRef, useState } from 'react'
import { Dimensions, PanResponder, StyleSheet, View } from 'react-native'

// component with: max and min widths, updatePulling, updateWidth callbacks.
interface PullableElementProps {
  min: number
  max: number
  startingValue: number
  updateWidth: (number) => void
}

const SCREEN_WIDTH = Dimensions.get('window').width
const COMPONENT_WIDTH = SCREEN_WIDTH - 24 // calculated from padding of RefillModal and container for this component

export const PullableElement: FC<PullableElementProps> = ({
  min,
  max,
  startingValue,
  updateWidth,
}) => {
  const pulledWidth = useRef(startingValue) // %
  const [tempPulledWidth, setTempPulledWidth] = useState(0)
  const [pulling, setPulling] = useState(false)

  useEffect(() => {
    if (!pulling) {
      pulledWidth.current += tempPulledWidth
      setTempPulledWidth(0)
    }
  }, [pulling])
  useEffect(
    () => updateWidth(pulledWidth.current + tempPulledWidth),
    [pulledWidth, tempPulledWidth],
  )

  /* PULLING CALCULATIONS */

  const handleGestureMove = ({ dx }) => {
    // cannot go below certain value
    // cannot go above certain value (100 - currentAmountWidth())
    // otherwise setTempPulledWidth
    const dxPercent = pixelsToPercentWidth(dx)
    const curWidth = pulledWidth.current
    let totalWidth = curWidth + dxPercent < min ? min - curWidth : dxPercent
    totalWidth = totalWidth + curWidth > max ? max - curWidth : totalWidth
    setTempPulledWidth(totalWidth)
  }

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: (evt, gestureState) =>
        handleGestureMove(gestureState),
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => setPulling(true),
      onPanResponderRelease: () => setPulling(false),
      onPanResponderTerminate: () => setPulling(false),
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => true,
    }),
  ).current

  const pixelsToPercentWidth = (pixels: number) => {
    return (pixels / COMPONENT_WIDTH) * 100
  }

  return (
    <>
      <View
        style={[
          styles.pullableElement,
          pulling && styles.activePullableElement,
        ]}
      ></View>
      <View {...panResponder.panHandlers} style={styles.pulledButton} />
    </>
  )
}

const styles = StyleSheet.create({
  pullableElement: {
    width: 2,
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 4,
  },
  activePullableElement: {
    backgroundColor: '#CBCBCB',
  },
  pulledButton: {
    width: 20,
    height: '100%',
    position: 'absolute',
    right: 0,
  },
})
