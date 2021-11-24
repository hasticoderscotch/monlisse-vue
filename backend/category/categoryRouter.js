const categoryRouter = require('express').Router()
const actions = require('./categoryAction')
const validate = require('./categoryValidator')

categoryRouter.route('/add').post([], (req, res, next) => {
  actions.addcategory(req, res, next)
})

categoryRouter.route('/list').get([], (req, res, next) => {
  actions.listcategory(req, res, next)
})

categoryRouter.route('/update').put([], (req, res, next) => {
  actions.updatecategory(req, res, next)
})

categoryRouter.route('/delete').delete([], (req, res, next) => {
  actions.deletecategory(req, res, next)
})

module.exports = categoryRouter
