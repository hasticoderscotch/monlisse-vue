const commonRouter = require('express').Router()
const service = require('./commonService')
const express = require('express')
const util = require('../app util/util')

commonRouter
  .route('/upload')
  .post([util.upload.single('categoryImage')], (req, res) => {
    if (!req.file) return res.send('Please upload a file')
    var tempPath = req.file.path
    console.log(tempPath)
  })

module.exports = commonRouter
