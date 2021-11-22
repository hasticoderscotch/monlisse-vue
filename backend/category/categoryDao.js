let BaseDao = require('../dao/baseDao')
const categoryModel = require('../schema/category')
const categorydao = new BaseDao(categoryModel)

function create(data) {
  return categorydao.save(data).then((result) => {
    return result
  })
}
function remove(query) {
  return categorydao.remove(query).then((result) => {
    return result
  })
}

function findone(query) {
  return categorydao.findOne(query).then((result) => {
    return result
  })
}
function find(query) {
  return categorydao.find(query).then((result) => {
    return result
  })
}
function findOneAndUpdate(query, update, options) {
  return categorydao.findOneAndUpdate(query, update, options).then((result) => {
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
