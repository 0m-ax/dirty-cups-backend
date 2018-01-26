let app = require('express').Router()
const contactTypeCtrl = require('./contactType.ctrl')
const contactType = require('./contactType')
const contactTypes = require('./contactTypes')
app.post('/create',contactTypeCtrl.create,contactType)
app.use('/getAll',contactTypeCtrl.getAll,contactTypes)
module.exports = app;