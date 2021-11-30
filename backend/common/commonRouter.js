const commonRouter = require('express').Router()
const service = require('./commonService')
const express = require('express')

commonRouter.route('/upload').post([], (req, res) => {
  service.uploadPhoto(req, res)
})

module.exports = commonRouter
