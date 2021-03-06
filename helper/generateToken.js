const jwt = require('jsonwebtoken')
const generateToken = (user) => {
  const payload = {
    sub: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '1d',
  }

  const result = jwt.sign(payload, process.env.JWT_SECRET, options)

  return result
}

module.exports = generateToken
