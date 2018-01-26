Gender = require('../../lib/gender')
module.exports.getAll = (req,res,next)=>{
    Gender.getAll()
    .then((genders)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.genders = genders
        next()
    })
    .catch((error)=>next(error||new Error("unkown error")))
}
module.exports.create = (req,res,next)=>{
    Gender.create({
        name:req.body.gender.name
    })
    .then((gender)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.gender = gender
        next()
    })
    .catch((error)=>next(error || new Error("unkown error")))
}