let app = require('express').Router()
const userCtrl = require('./user.ctrl')
const userPerm = require('./user.perm')
const user = require('./user')
const session = require('../session/session')
//app.post('/create',userPerm.create,reportCtrl.create,report)
app.use('/getByUserID/:userID',userPerm.getByUserID,userCtrl.getByUserID,user)
app.post('/login',userPerm.login,userCtrl.login,session)
app.post('/signup',userPerm.signup,userCtrl.signup,user)

module.exports = app;