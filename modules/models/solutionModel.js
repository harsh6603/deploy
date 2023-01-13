const mongoose=require("mongoose");

const solutionSchema=new mongoose.Schema({
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    questionNo:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    ioformat:{
        type:String,
        required:true
    },
    constraints:{
        type:String,
        required:true
    },
    inputs:{
        type:String,
        required:true
    },
    outputs:{
        type:String,
        required:true
    },
    solutions:{
        type:Array
    },
    deleted:{
        type:Boolean,
        required:true,
        default:false
    }   
})

exports.Solutions=new mongoose.model("Solutions",solutionSchema)