const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    startingTime:{
        type:String,
        required:true
    },
    endingTime:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    result:{
        typr:String,
        default:""
    },
    deleted:{
        type:Boolean,
        required:true,
        default:false
    }    
})

exports.Event=new mongoose.model("Event",eventSchema);