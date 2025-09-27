const express = require('express');
const router = express.Router();
const {userRegister,userlogin,authMiddleware, userLogout} = require('../controllers/auth.controllers')

router.post('/register',userRegister  )
router.post('/login',userlogin  )
router.get('/logout',userLogout  )
router.get('/check-auth',authMiddleware,(req,res)=>{
    
    res.status(200).json({
        success:true,
        message:"Authenticated user",
        user:req.user
    })
}  )






module.exports = router;