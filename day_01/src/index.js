const express=require('express');
const app=express();
require('dotenv').config();
const main=require('./database');
require('../src/')
// const User=require('../src/modules/user');
const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/port',(req,res)=>{
    res.send("Hellow Duniya");
    console.log("operation going on");
    
})

main()
.then(()=>{
    console.log("database connected");

    app.listen(process.env.PORT_NUMBER, ()=>{
    console.log("Server lishening at Port "+process.env.PORT_NUMBER);
    
    })
})
.catch((err) => console.log(err));

