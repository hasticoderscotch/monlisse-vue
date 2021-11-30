const util = require('../app util/util')
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

var uploadPhoto = multer({ storage: storage })

// app.use('/uploads', express.static('uploads'))

// function uploadPhoto(req, res) {
//   const { image } = req.body
//   base64Img.img(image, './public', Date.now(), function (err, filepath) {
//     const pathArr = filepath.split('/')
//     const fileName = pathArr[pathArr.length - 1]
//     res.json({ code: 200, url: fileName })
//   })
// }

module.exports = {
  uploadPhoto,
}
