Report = require('../../lib/report')
Contact = require('../../lib/contact')

module.exports.create = (req,res,next)=>{
    Report.create({
        regionID:req.body.report.regionID,
        genderID:req.body.report.genderID,
        time:new Date(req.body.report.time),
        contacts:req.body.report.contacts.map((contact)=>new Contact(contact)),
        workTypeID:req.body.report.workTypeID
    })
    .then((report)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.report = report
        next()
    })
    .catch((error)=>next(error || new Error("unkown error")))
}
module.exports.getByReportID = (req,res,next)=>{
    Report.getByReportID(req.params.reportID)
    .then((report)=>{
        if(!req.data){
            req.data = {}
        }
        req.data.report = report
        next()
    })
    .catch((error)=>next(error || new Error("unkown error")))
}
module.exports.searchReportsByContactHandle = (req,res,next)=>{
    Report.searchReportsByContactHandle(req.body.report.handle)
    .then((report)=>{
        if(!req.data){
            req.data = {}
        }
        res.json(report)
    })
    .catch((error)=>next(error || new Error("unkown error")))
}
