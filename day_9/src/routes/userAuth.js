const express=require('express');
const authRouter=express.Router();
const {register, login,logout,adminRegister,deleteProfile} = require('../controllers/userAuthenticat');
const userMiddleware=require('../middleware/userMiddleware');
const adminMiddleware=require('../middleware/adminMiddleware');

// here Routing of user Register,Login,Logout,getProfile
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.post('/admin/register', adminMiddleware, adminRegister);
authRouter.delete('/deleteprofile',userMiddleware,deleteProfile)
// authRouter.post('/getprofile', getProfile);

module.exports=authRouter;