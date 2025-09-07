const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.models')





const userRegister = async (req, res) => {
 try {
       const {username,email,password} = req.body;
    
    const exituser = await User.findOne({username})
    if(exituser){
        return res.status(400).json({message:"username already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,12);

    const newuser = new User({
        username,email,password:hashedPassword
    })
    await newuser.save();
    res.status(201).json({message:"user registered successfully"})
    
 } catch (error) {
    console.error('error in user registration:-',error)
    
 }


}

const userlogin = async(req,res)=>{
    try {
        const { email,pasword } = req.body;

        const existuser = await User.findOne({email})
        if(!existuser){
            return res.jsom({
                success:false;
                message:"eamil doen't exist,"
            })
        }
        const passwordMatch = await bcrypt.compare(pasword,existuser)
        if(!passwordMatch){
            return res.jsom({
                success:false ,
                message:'invaild password. please try again'
            })
        }

        const token = await Jwt.sign({
            username:existuser.username,paswword:existuser.password, paswword:existuser.password
        })
        
    } catch (error) {
        console.log("userlogin from auth.controllers>>>>",error);
        
    }
}



module.exports = {userRegister}