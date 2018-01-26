let app = require('express').Router()
const gendersCtrl = require('./genders.ctrl')
app.use('/',gendersCtrl.export)
module.exports = app;