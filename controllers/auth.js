const User = require("../models/user")
const crypt = require("bcryptjs")
const {sanitizeUser} = require("../services/common")
const jwt = require('jsonwebtoken')

const createUser = async(req,res)=>{
    const userData = req.body;
    try {
        const user = new User(userData)
        const savedUser = await user.save();
        res.status(200).json(savedUser)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const loginUser = async(req, res)=>{
    
    const {email , password } = req.body;
   try{
        const user = await User.findOne({email})
        // console.log(user)
        if(!user){
            res.status(400);
            throw new console.error("user not found");
        }
        const passwordIsCorrect = password != user.password ? false : true;
        if (user && passwordIsCorrect){
            res.status(200).json(user)
        }
        else{
            res.status(400);
            throw new Error("invalid mail or password")
        }
    } catch(err){
        res.status(400).json(err)
    }

}

module.exports = {
    createUser,
    loginUser
}