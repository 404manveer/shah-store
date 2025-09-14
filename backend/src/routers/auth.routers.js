const express = require('express');
const router = express.Router();
const {userRegister,userlogin,authMiddleware, userLogout} = require('../controllers/auth.controllers')

router.post('/register',userRegister  )
router.post('/login',userlogin  )
router.post('/logout',userLogout  )
router.get('/check-auth',authMiddleware,(req,res)=>{
    // const user =req.user
    res.status(200).json({
        success:true,
        message:"Authenticated user",
        user:req.user
    })
}  )






module.exports = router;