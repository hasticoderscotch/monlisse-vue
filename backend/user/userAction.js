const service = require('./userService')

function loginAdmin(req, res) {
  service.loginAdmin(req, res)
}

function verifyToken(req, res, next) {
  service.verifyToken(req, res, next)
}

module.exports = {
  loginAdmin,
  verifyToken,
}
