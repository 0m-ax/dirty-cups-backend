User = require('../../lib/user')
module.exports.login = (req,res,next)=>{
    User.login(req.body)
    .then((session)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.session = session
        next()
    })
    .catch((error)=>next(error||new Error("unknown error")))
}
module.exports.signup = (req,res,next)=>{
    User.signup(req.body)
    .then((user)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.user = user
        next()
    })
    .catch((error)=>next(error||new Error("unknown error")))
}
module.exports.getByUserID = (req,res,next)=>{
    User.getByUserID(req.params.userID)
    .then((user)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.user = user
        next()
    })
    .catch((error)=>next(error||new Error("unknown error")))
}