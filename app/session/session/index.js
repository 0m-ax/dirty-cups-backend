let app = require('express').Router()
const sessionCtrl = require('./session.ctrl')
const sessionPerm = require('./session.perm')
app.use('/',sessionPerm.export,sessionCtrl.export)
module.exports = app;