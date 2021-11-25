const service = require('./productService')

function addproduct(req, res, next) {
  service.addproduct(req, res, next)
}

function listproduct(req, res, next) {
  service.listproduct(req, res, next)
}

function updateproduct(req, res, next) {
  service.updateproduct(req, res, next)
}

function deleteproduct(req, res, next) {
  service.deleteproduct(req, res, next)
}
module.exports = {
  addproduct,
  listproduct,
  updateproduct,
  deleteproduct,
}
