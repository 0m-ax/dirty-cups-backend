const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
let app = express()
app.use(cookieParser('im old gregg'))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://dirtycups.dev.maxc.in');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const User = require('./lib/user')
const Session = require('./lib/session')
app.use(async (req,res,next)=>{
    try {
        if(req.query.sessionID){
            let session = await Session.getSession(req.query.sessionID)
            if(!session){
                throw new Error('session not found')
            }
            let user = User.getByUserID(session.userID)
            if(!user){
                throw new Error('user not found')
            }
            req.user = user;
        }
    } catch (error) {
        next(error)
    }
    next()
})
app.use(require('./app'))
app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).json({
        message:err.message,
        stack:err.stack
    })
})
app.listen(3000)