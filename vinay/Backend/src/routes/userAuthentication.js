const express =require('express');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware =require('../middleware/adminMiddleware')
 const authrouter =express.Router();
 const {register,login,logout,adminRegister,deletethisProfile} = require("../controller/userauthenticate");
//  register
authrouter.post('/register',register);
authrouter.post('/login',login);
authrouter.post('/logout',userMiddleware,logout);
authrouter.post('/admin/register',adminMiddleware,adminRegister)
authrouter.delete('/deleteProfile',userMiddleware,deletethisProfile)
// authrouter.get('getprofile',getprofile);



module.exports =authrouter;
// login
// logout
// get profile