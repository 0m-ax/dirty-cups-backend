let app = require('express').Router()
const regionCtrl = require('./region.ctrl')
const region = require('./region')
const regions = require('./regions')
app.post('/create',regionCtrl.create,region)
app.use('/getAll',regionCtrl.getAll,regions)
module.exports = app;