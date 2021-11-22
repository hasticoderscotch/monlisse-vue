const service = require('./categoryService')

function addcategory(req, res, next) {
  service.addcategory(req, res, next)
}

function listcategory(req, res, next) {
  service.listcategory(req, res, next)
}

function updatecategory(req, res, next) {
  service.updatecategory(req, res, next)
}

function deletecategory(req, res, next) {
  service.deletecategory(req, res, next)
}
module.exports = {
  addcategory,
  listcategory,
  updatecategory,
  deletecategory,
}
