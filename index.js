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
/*
const User = require('./lib/user')
const Session = require('./lib/session')
app.use((req,res,next)=>{
    console.log(req.cookies)
    if(req.cookies.sessionID){
        Session.getSession(req.cookies.sessionID)
        .then((user)=>{req.user = user})
        .then(()=>next())
        .catch((error)=>next())
    }else{
        next()
    }
})

app.get('/newSession',(req,res,next)=>{
    let user = new User({
        userID:'meme',
        email:'test'
    })
    Session.createSession(user)
    .then((session)=>{
        res.cookie('sessionID',session.sessionID, { maxAge: 900000, httpOnly: true });
        res.send(session)
    })
    .catch(next)
})

app.get('/getSession/:sessionID',(req,res,next)=>{
    console.log(req.user)
    Session.getSession(req.params.sessionID)
    .then((session)=>res.send(session))
    .catch(next)
})

*/
app.use(require('./app'))
app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).json({
        message:err.message,
        stack:err.stack
    })
})
app.listen(3000)