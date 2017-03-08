let def = {
  storedValueName: 'Z_STORED_VALUE',
  timestampName: 'Z_TIMESTAMP'
}

function hasValue (options = def) {
  let isExpired = isExpiredTimestamp(options.timestampName)
  let storedValue = localStorage.getItem(options.storedValueName)
  return !isExpired && storedValue
}

function getValue (options = def) {
  return JSON.parse(localStorage.getItem(options.storedValueName))
}

function setValue (
  value,
  persistDurationInDays,
  options = def
) {
  const oneDay = 1000 * 60 * 60 * 24
  let expiry = Date.now() + persistDurationInDays * oneDay
  localStorage.setItem(options.storedValueName, JSON.stringify(value))
  localStorage.setItem(options.timestampName, expiry)
}

function setRandomValue (
  values,
  persistDurationInDays,
  options = def
) {
  let chosenValue = randomValue(values)
  setValue(chosenValue, persistDurationInDays, options)
}

function isExpiredTimestamp (timestampName) {
  let timestamp = parseInt(localStorage.getItem(timestampName))
  return Date.now() > timestamp
}

function clearStorage ({storedValueName, timestampName}) {
  localStorage.removeItem(timestampName)
  localStorage.removeItem(storedValueName)
}

function randomValue (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
  getValue,
  setValue,
  setRandomValue,
  hasValue,
  clearStorage
}
