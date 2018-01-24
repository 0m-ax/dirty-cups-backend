const express = require('express')
const cookieParser = require('cookie-parser')
let app = express()
app.use(cookieParser('im old gregg'))
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
app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).json({
        message:err.message
    })
})
app.listen(3000)