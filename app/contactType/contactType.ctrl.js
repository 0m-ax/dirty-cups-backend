ContactType = require('../../lib/contactType')
module.exports.getAll = (req,res,next)=>{
    ContactType.getAll()
    .then((contactTypes)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.contactTypes = contactTypes
        next()
    })
    .catch((error)=>next(error||new Error("unkown error")))
}
module.exports.create = (req,res,next)=>{
    ContactType.create({
        name:req.body.region.name
    })
    .then((contactType)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.contactType = contactType
        next()
    })
    .catch((error)=>next(error || new Error("unkown error")))
}