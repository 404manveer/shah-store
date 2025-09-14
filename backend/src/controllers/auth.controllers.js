const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.models");

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exituser = await User.findOne({ username });
    if (exituser) {
      return res.status(400).json({ message: "username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newuser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newuser.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.error("error in user registration:-", error);
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existuser = await User.findOne({ email });
    if (!existuser) {
      return res.json({
        success: false,
        message: "eamil doen't exist,",
      });
    }
    const passwordMatch = await bcrypt.compare(password, existuser.password);
    if (!passwordMatch) {
      return res.jsom({
        success: false,
        message: "invaild password. please try again",
      });
    }

    const token = jwt.sign(
      {
        username: existuser.username,
        email: existuser.email,
        id:existuser._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "None"   }).json({
      success: true,
      message: "Logged in succesfully",
      user: {
        name: existuser.username,
        email: existuser.email,
        role: existuser.role,
        id: existuser._id,
      },
    });
  } catch (error) {
    console.log("userlogin from auth.controllers>>>>", error);
  }
};

const userLogout = async (req,res)=>{
    res.clearcookie("token").status(200).json({
      success:true,
        message:"logout successfully"
    })
}

const authMiddleware = async(req,res,next)=>{
    const token = req.cookie?.token;
    if(!token) return res.status(401).json({
              success:false,
              message:"unauthorized user"
    })

    try {
         const decoded = jwt.verify(token, process.env.JWT_KEY)
         req.user = decoded
         next()
        
    } catch (error) {
      console.log(error);
      
        res.status(401).json({
            success:false,
            message:"Unauthorized user"
        })
        
    }
}

module.exports = { userRegister, userlogin,userLogout,authMiddleware };
