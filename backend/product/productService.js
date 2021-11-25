const productdao = require('./productDao')
const product = require('../schema/product')
const util = require('../app util/util')

async function addproduct(req, res) {
  const data = req.body
  return productdao
    .create(data)
    .then(async (result) => {
      res.json({ code: 201, data: data, message: 'Product Added' })
    })
    .catch((err) => {
      console.log('createProduct -> err', err)
      res.json({ code: 500, message: 'Internal server error' })
    })
}

async function listproduct(req, res) {
  productdao
    .find()
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

function updateproduct(req, res) {
  let query = { _id: req.query.productId },
    update = { $set: req.body },
    options = { new: true }

  productdao
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

function deleteproduct(req, res) {
  let query = { _id: req.query.productId }
  productdao
    .remove(query)
    .then((data) => {
      if (data.deletedCount == 1) {
        return res.json({ code: 200, messages: 'Product Deleted' })
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
  addproduct,
  listproduct,
  updateproduct,
  deleteproduct,
}
