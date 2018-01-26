let app = require('express').Router()
const workTypesCtrl = require('./workTypes.ctrl')
app.use('/',workTypesCtrl.export)
module.exports = app;