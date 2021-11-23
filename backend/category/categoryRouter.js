const categoryRouter = require('express').Router()
const actions = require('./categoryAction')
const validate = require('./categoryValidator')

categoryRouter.route('/add').post([], (req, res, next) => {
  actions.addcategory(req, res, next)
})

categoryRouter.route('/list').get([], (req, res, next) => {
  actions.listcategory(req, res, next)
})

categoryRouter
  .route('/update')
  .put([validate.verifyAdminToken], (req, res, next) => {
    actions.updatesport(req, res, next)
  })

categoryRouter
  .route('/delete')
  .delete([validate.verifyAdminToken], (req, res, next) => {
    actions.deletesport(req, res, next)
  })

module.exports = categoryRouter
