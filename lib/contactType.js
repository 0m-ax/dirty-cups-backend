const r = require('./rethinkdb')
class ContactType {
    static getAll(){
        return r.table('contactType').run()
        .then((contactTypes)=>contactTypes.map((contactType)=>new ContactType(contactType)))
    }
    static create({name}){
        return r.table('contactType').insert({
            name:name
        },{returnChanges:true})
        .then((resp)=>new ContactType(resp.changes[0]['new_val']))
    }
    static getByContactTypeID(contactTypeID){
        return r.table('contactType').get(contactTypeID).run()
        .then((contactType)=>contactType?new ContactType(contactType):null)
    }
    constructor({contactTypeID,name}){
        this.contactTypeID = contactTypeID;
        this.name = name;
    }
    export(){
        return {
            contactTypeID:this.contactTypeID,
            name:this.name
        }
    }
}
module.exports = ContactType;
r.tableCreate('contactType',{
    primaryKey:'contactTypeID'
})
.catch(function (){})
.then(()=>r.table('contactType').delete())
.then(()=>r.table('contactType').insert([
    {
        contactTypeID:'email',
        name:"Email",
        handleName:"Email address"
    },
    {
        contactTypeID:'phone',
        name:"Email",
        handleName:"Email address"
    }
]))