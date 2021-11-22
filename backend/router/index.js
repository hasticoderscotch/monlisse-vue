var userRouter = require('../user/userRouter')
var categoryRouter = require('../category/categoryRouter')

module.exports = function (app) {
  app.use('/user', userRouter)
  app.use('/category', categoryRouter)
  app.use('/test', (req, res) => {
    return res.json({ msg: 'Test api response' })
  })
}
