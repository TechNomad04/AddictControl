const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models/users.model.js');

const generateAccessToken =  (user) => {
    return jwt.sign(
        {id: user._id, role: user.role},
        process.env.ACCESS_TOKEN,
        {expiresIn: '15m'}
    )
}

const generateRefreshAccessToken = (user) => {
    return jwt.sign(
        {id: user._id, role: user.role},
        process.env.REFRESH_ACCESS_TOKEN,
        {expiresIn: '15d'}
    )
}

const hashRefreshToken = async (token) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(token, salt);
};

const getUserFromToken = async(token)=>{
	if(!token) {console.log('Token not found'); return null;}
	let decoded;

	try{
		decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(decoded._id.toString()).select('-password -refreshToken');
		if(!user){ console.log('In guft, user not found'); return null;}
		return user;
		console.log(decoded);
	}
	catch(err){
		console.log('inside get user from token', err);
		return null;
	}
}


module.exports = {
    generateAccessToken,
    generateRefreshAccessToken,
    hashRefreshToken,
	getUserFromToken
}
