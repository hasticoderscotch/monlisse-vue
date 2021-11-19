const service = require('./userService')

function loginAdmin(req, res) {
  service.loginAdmin(req, res)
}

module.exports = {
  loginAdmin,
}
