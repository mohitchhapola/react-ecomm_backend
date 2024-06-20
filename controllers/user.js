const User = require("../models/user")

const fetchUserById = async(req,res)=>{
    const { email } = req.query;  // Destructure the id from req.params
    // res.send(`User ID: ${users}`);
    try {
        const user = await User.findOne({email:email})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    } 
}

const updateUser = async(req,res)=>{
    const {id} = req.params;
    try {
        const doc = await User.findByIdAndUpdate(id, req.body,{new:true})
        res.status(200).json(doc)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}




module.exports ={
    fetchUserById,
    updateUser
}