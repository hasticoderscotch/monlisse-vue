const commonRouter = require('express').Router()
const service = require('./commonService')

commonRouter.route('/uploadPhoto').post([], (req, res) => {
  service.uploadPhoto(req, res)
})

module.exports = commonRouter
