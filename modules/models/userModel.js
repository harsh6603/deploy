const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    type:{
        type:String,
        required:true,
        default:"normal"
    }
})

exports.User=new mongoose.model("User",UserSchema)