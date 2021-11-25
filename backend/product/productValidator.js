const util = require('../app util/util')
const jwt = require('jsonwebtoken')
const commondao = require('../common/commonDao')

async function verifyAdminToken(req, res, next) {
  let token = req.headers.authorization.split(' ')[1]

  await jwt.verify(token, process.env.ADMIN_SECRET, (err) => {
    if (err) {
      return res.json({ code: 401, message: 'Invalid Token' })
    } else {
      let obj = util.decodeToken(token)
      let query = { _id: obj.id }

      commondao
        .findone(query)
        .then((data) => {
          if (!data) {
            return res.json({
              code: 401,
              message: 'Invalid Token',
            })
          } else {
            if (data.role == 'ADMIN') {
              next()
            } else {
              return res.json({
                code: 401,
                message: 'You Dont have access to these service',
              })
            }
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
