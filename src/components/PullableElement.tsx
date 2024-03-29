import { FC, useEffect, useRef, useState } from 'react'
import { PanResponder, StyleSheet, View } from 'react-native'

// component with: max and min widths, updateWidth callbacks.
interface PullableElementProps {
  min: number
  max: number
  startingValue: number
  componentWidth: number
  onChange: (number: number) => void
}

/**
 * A PullableElement is an element that can be pulled, and handles the intermediate calculations to
 * convert pixel width to percentage width, such that it can clamp the width it can be pulled to a given range
 * from 0 - 100.
 */
export const PullableElement: FC<PullableElementProps> = ({
  min,
  max,
  startingValue,
  componentWidth,
  onChange,
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
    () => onChange(pulledWidth.current + tempPulledWidth),
    [pulledWidth, tempPulledWidth],
  )

  const pixelsToPercentWidth = (pixels: number) => {
    return (pixels / componentWidth) * 100
  }

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

  return (
    <>
      <View
        style={[
          styles.pullableElement,
          pulling && styles.activePullableElement,
        ]}
      />
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
