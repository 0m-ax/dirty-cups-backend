let app = require('express').Router()
const reportCtrl = require('./report.ctrl')
app.use('/',reportCtrl.export)
module.exports = app;