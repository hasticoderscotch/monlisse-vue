const util = require('../app util/util')

function uploadPhoto(req, res) {
  req.newFile_name = []
  util.upload(req, res, async function (err) {
    if (err) {
      return res.json({ code: 400, message: err })
    } else {
      const files = req.files
      let index, len
      var filepathlist = []
      for (index = 0, len = files.length; index < len; ++index) {
        let filepath = process.env.IMAGEPREFIX + files[index].path.slice(4)
        filepathlist.push(filepath)
      }
      return res.json({
        code: 201,
        data: filepathlist,
      })
    }
  })
}

module.exports = {
  uploadPhoto,
}
