module.exports.export = (req,res,next)=>{
    res.json(req.data.regions.map((region)=>region.export()))
}