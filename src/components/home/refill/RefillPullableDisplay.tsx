import { FC, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native'

interface RefillPullableDisplayProps {
  currentAmount: number
  addedAmount: number
  onAdjustAddedAmount: (number) => void
}

const MAX_REFILL = 150
const SCREEN_WIDTH = Dimensions.get('window').width
const COMPONENT_WIDTH = SCREEN_WIDTH - 24 // calculated from padding of RefillModal and container for this component

export const RefillPullableDisplay: FC<RefillPullableDisplayProps> = ({
  currentAmount,
  addedAmount: initialAddedAmount,
  onAdjustAddedAmount,
}) => {
  const [pulledWidth, setPulledWidth] = useState(22) // %
  const [tempPulledWidth, setTempPulledWidth] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addedAmount, setAddedAmount] = useState(initialAddedAmount) // $
  const [pulling, setPulling] = useState(false)

  const handleGestureMove = ({ dx }) => {
    // cannot go below certain value (14?)
    // cannot go above certain value (100 - currentAmountWidth())
    // otherwise setTempPulledWidth
    console.log('Handling gesture: ' + dx)
    const dxPercent = pixelsToPercentWidth(dx)
    let totalWidth = pulledWidth + dxPercent < 14 ? pulledWidth - 14 : dxPercent
    totalWidth =
      totalWidth + pulledWidth + currentAmountWidth() > 100
        ? 100 - currentAmountWidth() - pulledWidth
        : totalWidth
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

  useEffect(() => onAdjustAddedAmount(addedAmount), [addedAmount])
  useEffect(() => {
    if (!pulling) {
      setPulledWidth(pulledWidth + tempPulledWidth)
      setTempPulledWidth(0)
    }
  }, [pulling])

  const pixelsToPercentWidth = (pixels: number) => {
    return (pixels / COMPONENT_WIDTH) * 100
  }

  const currentAmountWidth = () => {
    // todo: make the 22 (min width) calculated based on digits in amount displayed
    return Math.max(22, currentAmount / MAX_REFILL)
  }

  return (
    <View
      className="flex flex-row justify-start w-full"
      style={styles.container}
    >
      <View
        className="rounded-l-xl bg-blue py-5 px-2.5"
        style={{
          width: `${currentAmountWidth()}%`,
        }}
      >
        <Text numberOfLines={1} style={styles.currentAmountText}>
          ${currentAmount}
        </Text>
      </View>
      <View
        className="rounded-r-md pl-2.5 pr-1.5 py-3"
        style={[
          styles.addedAmountContainer,
          { width: `${pulledWidth + tempPulledWidth}%` },
        ]}
      >
        <Text numberOfLines={1} style={styles.addedAmountText}>
          +${addedAmount}
        </Text>
        <View
          style={[
            styles.pullableElement,
            pulling && styles.activePullableElement,
          ]}
        ></View>
        <View {...panResponder.panHandlers} style={styles.pulledButton} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECECEC',
    borderRadius: 16,
    padding: 8,
  },
  currentAmountText: {
    color: 'white',
    fontFamily: 'LatoSemibold',
    fontSize: 16,
  },
  addedAmountContainer: {
    backgroundColor: '#428A4E',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addedAmountText: { color: 'white', fontFamily: 'LatoSemibold', fontSize: 16 },
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
