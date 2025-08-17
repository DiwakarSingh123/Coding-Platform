const User = require("../Models/User");
const validate = require("../utils/Validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require("../config/redisClient");
const  Submission = require('../Models/submission');

const register = async (req, res) => {
    try {
        validate(req.body);

        const { firstName, password, Email } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user';
        const user = await User.create(req.body);

        const token = jwt.sign({ Email: Email, _id: user._id,role:User.role}, process.env.JWT_SECRATE_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });

        const response = {

            user:user.firstName,
            Email:user.Email,}

        res.status(201).send({
            response,
            message:"Registration is Successful"
        });
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
}

const login = async (req, res) => {
    try {
        const { password, Email } = req.body;

        if (!Email || !password) {
            throw new Error('Credentials missing');
        }

        const user = await User.findOne({ Email });
        if (!user) {
            throw new Error('User not found');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ Email: user.Email, _id: user._id,role:User.role }, process.env.JWT_SECRATE_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });

        res.status(200).send('Login successful.');
    } catch (err) {
        res.status(401).send('Error: ' + err.message);
    }
}

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).send("No token found");
    }

    const payload = jwt.decode(token);

    if (!payload || !payload.exp) {
      return res.status(400).send("Invalid token");
    }

    // Mark the token as blocked in Redis
    await redisClient.set(`token:${token}`, 'blocked');

    // Set expiry based on token's expiry time (in seconds)
    await redisClient.expireAt(`token:${token}`, payload.exp);

    // Clear the cookie by setting it to null and expiring immediately
    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

    res.send("Logged out successfully");

  } catch (err) {
    res.status(503).send("Error: " + err.message);
  }
};

const adminRegister = async (req,res)=>{

     try {
        validate(req.body);

        const { firstName, password, Email } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'admin';
        const user = await User.create(req.body);

        const token = jwt.sign({ Email: Email, _id: user._id,role:User.role}, process.env.JWT_SECRATE_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });

        res.status(201).send('User registered successfully.');
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
  
}

const deletethisProfile = async (req,res)=>{

    try{


    const user   = req.user._id;

    await User.findByIdAndDelete(user);

   await  Submission.deleteMany(user);

   res.status(200).send('Profile deleted Succesfully');


    }catch(err){
        res.status(500).send("Internal server issue"+err)
    }

}



module.exports = { register, login,logout,adminRegister,deletethisProfile };
