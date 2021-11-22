const mongoose = require('mongoose')
const schema = mongoose.Schema

var userSchema = new schema({
  email: { type: String },
  password: { type: String },
  role: { type: String },
})

const User = mongoose.model('user', userSchema)
module.exports = User
