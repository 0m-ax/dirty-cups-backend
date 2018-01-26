WorkType = require('../../lib/workType')
module.exports.getAll = (req,res,next)=>{
    WorkType.getAll()
    .then((workTypes)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.workTypes = workTypes
        next()
    })
    .catch((error)=>next(error||new Error("unkown error")))
}
module.exports.create = (req,res,next)=>{
    WorkType.create({
        name:req.body.workType.name
    })
    .then((workType)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.workType = workType
        next()
    })
    .catch((error)=>next(error || new Error("unkown error")))
}