Region = require('../../lib/region')
module.exports.getAll = (req,res,next)=>{
    Region.getAll()
    .then((regions)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.regions = regions
        next()
    })
    .catch((error)=>next(error||new Error("unkown error")))
}
module.exports.create = (req,res,next)=>{
    Region.create({
        name:req.body.region.name
    })
    .then((region)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.region = region
        next()
    })
    .catch((error)=>next(error || new Error("unkown error")))
}