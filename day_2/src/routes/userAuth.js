const express=require('express');
const authRouter=express.Router();
const {register, login} = require('../controllers/userAuthenticat');
// here Routing of user Register,Login,Logout,getProfile
authRouter.post('/register', register);
authRouter.post('/login', login);
// authRouter.post('/logout', logout);
// authRouter.post('/getprofile', getProfile);

module.exports=authRouter;