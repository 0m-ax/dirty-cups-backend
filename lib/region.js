const r = require('./rethinkdb')
class Region {
    static getAll(){
        return r.table('region').run()
        .then((regions)=>regions.map((region)=>new Region(region)))
    }
    static create({name}){
        return r.table('region').insert({
            name:name
        },{returnChanges:true})
        .then((resp)=>new Region(resp.changes[0]['new_val']))
    }
    static getByRegionID(regionID){
        return r.table('region').get(regionID)
        .then((region)=>region? new Region(region) : null)
    }
    constructor({regionID,name}){
        this.regionID = regionID;
        this.name = name;
    }
    export(){
        return {
            regionID:this.regionID,
            name:this.name
        }
    }
}
module.exports = Region;
r.tableCreate('region',{
    primaryKey:'regionID'
})
.catch(function (){})
.then(()=>r.table('region').delete())
.then(()=>r.table('region').insert([
    {
        regionID:'nw',
        name:"North West",
    },
    {
        regionID:'sw',
        name:"South West",
    }
]))