const r = require('./rethinkdb')
class Gender {
    static getAll(){
        return r.table('gender').run()
        .then((genders)=>genders.map((gender)=>new Gender(gender)))
    }
    static create({name}){
        return r.table('gender').insert({
            name:name
        },{returnChanges:true})
        .then((resp)=>new Gender(resp.changes[0]['new_val']))
    }
    static getByGenderID(genderID){
        return r.table('gender').get(genderID)
        .then((gender)=>gender? new Gender(genderID) : null)
    }
    constructor({genderID,name}){
        this.genderID = genderID;
        this.name = name;
    }
    export(){
        return {
            genderID:this.genderID,
            name:this.name
        }
    }
}
module.exports = Gender;
r.tableCreate('gender',{
    primaryKey:'genderID'
})
.catch(function (){})
.then(()=>r.table('gender').delete())
.then(()=>r.table('gender').insert([
    {
        genderID:'male',
        name:"male",
    },
    {
        genderID:'female',
        name:"female",
    }
]))