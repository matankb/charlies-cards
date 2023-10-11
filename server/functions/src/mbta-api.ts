import nodeFetch from 'node-fetch'
import * as fetchCookie from 'fetch-cookie'
import { CookieJar } from 'tough-cookie'

/** HTTP Utilities */

/**
 * creates an instance of postPage with an encapsulated cookie store, which enables
 * the server to have multiple accounts logged in at once
 * @returns postPage, a function that sends a post request to a given MBTA page
 */
function makePostPageFunction() {
  const cookieJar = new CookieJar()
  const fetch = fetchCookie(nodeFetch, cookieJar)

  // postPage sends a post request to a given MBTA page
  return async function postPage<T>(page: string, body?: T) {
    const url = `https://charliecard.mbta.com/CharlieCardWebProgram/pages/${page}IV.jsf`

    const response = await fetch(url, {
      method: 'post',
      body,
    })

    return response.text()
  }
}

/**
 * Builds an MBTA-compatible request body
 */
function buildRequestParams(
  params: Record<string, string>,
  formName = 'main_form',
) {
  // MBTA forms all contain a hidden SUBMIT parameter
  const urlParams = new URLSearchParams({
    [`${formName}_SUBMIT`]: '1',
  })

  for (const parameter of Object.keys(params)) {
    const key = `${formName}:${parameter}`
    const value = params[parameter]

    urlParams.append(key, value)
  }

  return urlParams
}

/**
 * Returns the card's current value
 * @param html The HTML of the "show card details" page
 */
function getCardValueFromHtml(html: string) {
  const STORED_VALUE_REGEX =
    /Last Known Stored Value :<\/span><\/td><td><span class="product_value_text">(.+)<\/span>/
  const SELECTED_ORDER_REGEX =
    /Selected Stored Value :<\/span><\/td><td><span class="product_value_text">(.+)<\/span>/

  const STORED_VALUE_PREFIX = '$'
  const SELECTED_ORDER_PREFIX = 'Stored Value US$ '

  const storedValueMatch = html.match(STORED_VALUE_REGEX)?.[1]
  const selectedOrderMatch = html.match(SELECTED_ORDER_REGEX)?.[1]

  // if values are not found, it is likely that the wrong HTML was passed
  if (!storedValueMatch || !selectedOrderMatch) {
    throw new Error('Could not find stored value or selected order')
  }

  let storedValue: number
  let selectedOrder: number

  // stored value or selected order can be `--`, which is treated as 0
  if (storedValueMatch.startsWith(STORED_VALUE_PREFIX)) {
    const value = storedValueMatch.slice(STORED_VALUE_PREFIX.length)
    storedValue = parseFloat(value)
  } else {
    storedValue = 0
  }

  if (selectedOrderMatch.startsWith(SELECTED_ORDER_PREFIX)) {
    const value = selectedOrderMatch.slice(SELECTED_ORDER_PREFIX.length)
    selectedOrder = parseFloat(value)
  } else {
    selectedOrder = 0
  }

  return storedValue + selectedOrder
}

export async function fetchCardValue(
  email: string,
  password: string,
  card: string,
): Promise<number> {
  const postPage = makePostPageFunction()

  // Navigates to login page, which requires two requests
  await postPage('login')
  await postPage('login')

  // Logs in
  const loginParameters = buildRequestParams({
    Email: email || '205matan@gmail.com',
    Password: password || 'VQP!bwz8nuz-pwf5waz',
    _idJsp78: 'Login',
  })
  await postPage('login', loginParameters)

  // Navigates to the "list cards" page
  const navigateToListCardsParameters = buildRequestParams(
    {
      _link_hidden_: 'contentMenu_form:_idJsp68',
    },
    'contentMenu_form',
  )
  await postPage('welcome', navigateToListCardsParameters)

  // Selects the card
  const selectCardParameters = buildRequestParams({
    cardList: card,
  })
  await postPage('listCard', selectCardParameters)

  // Shows the card details
  const [prefix, number] = card.split('-')

  const showCardDetailsParameters = buildRequestParams({
    cardList: card,
    Card_Prefix_hidden: prefix,
    Card_Number_hidden: number,
    btnShowProduct: 'Show Card Details',
  })

  const cardDetailsResponse = await postPage(
    'listCard',
    showCardDetailsParameters,
  )

  return getCardValueFromHtml(cardDetailsResponse)
}
