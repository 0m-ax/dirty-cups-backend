let app = require('express').Router()
const contactTypeCtrl = require('./contactType.ctrl')
app.use('/',contactTypeCtrl.export)
module.exports = app;