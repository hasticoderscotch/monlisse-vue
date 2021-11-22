const userdao = require('./userDao')
const user = require('../schema/user')
const util = require('../app util/util')
const bcrypt = require('bcrypt')

async function loginAdmin(req, res) {
  return user
    .findOne({ email: req.body.email, role: role.admin })
    .then(async (result) => {
      if (result) {
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

  // let tokn = util.generateToken(req.body, process.env.ADMIN_SECRET)
  // return res.json({ code: 200, token: tokn })
}

module.exports = {
  loginAdmin,
}
