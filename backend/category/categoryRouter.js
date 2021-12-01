const categoryRouter = require('express').Router()
const actions = require('./categoryAction')
const validate = require('./categoryValidator')
const util = require('../app util/util')

categoryRouter
  .route('/add')
  .post(
    [validate.verifyAdminToken, util.upload.single('image')],
    (req, res, next) => {
      if (!req.image) return res.send('Please upload a file')
      var tempPath = req.image.path
      console.log(tempPath)
      actions.addcategory(req, res, next)
    }
  )

categoryRouter
  .route('/list')
  .get([validate.verifyAdminToken], (req, res, next) => {
    actions.listcategory(req, res, next)
  })

categoryRouter
  .route('/update')
  .put([validate.verifyAdminToken], (req, res, next) => {
    actions.updatecategory(req, res, next)
  })

categoryRouter
  .route('/delete')
  .delete([validate.verifyAdminToken], (req, res, next) => {
    actions.deletecategory(req, res, next)
  })

module.exports = categoryRouter
