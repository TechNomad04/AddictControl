const { User, Addict, Family } = require('../models/Users.model.js');

const make_object = (user)=>{
	return {
		name: user.name,
		email: user.email,
		phone: user.phone
	};
}

const profile_addict = async(req, res)=>{
	const user_id = req.user_id;
	try{
		const user = await Addict.findById(user_id.toString());
		const basic_info = make_object(user);
		return res.status(200).json({
			basic_info,
			sobriety: user.sobriety
		});
	}
	catch(err){
		return res.status(500).json({
			success: false,
			message: "Some internal server error"
		});
	}
}

const profile_member = async(req, res)=>{
	const user_id = req.user_id;
	try{
		const user = await Family.findById(user_id.toString());
		const basic_info = make_object(user);
		return res.status(200).json({
			basic_info,
			addict_member: user.addict_member_email
		});
	}
	catch(err){
		return res.status(500).json({
			success: false,
			message: "Some internal server error"
		});
	}
}

const logout = async(req, res)=>{
	try{
		const user_id = req.user_id;
		const user = await User.findById(user_id.toString());
		user.refreshToken = "";
		await user.save();

		return res.status(200).json({
			success: true,
			message: 'User logged out'
		});
	}
	catch(err){
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "Error logging out"
		});
	}
}

const addict_data = async(req, res) => {
	try {
		const user_id = req.user_id;
		console.log('user id',user_id);
		const addict_mail = await Family.findById(user_id.toString())
		console.log('addict', addict_mail.addict_member_email)

		if(!addict_mail || !user_id)
			return res.status(404).json({status: false, message: "User not found"})

		const addict = await Addict.findOne({email: addict_mail.addict_member_email})
		if(!addict)
			return res.status(404).json({status: false, message: "User not found"})

		

		return res.status(200).json({status: true, email: addict.email, phone: addict.phone, sobriety: addict.sobriety, name: addict.name, age: addict.age, language: addict.language})
	} catch (err) {
		console.log(err)
		return res.status(500).json({status: false, message: "Internal server error"})
	}
}

module.exports = {
	profile_addict,
	profile_member,
	logout,
	addict_data
}
