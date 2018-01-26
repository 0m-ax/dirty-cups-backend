let app = require('express').Router()
const genderCtrl = require('./gender.ctrl')
app.use('/',genderCtrl.export)
module.exports = app;