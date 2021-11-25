const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

var userSchema = new schema({
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
})

Users = module.exports = mongoose.model('user', userSchema)

Users.countDocuments()
  .then((data) => {
    if (data == 0) {
      console.log('no data')
      addAdmin()
    } else {
      Users.findOne({ role: 'ADMIN' }).then((result) => {
        if (result == null) {
          // console.log("data but no admin")
          addAdmin()
        } else {
          console.log('There is already admin')
        }
      })
    }
  })
  .catch((err) => {
    console.error({ err })
  })

async function addAdmin() {
  let obj = {
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'ADMIN',
  }

  let updatedPass = await bcrypt.hashSync(obj.password, bcrypt.genSaltSync(10))
  obj.password = updatedPass
  let admin = new Users(obj)
  admin.save(function (err, result) {
    err ? console.log(err) : console.log('admin created successfully.')
  })
}
