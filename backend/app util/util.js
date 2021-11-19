const jwt = require('jsonwebtoken')

function generateToken(data, secret) {
  let obj = {
    id: data._id,
    email: data.email,
  }
  return jwt.sign(obj, secret, { expiresIn: '720hr' })
}

module.exports = { generateToken }
