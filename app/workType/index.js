let app = require('express').Router()
const workTypeCtrl = require('./workType.ctrl')
const workType = require('./workType')
const workTypes = require('./workTypes')
app.post('/create',workTypeCtrl.create,workType)
app.use('/getAll',workTypeCtrl.getAll,workTypes)
module.exports = app;