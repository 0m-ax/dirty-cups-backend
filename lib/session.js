const uuid = require('uuid')
const redis = require('./redis')
const User = require('./user')
class Session {
    static createSession(user){
        let sessionID = uuid.v4()
        return redis.set(sessionID,user.userID)
        .then(()=>new Session({sessionID,userID:user.userID}))
    }
    static getSession(sessionID){
        return redis.get(sessionID)
        .then((userID)=>{
            if(userID == null){
                let error = new Error('session not found')
                error.statusCode = 500
                throw error;
            }
            return userID;
        })
        .then((userID)=>r.table('users').get(userID))
    }
    constructor({sessionID,userID}){
        this.sessionID = sessionID;
        this.userID = userID;
    }
}
module.exports = Session;