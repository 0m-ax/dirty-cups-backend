let app = require('express').Router()
const regionsCtrl = require('./regions.ctrl')
app.use('/',regionsCtrl.export)
module.exports = app;