let app = require('express').Router()
const regionCtrl = require('./region.ctrl')
app.use('/',regionCtrl.export)
module.exports = app;