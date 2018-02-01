let app = require('express').Router()
app.use('/report',require('./report'))
app.use('/gender',require('./gender'))
app.use('/workType',require('./workType'))
app.use('/region',require('./region'))
app.use('/contactType',require('./contactType'))
app.use('/user',require('./user'))


module.exports = app;