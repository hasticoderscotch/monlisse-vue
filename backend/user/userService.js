const userdao = require('./userDao')
const user = require('../schema/user')
const util = require('../app util/util')
const bcrypt = require('bcrypt')

async function loginAdmin(req, res) {
  let tokn = util.generateToken(req.body, process.env.ADMIN_SECRET)
  return res.json({ code: 200, token: tokn })
}

module.exports = {
  loginAdmin,
}
