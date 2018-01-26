const r = require('./rethinkdb')
class User{
    createUser(email){
        return this.getByEmail(email)
        .then((user)=>{
            if(user !== null){
                throw new Error("user exists")
            }
        })
        .then(()=>{
            r.table('users').insert({
                email:email
            })
            .then((resp)=>resp)
        })
    }
    getByUserID(userID){
        return r.table('users')
        .get(userID)
        .then((user)=>{
            if(user){
                return new User(user)
            }
            return null;
        })
    }
    getByEmail(email){
        return r.table('users')
        getAll(email, {index:'email'})
        .then((user)=>{
            if(user){
                return new User(user)
            }
            return null;
        })
    }
    constructor({userID,email}){
        this.email = email
        this.userID = userID
    }
}
module.exports = User;
r.tableCreate('users',{
    primaryKey:'userID'
})
.catch(function (){})
.then(()=>r.table('users').indexCreate('email'))
.catch(function (){})
