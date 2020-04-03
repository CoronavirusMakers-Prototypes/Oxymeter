// the request contains the expected param

const check = (objToCheck, mandatoryParams) => {
  for (var i = 0; i < mandatoryParams.length; i++) {
    if (typeof objToCheck[mandatoryParams[i]] === 'undefined' || objToCheck[mandatoryParams[i]] === null) {
      return false
    }
  }
  return true
}

module.exports = { check }
