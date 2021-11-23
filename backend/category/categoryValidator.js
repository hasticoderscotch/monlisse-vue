const util = require('../app util/util')
const jwt = require('jsonwebtoken')
const categorydao = require('./categoryDao')

async function verifyAdminToken(req, res, next) {
  let token = req.headers['authorization']

  await jwt.verify(token, process.env.ADMIN_SECRET, (err) => {
    console.log(err, 'errss')
    if (err) {
      return res.json({ code: 401, message: 'Invalid Token' })
    } else {
      let obj = util.decodeToken(token)
      let query = { email: obj.email }
      console.log(obj, 'obj')
      console.log(query, 'query')

      categorydao
        .findone(query)
        .then((data) => {
          if (!data) {
            return res.json({
              code: 401,
              message: 'Invalid Token',
            })
          }
        })
        .catch((err) => {
          return res.json({
            code: 500,
            message: 'Internal server error',
          })
        })
    }
  })
}

module.exports = {
  verifyAdminToken,
}
