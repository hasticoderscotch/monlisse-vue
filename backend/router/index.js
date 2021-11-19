var userRouter = require('../user/userRouter')

module.exports = function (app) {
  app.use('/user', userRouter)
  app.use('/test', (req, res) => {
    return res.json({ msg: 'Test api response' })
  })
}
