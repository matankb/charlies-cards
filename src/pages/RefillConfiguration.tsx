import { StyleSheet, Text, TextInput, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import { useEffect, useState } from 'react'
import { PrimaryButton } from '../components/PrimaryButton'
import { LoadingSpinner } from '../components/LoadingSpinner'
import {
  getRefillTarget,
  getRefillThreshold,
  setRefillTarget,
  setRefillThreshold,
} from '../controllers/settings'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface CardBoundary {
  threshold: string
  target: string
}

export const RefillConfigurationPage = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const [threshold, setThreshold] = useState(null)
  const [target, setTarget] = useState(null)

  const [thresholdError, setThresholdError] = useState(false)
  const [targetError, setTargetError] = useState(false)

  const [initial, setInitial] = useState<CardBoundary>(null)

  async function load() {
    const card = {
      threshold: await getRefillThreshold(),
      target: await getRefillTarget(),
    }

    setInitial(card)
    setThreshold(card.threshold)
    setTarget(card.target)

    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const disableSave = () => {
    return (
      !initial ||
      (initial.threshold === threshold && initial.target === target) ||
      thresholdError ||
      targetError
    )
  }

  const updateThreshold = (value) => {
    setThreshold(value)

    if (value > target - 5) {
      setThresholdError(true)
    } else {
      setThresholdError(false)
    }
  }

  const updateTarget = (value) => {
    setTarget(value)

    if (value < threshold - 5) {
      setTargetError(true)
    } else {
      setTargetError(false)
    }
  }

  const saveConfiguration = () => {
    setTargetError(false)
    setThresholdError(false)

    setRefillThreshold(threshold)
    setRefillTarget(target)
    setLoading(true)
    load()
  }

  const getCentralNumberValue = () => {
    return String((Number(threshold || 0) + Number(target || 0)) / 2)
  }

  useEffect(() => console.log(threshold), [threshold])

  return (
    <>
      <View style={styles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Account Settings</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          We will notify you if you fall below the{' '}
          <Text style={styles.redDescText}>threshold</Text> and recommend you an
          amount within the <Text style={styles.blueDescText}>target</Text>.
        </Text>
      </View>
      {initial && (
        <View style={styles.contentContainer}>
          <View style={styles.thresholdBar}>
            <View style={styles.thresholdFill}>
              <Text style={styles.thresholdFillText}>
                ${getCentralNumberValue()}
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: -20,
              margin: '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <View className="flex-row gap-1 items-center">
                <MaterialCommunityIcons
                  name="bell-plus"
                  size={16}
                  color="#DB5454"
                />
                <Text style={styles.thresholdText}>THRESHOLD</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#DB5454',
                  width: 4,
                  height: 90,
                }}
              />
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: thresholdError ? '#D62C2C' : '#D9D9D9',
                  },
                ]}
              >
                <Text style={styles.inputDollarText}>$</Text>
                <TextInput
                  style={styles.inputText}
                  keyboardType="numeric"
                  value={threshold}
                  onChangeText={updateThreshold}
                  maxLength={3}
                />
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View className="flex-row gap-1 items-center">
                <MaterialCommunityIcons
                  name="card-multiple-outline"
                  size={16}
                  color="#549ADB"
                />
                <Text style={styles.targetText}>TARGET</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#549ADB',
                  width: 4,
                  height: 90,
                }}
              />
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: targetError ? '#D62C2C' : '#D9D9D9',
                  },
                ]}
              >
                <Text style={styles.inputDollarText}>$</Text>
                <TextInput
                  style={styles.inputText}
                  keyboardType="numeric"
                  value={target}
                  onChangeText={updateTarget}
                  maxLength={3}
                />
              </View>
            </View>
          </View>
        </View>
      )}
      {loading && <LoadingSpinner />}
      <View style={styles.submitContainer}>
        <PrimaryButton
          onSubmit={saveConfiguration}
          disabled={disableSave()}
          text="Save Configuration"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 26,
    flexDirection: 'row',
    backgroundColor: '#155C96',
    gap: 8,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'LatoSemibold',
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },
  descriptionContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  descriptionText: {
    color: '#545454',
    fontFamily: 'LatoRegular',
    fontSize: 14,
  },
  redDescText: { color: '#DB5454' },
  blueDescText: { color: '#549ADB' },
  contentContainer: {
    gap: 10,
    paddingTop: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  thresholdBar: {
    backgroundColor: '#EDEDED',
    borderColor: '#D2D2D2',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: '100%',
    height: 64,
    justifyContent: 'center',
  },
  thresholdFill: {
    backgroundColor: '#155C96',
    height: 50,
    width: '55%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 15,
  },
  thresholdFillText: {
    fontFamily: 'LatoSemibold',
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 13,
    gap: 25,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 16,
    width: 105,
  },
  inputDollarText: {
    fontFamily: 'LatoRegular',
    fontSize: 24,
    color: '#9D9D9D',
  },
  inputText: {
    fontFamily: 'LatoRegular',
    fontSize: 24,
    color: 'black',
  },
  thresholdText: {
    color: '#DB5454',
    fontFamily: 'LatoBold',
    fontSize: 12,
  },
  targetText: {
    color: '#549ADB',
    fontFamily: 'LatoBold',
    fontSize: 12,
  },
  submitContainer: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
