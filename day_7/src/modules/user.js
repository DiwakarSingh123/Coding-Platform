const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30,
        trim:true
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:30,
        trim:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    age:{
        type:Number,
        min:5,
        max:80
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    problemSolved:{
        type:[String],
        default: [] // undefined ki jagah empty show karega
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema);

module.exports=User;