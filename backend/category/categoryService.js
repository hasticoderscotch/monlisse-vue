const categorydao = require('./categoryDao')
const category = require('../schema/category')
const util = require('../app util/util')

async function addcategory(req, res) {
  const data = req.body
  return categorydao
    .create(data)
    .then(async (result) => {
      res.json({ code: 201, message: 'Category Added' })
    })
    .catch((err) => {
      console.log('createCategory -> err', err)
      res.json({ code: 500, message: 'Internal server error' })
    })
}

async function listcategory(req, res) {
  categorydao
    .find()
    .then((data) => {
      return res.json({ code: code.ok, data: data })
    })
    .catch((err) => {
      return res.json({
        code: 500,
        messages: 'Internal server error',
      })
    })
}

function updatecategory(req, res) {
  let query = { _id: req.query.categoryId },
    update = { $set: req.body },
    options = { new: true }
  categorydao
    .findOneAndUpdate(query, update, options)
    .then((data) => {
      return res.json({ code: 200, data: data })
    })
    .catch((err) => {
      return res.json({
        code: 500,
        messages: 'Internal server error',
      })
    })
}

function deletecategory(req, res) {
  let query = { _id: req.query.categoryId }

  categorydao
    .remove(query)
    .then((data) => {
      if (data.deletedCount == 1) {
        return res.json({ code: 200, messages: 'Category Deleted' })
      } else {
        return res.json({ code: 404, messages: 'Not found' })
      }
    })
    .catch((err) => {
      return res.json({
        code: 500,
        messages: 'Internal server error',
      })
    })
}

module.exports = {
  addcategory,
  listcategory,
  updatecategory,
  deletecategory,
}
