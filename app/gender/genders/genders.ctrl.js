module.exports.export = (req,res,next)=>{
    res.json(req.data.genders.map((gender)=>gender.export()))
}