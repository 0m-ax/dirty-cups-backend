let app = require('express').Router()
const reportCtrl = require('./report.ctrl')
const reportPerm = require('./report.perm')
const report = require('./report')
app.post('/create',reportPerm.create,reportCtrl.create,report)
app.use('/getByReportID/:reportID',reportPerm.getByReportID,reportCtrl.getByReportID,report)
app.post('/searchReportsByContactHandle',reportPerm.searchReportsByContactHandle,reportCtrl.searchReportsByContactHandle,report)

module.exports = app;