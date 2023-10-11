import { getCreditCard } from './settings'

const sharedInjectableJavascript = /* javascript */ `
  const MBTA_WEBSITE_URL = 'https://charliecard.mbta.com/CharlieCardWebProgram/pages/charlieCardCenter.jsf';

  // IFrame Utilities

  const createMBTAWebsiteIframe = () => {
    const iframe = document.createElement('iframe')
    iframe.src = MBTA_WEBSITE_URL
    iframe.style = 'width: 1000px; height: 1000px;'
    document.body.append(iframe)
    return iframe
  }

  const waitForIframeLoad = iframe => (
    new Promise(resolve => {
      iframe.addEventListener('load', resolve)
    })
  )

  const getElementById = (iframe, id) => (
    iframe.contentDocument.getElementById(id)
  )

  const postMessage = (type, data) => (
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }))
  )

  const handleCallback = data => postMessage('callback', data)
  const handleError = error => postMessage('error', error)

  const setSelectValue = (select, value) => {
    select.value = value;
    select.dispatchEvent(new InputEvent('change'));
  }

  const setSelectValueByLabel = (select, label) => {
    const options = select.querySelectorAll('option');
    const option = Array.from(options).find(option => option.textContent === label);
    setSelectValue(select, option.value);
  }

  // Navigators

  const navigateToCardPageAndSelectCard = async (iframe, username, password, card) => {
     // dashboard page
     await waitForIframeLoad(iframe)
     const link = getElementById(iframe, 'main_form:_idJsp70')
     link.click()

     // login page
     await waitForIframeLoad(iframe)
     const emailInput = getElementById(iframe, 'main_form:Email')
     const passwordInput = getElementById(iframe, 'main_form:Password')
     emailInput.value = username
     passwordInput.value = password
     getElementById(iframe, 'main_form:_idJsp78').click()

     // account page
     await waitForIframeLoad(iframe)
     getElementById(iframe, 'contentMenu_form:_idJsp68').click()

     // card selection page
     await waitForIframeLoad(iframe);
     const cardList = getElementById(iframe, 'main_form:cardList');
     setSelectValue(cardList, card)
     cardList.dispatchEvent(new InputEvent('change'))

     return waitForIframeLoad(iframe)
  }
`

export const getStoredValueInjectableJavascript = async () => {
  const mbtaUsername = await '205matan@gmail.com'
  const mbtaPassword = await 'VQP!bwz8nuz-pwf5waz'
  const card = await '05-313177526'

  return /* javascript */ `
    (async () => {
      ${sharedInjectableJavascript}

      try {
        const iframe = createMBTAWebsiteIframe()

        const username = '${mbtaUsername}'
        const password = '${mbtaPassword}'
        const card = '${card}'

        await navigateToCardPageAndSelectCard(iframe, username, password, card)
        
        // navigate to card detail page
        getElementById(iframe, 'main_form:btnShowProduct').click()
        await waitForIframeLoad(iframe)

        // card details page
        const table = getElementById(iframe, 'main_form:panelGroup')
        const valueCell = table.querySelector('fieldset:nth-of-type(3) tbody tr:nth-child(1) td:nth-child(2)')
        const value = valueCell.textContent
        
        handleCallback(value)
      } catch (e) {
        handleError(e)
      }
    })();

    // injectJavascript requires a truthy return value
    true;
  `
}

export const refillInjectableJavascript = async (amount: number) => {
  // these will be integrated into the account/settings controller
  const mbtaUsername = await ''
  const mbtaPassword = await ''
  const card = await ''

  const creditCard = await getCreditCard()
  const creditCardType = creditCard.cardType
  const creditCardNumber = creditCard.cardNumber
  const creditCardSecurityCode = creditCard.cvv
  const [creditCardExpirationMonth, creditCardExpirationYear] =
    creditCard.expiration.split('/')

  return /* javascript */ `
    (async () => {
      ${sharedInjectableJavascript}

      try {
        const iframe = createMBTAWebsiteIframe()

        // "import" variables into the injected javascript context
        const username = '${mbtaUsername}'
        const password = '${mbtaPassword}'
        const card = '${card}'
        const amount = '${amount}'
        const creditCardType = '${creditCardType}'
        const creditCardNumber = '${creditCardNumber}'
        const creditCardSecurityCode = '${creditCardSecurityCode}'
        const creditCardExpirationMonth = '${creditCardExpirationMonth}'
        const creditCardExpirationYear = '${creditCardExpirationYear}'

        await navigateToCardPageAndSelectCard(iframe, username, password, card)

        // navigate to add value page
        getElementById(iframe, 'main_form:btnStartAddChangeProduct').click()
        await waitForIframeLoad(iframe)

        // add value page
        const valueInput = getElementById(iframe, 'main_form:svAmount')
        setSelectValue(valueInput, amount)
        await waitForIframeLoad(iframe)

        getElementById(iframe, 'main_form:btnContinue').click();
        await waitForIframeLoad(iframe);

        // credit card information page
        const creditCardTypeInput = getElementById(iframe, 'main_form:cardType');
        const creditCardNumberInput = getElementById(iframe, 'main_form:CreditCardNo');
        const creditCardSecurityCodeInput = getElementById(iframe, 'main_form:SecurityCode');
        const creditCardExpirationMonthInput = getElementById(iframe, 'main_form:monthh');
        const creditCardExpirationYearInput = getElementById(iframe, 'main_form:yearr');

        setSelectValueByLabel(creditCardTypeInput, creditCardType)
        setSelectValue(creditCardNumberInput, creditCardNumber)
        setSelectValue(creditCardSecurityCodeInput, creditCardSecurityCode)
        setSelectValue(creditCardExpirationMonthInput, creditCardExpirationMonth)
        setSelectValue(creditCardExpirationYearInput, creditCardExpirationYear)

        getElementById(iframe, 'main_form:AgreeQuestion').checked = true;

        getElementById(iframe, 'main_form:confirmBtn').click();
        await waitForIframeLoad(iframe);
        handleCallback();
      } catch (e) {
        handleError(e);
      }
    })();
    
    true;
  `
}
