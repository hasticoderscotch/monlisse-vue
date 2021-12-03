const mongoose = require('mongoose')
const schema = mongoose.Schema

var productSchema = new schema({
  name: { type: String },
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  isActive: { type: Boolean },
  slug: { type: String },
  productImages: { type: Array },
  quantity: { type: Number },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
})

const Product = mongoose.model('product', productSchema)
module.exports = Product
