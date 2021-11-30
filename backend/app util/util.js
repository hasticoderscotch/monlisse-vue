const jwt = require('jsonwebtoken')
var path = require('path')
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './img')
  },
  filename: function (req, file, callback) {
    let file_name =
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    req.newFile_name.push(file_name)
    callback(null, file_name)
  },
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback)
  },
}).array('img', 5)

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
