module.exports.export = (req,res,next)=>{
    res.json(req.data.workTypes.map((workType)=>workType.export()))
}