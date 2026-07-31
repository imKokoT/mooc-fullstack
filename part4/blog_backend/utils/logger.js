
const COLORS = {
  info: '\x1b[90m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  reset: '\x1b[0m'
}

const info = (...params) => {
  console.log(COLORS.info, ...params, COLORS.reset)
}

const error = (...params) => {
  console.error(COLORS.error, ...params, COLORS.reset)
}

const warning = (...params) => {
  console.warn(COLORS.warn, ...params, COLORS.reset)
}

module.exports = { 
  info, 
  error,
  warning
}
