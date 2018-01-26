module.exports.export = (req,res,next)=>{
    res.json(req.data.gender.export())
}