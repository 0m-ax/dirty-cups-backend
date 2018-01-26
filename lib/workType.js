const r = require('./rethinkdb')
class workType {
    static getAll(){
        return r.table('workType').run()
        .then((workTypes)=>workTypes.map((workType)=>new WorkType(workType)))
    }
    static create({name}){
        return r.table('workType').insert({
            name:name
        },{returnChanges:true})
        .then((resp)=>new WorkType(resp.changes[0]['new_val']))
    }
    static getByWorkTypeID(workTypeID){
        return r.table('workType').get(workTypeID)
        .then((workType)=>workType? new WorkType(workType) : null)
    }
    constructor({workTypeID,name}){
        this.workTypeID = workTypeID;
        this.name = name;
    }
    export(){
        return {
            workTypeID:this.workTypeID,
            name:this.name
        }
    }
}
module.exports = workType;
r.tableCreate('workType',{
    primaryKey:'workTypeID'
})
.catch(function (){})
.then(()=>r.table('workType').delete())
.then(()=>r.table('workType').insert([
    {
        workTypeID:'street',
        name:"street",
    },
    {
        workTypeID:'incall',
        name:"in-call",
    }
]))