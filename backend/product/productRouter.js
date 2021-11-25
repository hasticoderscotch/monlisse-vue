const productRouter = require('express').Router()
const actions = require('./productAction')
const validate = require('./productValidator')

productRouter
  .route('/add')
  .post([validate.verifyAdminToken], (req, res, next) => {
    actions.addproduct(req, res, next)
  })

productRouter
  .route('/list')
  .get([validate.verifyAdminToken], (req, res, next) => {
    actions.listproduct(req, res, next)
  })

productRouter
  .route('/update')
  .put([validate.verifyAdminToken], (req, res, next) => {
    actions.updateproduct(req, res, next)
  })

productRouter
  .route('/delete')
  .delete([validate.verifyAdminToken], (req, res, next) => {
    actions.deleteproduct(req, res, next)
  })

module.exports = productRouter
