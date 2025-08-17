const express=require('express');
const app=express();
require('dotenv').config();
const main=require('./database');
const authRouter=require('./routes/userAuth');
// const User=require('../src/modules/user');

app.use(express.json());

// user Authentication code here....
app.use('/api',authRouter);

main()
.then(()=>{
    console.log("database connected");

    app.listen(process.env.PORT_NUMBER, ()=>{
    console.log("Server lishening at Port "+process.env.PORT_NUMBER);
    
    })
})
.catch((err) => console.log(err));

