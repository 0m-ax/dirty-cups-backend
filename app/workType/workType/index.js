let app = require('express').Router()
const workTypeCtrl = require('./workType.ctrl')
app.use('/',workTypeCtrl.export)
module.exports = app;