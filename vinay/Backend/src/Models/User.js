const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema (
   {
     firstName: {
        type :String,
        required:true,
        minLlength:3,
        maxLength:20
    },
    LastName:{
        type:String,
        minLlength:3,
        maxLength:20
    },
    Email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true,
        immutable:true
    },
    Age:{
        type:String,
        min:6,
        max:80
    },
    role:{
        type:String,
        ennum:['admin','user',],
        default:'user'
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'problem'
            
        }],
        unique:true
    },
    photo:{
        type:String,
        default:"This is user photo"

    },
    password:{
        type:String,
        required:true
    }
   }
,{
    timestamps:true
})
const User = mongoose.model("user",UserSchema);
module.exports = User;