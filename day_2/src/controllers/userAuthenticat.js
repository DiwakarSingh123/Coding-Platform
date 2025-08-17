const User=require('../modules/user');
const validate=require('../utils/validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const register= async(req,res) =>{

  try{
    const data=req.body;
    console.log(data);
    
    // Validating user information........
    validate(data);

    const {firstName,emailId,password}=data;
    data.password=await bcrypt.hash(password,10);
    const user=await User.create(data);
    console.log(user);
    
    // now time we provoide token to user to directly access the dashboard so here use jwt tokens..
    const token=jwt.sign({"_id":user._id,"emailId":user.emailId},process.env.SECERATE_KEY,{expiresIn: 60 * 60})
    res.cookie('token',token,{maxAge: 60 * 60* 1000});

    res.status(200).json({ message: "User Resister Seccesfully" });
    
  }catch(err){
    res.status(400).send("Error"+err);
  }

}

const login = async (req,res) =>{
   try{
     const {emailId,password}=req.body;
    // if(!emailId){
    //     throw new Error("EmailId is missing");
        
    // }
    // if(!password){
    //     throw new Error("Password is missing");
        
    // }
    const user = await User.findOne({emailId});
    if(!user){
        throw new Error("Invalid EmailId");
    }
    const comparePassword= await bcrypt.compare(password,user.password);
    if(!comparePassword){
        throw new Error("Invalid Cradential");
    }

    //Now provoiding jwt token user......
    const token=jwt.sign({"_id":user._id,"emailId":user.emailId},process.env.SECERATE_KEY,{expiresIn: 60 * 60});
    res.cookie('token',token,{maxAge: 60 * 60 * 1000});
    res.status(200).json({ message: "Login API working" });
   }catch(err){
    res.status(401).send("Error"+err)
   }

}

module.exports = {
  register,
  login,
//   logout,
//   getProfile
};