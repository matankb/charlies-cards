import React, { useState, FC } from 'react'
import { View } from 'react-native'
import { CharlieAccount } from '../components/registration/CharlieAccount'
import { RegistrationSuccess } from '../components/registration/RegistrationSuccess'
import PaginationDot from 'react-native-animated-pagination-dot'
import { CharlieCard } from '../components/registration/CharlieCard'
import { CreditCard } from '../components/registration/CreditCard'
import {
  setMyCharlieCredentials,
  setRefillThreshold,
} from '../controllers/account'
import {
  CreditCardModel,
  setCreditCard,
  setRefillTarget,
} from '../controllers/settings'

interface RegistrationPageProps {
  setRegisteredComplete: () => void
}

const initialState: CreditCardModel = {
  cardNumber: '',
  cardHolder: '',
  expiration: '',
  cvv: '',
}

export const RegistrationPage: FC<RegistrationPageProps> = ({
  setRegisteredComplete,
}) => {
  const [index, setIndex] = useState(0)

  // page 1 state (charlie account)
  const [userName, setUserName] = useState('')
  const [userError, setUserError] = useState(undefined)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(undefined)

  // page 2 state (charlie card)
  const [charlieCard, setCharlieCard] = useState('')
  const [charlieCardError, setCharlieCardError] = useState(undefined)
  const [charlieCardName, setCharlieCardName] = useState('')
  const [charlieCardNameError, setCharlieCardNameError] = useState(undefined)

  // page 3 (credit card)
  const [creditCard, setCreditCardState] =
    useState<CreditCardModel>(initialState)
  const [cardNumberError, setCardNumberError] = useState(undefined)
  const [cardHolderError, setCardHolderError] = useState(undefined)
  const [cvvError, setCvvError] = useState(undefined)
  const [expirationError, setExpirationError] = useState(undefined)
  const [cardTypeError, setCardTypeError] = useState(undefined)

  const handleNextPage = () => {
    if (index === pages.length - 1) {
      return
    }

    setIndex(index + 1)
  }

  const handlePrevPage = () => {
    if (index === 0) return

    setIndex(index - 1)
  }

  const handleFormSubmit = () => {
    setMyCharlieCredentials(userName, password, charlieCard, charlieCardName)
    setCreditCard(creditCard)
    setRefillTarget(40) // default value
    setRefillThreshold(10) // default value
    setRegisteredComplete()
  }

  const pages: React.ReactElement[] = [
    <CharlieAccount
      onSubmit={handleNextPage}
      userName={userName}
      setUserName={setUserName}
      userError={userError}
      setUserError={setUserError}
      password={password}
      setPassword={setPassword}
      passwordError={passwordError}
      setPasswordError={setPasswordError}
    />,
    <CharlieCard
      onSubmit={handleNextPage}
      card={charlieCard}
      setCard={setCharlieCard}
      cardError={charlieCardError}
      setCardError={setCharlieCardError}
      cardName={charlieCardName}
      setCardName={setCharlieCardName}
      cardNameError={charlieCardNameError}
      setCardNameError={setCharlieCardNameError}
      handlePrevPage={handlePrevPage}
    />,
    <CreditCard
      onSubmit={handleNextPage}
      card={creditCard}
      setCard={setCreditCardState}
      cardNumberError={cardNumberError}
      setCardNumberError={setCardNumberError}
      cardHolderError={cardHolderError}
      setCardHolderError={setCardHolderError}
      cvvError={cvvError}
      setCvvError={setCvvError}
      expirationError={expirationError}
      setExpirationError={setExpirationError}
      cardTypeError={cardTypeError}
      setCardTypeError={setCardTypeError}
      handlePrevPage={handlePrevPage}
    />,
    <RegistrationSuccess handleSubmit={handleFormSubmit} />,
  ]

  return (
    <View className="flex py-6 px-4 flex-col h-full justify-between">
      {pages[index]}
      <View className="flex-row justify-center">
        <PaginationDot
          activeDotColor={'green'}
          curPage={index}
          maxPage={pages.length}
          sizeRatio={1.25}
        />
      </View>
    </View>
  )
}
