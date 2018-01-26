let app = require('express').Router()
const genderCtrl = require('./gender.ctrl')
const gender = require('./gender')
const genders = require('./genders')
app.post('/create',genderCtrl.create,gender)
app.use('/getAll',genderCtrl.getAll,genders)
module.exports = app;