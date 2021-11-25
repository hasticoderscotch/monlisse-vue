let BaseDao = require('../dao/baseDao')
const productModel = require('../schema/product')
const productdao = new BaseDao(productModel)

function create(data) {
  return productdao.save(data).then((result) => {
    return result
  })
}
function remove(query) {
  return productdao.remove(query).then((result) => {
    return result
  })
}

function findone(query) {
  return productdao.findOne(query).then((result) => {
    return result
  })
}
function find(query) {
  return productdao.find(query).then((result) => {
    return result
  })
}
function findOneAndUpdate(query, update, options) {
  return productdao.findOneAndUpdate(query, update, options).then((result) => {
    return result
  })
}
module.exports = {
  create,
  findone,
  findOneAndUpdate,
  find,
  remove,
}
