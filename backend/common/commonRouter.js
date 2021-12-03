const commonRouter = require('express').Router()
const service = require('./commonService')
const express = require('express')
const util = require('../app util/util')

commonRouter
  .route('/category-upload')
  .post([util.upload.single('categoryImage')], (req, res) => {
    console.log(JSON.stringify(req.file))

    const file = req.file

    var filepathlist
    let filepath = file.path.slice(4)
    console.log('uploadPhoto -> filepath', filepath)
    filepathlist = req.file

    return res.json({
      code: 'Files uploaded successfully.',
      message: 200,
      data: filepathlist,
    })

    // return res.send({
    //   data: req.file,
    //   message: 'File uploaded successfully.',
    // })
  })

commonRouter
  .route('/product-upload')
  .post([util.upload.array('productImages', 5)], (req, res) => {
    console.log(JSON.stringify(req.files))
    const files = req.files
    let index, len
    var filepathlist = []
    for (index = 0, len = files.length; index < len; ++index) {
      let filepath = files[index].path.slice(4)
      console.log('uploadPhoto -> filepath', filepath)
      filepathlist.push(filepath)
    }

    return res.json({
      code: 'Files uploaded successfully.',
      message: 200,
      data: req.files,
    })

    // return res.send({
    //   data: req.files,
    //   message: 'Files uploaded successfully.',
    // })
  })

commonRouter.route('/category-image').get((req, res) => {})

module.exports = commonRouter
