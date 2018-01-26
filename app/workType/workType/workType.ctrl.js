module.exports.export = (req,res,next)=>{
    res.json(req.data.workType.export())
}