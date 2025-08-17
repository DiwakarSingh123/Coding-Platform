const express =require('express')
const dotenv =require('dotenv')
dotenv.config();
const main =require('./config/db')
 const cookieParser = require('cookie-parser'); // ✅ correct
 
 const authrouter = require("./routes/userAuthentication");
const redisClient = require('./config/redisClient');

const problem = require('./routes/problemCreate')

const submitRouter =require("./routes/submit")

const App = express();

App.use(express.json());
App.use(cookieParser());

App.use('/user',authrouter);
App.use('/problem',problem);
App.use('/submission',submitRouter)


const InitializeConnection  = async()=>{

    try{
        await Promise.all([main(), redisClient.connect()])
        console.log("DB Connected");
         App.listen(process.env.PORT,()=>{
    console.log("server listen at port "+process.env.PORT)});
        
        
    }catch(err){
        console.log("Error"+ err);

    }
}

InitializeConnection();
 

