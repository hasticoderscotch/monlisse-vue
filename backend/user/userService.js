const userdao = require('./userDao')
const user = require('../schema/user')
const util = require('../app util/util')
const bcrypt = require('bcrypt')

async function loginAdmin(req, res) {
  return user
    .findOne({ email: req.body.email, role: 'ADMIN' })
    .then(async (result) => {
      if (result) {
        console.log(result, 'result')
        const match = await bcrypt.compare(req.body.password, result.password)
        if (match) {
          let tokn = util.generateToken(result, process.env.ADMIN_SECRET)

          return res.json({ code: 200, token: tokn })
        } else {
          return res.json({ code: 400, message: 'Incorrect Password' })
        }
      } else {
        return res.json({ code: 404, message: 'Email address not found' })
      }
    })
    .catch((err) => {
      console.log(
        'login -> err=================================================================>',
        err
      )
      res.json({ code: 500, message: 'Internal server error' })
    })
}

function verifyToken(req, res, next) {
  var token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.json({
      code: 400,
      message: 'Token valid',
      data: {},
    })
  } else {
    util
      .verifyAdminToken(token)
      .then((result) => {
        if (result) {
          return res.json({ code: 200, message: 'Token valid' })
        } else {
          return res.json({
            code: 500,
            message: 'Internal server error',
            err: err,
          })
        }
      })
      .catch((err) => {
        console.log(err, 'err')
        return res.json({ code: 401, message: 'Invalid Token' })
      })
  }
}

module.exports = {
  loginAdmin,
  verifyToken,
}
