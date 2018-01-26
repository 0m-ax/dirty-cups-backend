const Redis = require('ioredis');
let redis = new Redis({
    host:'redis-redis',
    password:'password'
})
module.exports = redis;