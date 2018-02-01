let app = require('express').Router()
const userCtrl = require('./user.ctrl')
const userPerm = require('./user.perm')
app.use('/',userPerm.export,userCtrl.export)

module.exports = app;