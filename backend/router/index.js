var userRouter = require('../user/userRouter')
var categoryRouter = require('../category/categoryRouter')
var productRouter = require('../product/productRouter')
var commonRouter = require('../common/commonRouter')

module.exports = function (app) {
  app.use('/user', userRouter)
  app.use('/category', categoryRouter)
  app.use('/product', productRouter)
  app.use('/common', commonRouter)
  app.use('/test', (req, res) => {
    return res.json({ msg: 'Test api response' })
  })
}
