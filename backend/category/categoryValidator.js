const util = require('../app util/util')
const categorydao = require('./categoryDao')

async function verifyAdminToken(req, res, next) {
  let token = req.headers['authorization']
  await jwt.verify(token, process.env.ADMIN_SECRET, (err) => {
    if (err) {
      return res.json({ code: 401, message: 'Invalid Token' })
    } else {
      let obj = util.decodeToken(token)
      let query = { _id: obj.id }

      categorydao
        .findone(query)
        .then((data) => {
          if (!data) {
            return res.json({
              code: 401,
              message: 'Invalid Token',
            })
          } else {
            if (data.role == role.admin) {
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
