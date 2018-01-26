const r = require('./rethinkdb')
const Contact = require('./contact')
const ContactType = require('./contactType')
const Region = require('./region')
const Gender = require('./gender')
const WorkType = require('./workType')

class Report{
    static create({regionID,workTypeID,genderID,time,contacts}){
        return Promise.all([
            Promise.all(contacts.map((contact)=>ContactType.getByContactTypeID(contact.contactTypeID)))
            .then((contactTypes)=>contactTypes.reduce((acu,contactType)=>(contactType && acu)?true:null,true)),
            Region.getByRegionID(regionID),
            WorkType.getByWorkTypeID(workTypeID),
            Gender.getByGenderID(genderID)
        ])
        .then((requierments)=>{
            if(!requierments.reduce((acu,requierment)=>(requierment && acu)?true:false,true)){
                throw new Error("unknow refrence")
            }
        })
        .then(()=>r.table('report').insert({
            regionID:regionID,
            genderID:genderID,
            time:time,
            workTypeID:workTypeID,
            contacts:contacts
        },{returnChanges:true}).run())
        .then((resp)=>resp.changes[0]['new_val'])
        .then(Report._loadContacts)
        .then((report)=>new Report(report))
    }
    static getByReportID(reportID){
        return r.table('report').get(reportID)
        .then(Report._loadContacts)
        .then((report)=>report?new Report(report):null)
    }
    static searchReportsByContactHandle(handle){
        return r.table('report').filter(function (doc){
            return doc('contacts').contains(function (contact){
                return contact('handle').downcase().eq(r.expr(handle).downcase())
            })
        }).run()
        .then((reports)=>{
            console.log(reports)
            return reports
        })
        .then((reports)=>reports.map(Report._loadContacts))
        .then((reports)=>reports.map((report)=>new Report(report)))
    }
    static _loadContacts(report){
        report.contacts = report.contacts.map((contact)=>new Contact(contact))
        return report
    }
    constructor({reportID,contacts,workTypeID,regionID,genderID,time}){
        this.reportID = reportID;
        this.contacts = contacts
        this.workTypeID = workTypeID
        this.regionID = regionID
        this.genderID = genderID;
        this.time = time
    }
    export(){
        return {
            reportID:this.reportID,
            contacts:this.contacts,
            workTypeID:this.workTypeID,
            regionID:this.regionID,
            genderID:this.genderID,
            time:this.time
        }
    }
}

module.exports = Report;
r.tableCreate('report',{
    primaryKey:'reportID'
})
.catch(function (){ })
.then(()=>r.table('report').delete())

// contacts = [
//     {
//         type:"email",
//         user:"maxc@maxc.in"
//     },
//     {
//         type:"phone",
//         user:"000000"
//     },
//     {
//         type:"adultWork",
//         user:"creep"
//     }
// ]
