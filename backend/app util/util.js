const jwt = require('jsonwebtoken')
var path = require('path')
var multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './img')
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + path.extname(file.originalname))
//   },
// })

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }

// var upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 50,
//   },
//   fileFilter: fileFilter,
// })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback)
  },
})

function checkFileType(file, callback) {
  const fileTypes = /jpeg|jpg|png|gif|svg/
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  if (extName) {
    return callback(null, true)
  } else {
    callback('Error:Images only!')
  }
}

function generateToken(data, secret) {
  let obj = {
    id: data._id,
    email: data.email,
  }
  return jwt.sign(obj, secret, { expiresIn: '1hr' })
}

function decodeToken(token) {
  return jwt.decode(token)
}

var verifyAdminToken = async function (jwtToken) {
  try {
    let payload = await jwt.verify(jwtToken, process.env.ADMIN_SECRET)
    return payload
  } catch (e) {
    return res.json({ code: 400, message: 'Internal server error' })
  }
}

module.exports = {
  generateToken,
  decodeToken,
  upload,
  checkFileType,
  verifyAdminToken,
}
