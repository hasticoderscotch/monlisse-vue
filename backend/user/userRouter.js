const userRouter = require('express').Router()
const actions = require('./userAction')
const validate = require('./userValidator')

userRouter
  .route('/loginAdmin')
  .post([validate.validateLogin], (req, res, next) => {
    actions.loginAdmin(req, res, next)
  })

userRouter.route('/verifyToken').get([], (req, res) => {
  actions.verifyToken(req, res)
})

module.exports = userRouter
