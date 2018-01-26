module.exports.export = (req,res,next)=>{
    res.json(req.data.contactTypes.map((contactType)=>contactType.export()))
}