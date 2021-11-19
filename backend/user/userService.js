const userdao = require('./userDao')
const user = require('../schema/user')
const util = require('../app util/util')

async function loginAdmin(req, res) {
  let tokn = util.generateToken(result, process.env.ADMIN_SECRET)
  console.log(tokn, 'tokm')
  return res.json({ code: 200, token: tokn })
}

module.exports = {
  loginAdmin,
}
