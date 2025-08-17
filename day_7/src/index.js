const express=require('express');
const app=express();
require('dotenv').config();
const main=require('./database');
const authRouter=require('./routes/userAuth');
const cookieParser = require('cookie-parser');
const redisClient=require('./config/redis');
const problemRouter =require('./routes/problemCreator');

app.use(express.json());
app.use(cookieParser());


// user Authentication code here....
app.use('/api',authRouter);
app.use('/problem',problemRouter);


function inilizeConnection(){

    Promise.all([main(),redisClient.connect()]);
    console.log("Database & Redis connected");

    app.listen(process.env.PORT_NUMBER, ()=>{
    console.log("Server lishening at Port "+process.env.PORT_NUMBER);
    
    })
}

inilizeConnection();
// main()
// .then(()=>{
//     console.log("database connected");

//     app.listen(process.env.PORT_NUMBER, ()=>{
//     console.log("Server lishening at Port "+process.env.PORT_NUMBER);
    
//     })
// })
// .catch((err) => console.log(err));

