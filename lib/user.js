const r = require('./rethinkdb')
const bcrypt = require('bcrypt');
const Session = require('./session')
class User{
    static async signup({email,password}){
        if(!(email && password)){
            throw new Error("email or password not provided")
        }
        let hash = await bcrypt.hash(password, 10)
        let existitingUser = await User.getByEmail(email)
        if(existitingUser){
            throw new Error("email in use")
        }
        return r.table('users').insert({
            email:email,
            hash:hash
        },{returnChanges:true})
        .run()
        .then((resp)=>resp.changes[0]['new_val'])
        .then((user)=>new User(user))
    }
    static getByUserID(userID){
        return r.table('users')
        .get(userID)
        .run()
        .then((user)=>{
            if(user){
                return new User(user)
            }
            return null;
        })
    }
    static getByEmail(email){
        return r.table('users')
        .getAll(email, {index:'email'})
        .run()
        .then((users)=>users[0])
        .then((user)=>{
            if(user){
                return new User(user)
            }
            return null;
        })
    }
    static async login({email,password}){
        let user = await User.getByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        if(!await user.checkPassword(password)){
            throw new Error("user not found")
        }
        return Session.createSession(user)
    }
    constructor({userID,email,hash}){
        this.email = email
        this.userID = userID
        this.hash = hash;
    }
    checkPassword(password){
        return bcrypt.compare(password, this.hash)
    }
    export(){
        return {
            userID:this.userID,
            email:this.email
        }
    }
    delete() {
       return  r.table('users').get(this.userID).delete().run()
    }
   async  updatePassword(password, newPassword) {
       let isCorrect = await this.checkPassword(password)
        if (!await this.checkPassword(password)) {
            throw new Error ('passwords do not match')
        }
        let hash = await bcrypt.hash(newPassword, 10)
        return r.table('users').get(this.userID).update({
            hash
        })
        .run()
    }
}
module.exports = User;
r.tableCreate('users',{
    primaryKey:'userID'
})
.catch(function (){})
.then(()=>r.table('users').indexCreate('email'))
.catch(function (){})
