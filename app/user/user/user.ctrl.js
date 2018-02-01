module.exports.export = (req,res,next)=>res.send(req.data.user.export())

module.exports.delete = function(req, res, next) {
	req.data.user.delete()
	.then(resp => {
		res.json({resp})
	})
	.catch(err => next(err || new Error ('unknown error')))
}

module.exports.updatePassword = function(req, res, next) {
	req.data.user.updatePassword(req.body.password, req.body.newPassword)
	.then(resp => {
		res.json({resp})
	})
	.catch(err => next(err || new Error ('unknown error')))
}