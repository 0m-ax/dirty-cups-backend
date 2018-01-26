let app = require('express').Router()
const contactTypesCtrl = require('./contactTypes.ctrl')
app.use('/',contactTypesCtrl.export)
module.exports = app;