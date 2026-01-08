const guest = async(req, res, next) => {
	if(req.logged_in){
		return res.status(403).json({
			success: false,
			message: "You are already logged in"
		});
	}
	return next();
}

module.exports = {guest}