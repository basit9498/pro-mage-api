function isValidDate(value) {
  return !isNaN(Date.parse(value));
}

module.exports = { isValidDate };
