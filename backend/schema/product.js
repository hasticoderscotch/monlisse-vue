const mongoose = require('mongoose')
const schema = mongoose.Schema

var productSchema = new schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number, min: 2, max: 15 },
  compare_price: { type: Number, min: 2, max: 15 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
})
