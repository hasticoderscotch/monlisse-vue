const mongoose = require('mongoose')
const schema = mongoose.Schema

var categorySchema = new schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
})

const Category = mongoose.model('category', categorySchema)
module.exports = Category
