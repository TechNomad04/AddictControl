const { Family } = require('../models/Users.model.js');
const { Addict } = require('../models/Users.model.js');

const request_phone_call = async(req, res)=>{
	const user_id = req.user._id;
	try{
		const family_member = await Family.findById(user_id.toString(), "addict_member_email").lean();
		const addict_email = family_member.addict_member_email;
		const alcoholic = await Addict.findOne({email:addict_email});

		if(!alcoholic){
			return res.status(404).json({
				success: false,
				message: "Requested user not found"
			});
		}
		return res.status(200).json({
			success: true,
			message: "Call and test requested"
		});
	}
	catch(error){
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Some internal server error, try again"
		});
	}
}

const accept_call = async(req, res)=>{


module.exports = {
	request_phone_call
}
