async function validateLogin(req, res, next) {
  const { email, password } = req.body
  if (email && password) {
    next()
  } else {
    return res.json({ code: 400, message: 'Invalid input' })
  }
}

module.exports = {
  validateLogin,
}
