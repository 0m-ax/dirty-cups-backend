let r = require('rethinkdbdash')({
    host:'rethinkdb-rethinkdb-cluster',
    password:'password'
})
module.exports = r;
