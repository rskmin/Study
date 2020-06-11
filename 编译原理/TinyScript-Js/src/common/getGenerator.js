function getGenerator(obj) {
  return typeof obj[Symbol.iterator] === 'function' && obj[Symbol.iterator]()
}

module.exports = getGenerator