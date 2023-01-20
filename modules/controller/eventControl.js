const { validationResult } = require('express-validator');
const eventModel = require("../models/eventModel")
const userModel = require("../models/userModel")
const fs = require("fs")
const path = require("path")

//function for creating an event
exports.createEvent = async(req,res) => {
    // Validation error checking
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     let newErr = errors.array();
    //     // console.log(newErr);
    //     // console.log(newErr[0].msg)
    //     return res.status(400).json({ errors: newErr[0].msg });
    // }

    req.body=JSON.parse(JSON.stringify(req.body))
    // console.log(req.body)
    
    let data = req.body;

    if(req.files.files==undefined)
    {
        return res.status(400).json({
            success:false,
            errors:"Please enter photo of event."
        })
    }
    if(data.name==="")
    {
        return res.status(400).json({
            success:false,
            errors:"Please enter name of event."
        })
    }
    else if(data.duration==="")
    {
        return res.status(400).json({
            success:false,
            errors:"Please enter duration of event."
        })
    }
    else if(data.startingTime==="")
    {
        return res.status(400).json({
            success:false,
            errors:"Please enter starting time. of event."
        })
    }
    else if(data.endingTime==="")
    {
        return res.status(400).json({
            success:false,
            errors:"Please enter ending time of event."
        })
    }
    else if(data.date==="")
    {
        return res.status(400).json({
            success:false,
            errors:"Please enter date of event."
        })
    }
    else if(data.description === "")
    {
        return res.status(400).json({
            success:false,
            errors:"Please enter description of event."
        })
    }    

    if(req.files.files!=undefined)
        req.body.image=req.files.files[0].filename
    if(req.files.files1!=undefined)
        req.body.result=req.files.files1[0].filename

    try{
        //finding loged in user details
        const check=await userModel.User.findById(req.userID);

        //check wether user is admin or not
        if(check.type == "super")
        {
            const doc=new eventModel.Event(req.body);
            const result=await doc.save();            
            res.json({
                success:true,
                message:result
            })
        }
        else
            res.status(500).json({
                success:false,
                errors:"You are not allowed to create an event."
            })             
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            success:false,
            errors:"Some error occure"
        })
    }
}

//function for reading an event
exports.readEvent = async(req,res) => {
    try{
        const result=await eventModel.Event.find({deleted: false});
        res.json({
            success:true,
            message:result
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            success:false,
            errors:"Some error occure"
        })
    }
}

//function for reading single event
exports.readSingleEvent = async(req,res) => {
    try{
        const result = await eventModel.Event.findById(req.params.contestID);
        res.json({
            success:true,
            message:result
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            success:false,
            errors:"Some error occure"
        })
    }
}

//function for update event details
exports.updateEvent = async(req,res) => {

    req.body=JSON.parse(JSON.stringify(req.body))

    if(req.files.files!=undefined)
        req.body.image=req.files.files[0].filename
    if(req.files.files1!=undefined)
        req.body.result=req.files.files1[0].filename
    console.log(req.body);
    try{
        const check=await userModel.User.findById(req.userID);
        if(check.type=="super")
        {
            const result = await eventModel.Event.findById(req.params.id);

            //if event not found then don't allow user to go further
            if(!result)
                return res.status(500).json({
                    success:false,
                    errors:"Event not found"
                });
                                                
            data=req.body;
            const updateData=await eventModel.Event.findByIdAndUpdate(req.params.id,{ $set:data });            
            res.json({
                success:true,
                message:updateData
            })
        }
        else
            res.status(500).json({
                success:false,
                errors:"You are not allowed to update event."
            })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            success:false,
            errors:"Some error occure"
        })
    }
}

//delete an event
exports.deleteEvent = async(req,res) => {
    try{
        const check=await userModel.User.findById(req.userID);
        if(check.type=="super")
        {
            const result=await eventModel.Event.findById(req.params.id);

            //if event not found then don't allow user to go further
            if(!result)
                return res.status(500).json({
                    success:false,
                    errors:"Event not found"
                });

            const deleteData = await eventModel.Event.findByIdAndDelete(req.params.id);            
            res.json({
                success:true,
                message:deleteData
            })
        }
        else
        {
            res.status(500).json({
                success:false,
                errors:"You are not allowed to delete event."
            })
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            success:false,
            errors:"Some error occure"
        })
    }
}

exports.findImage = (req,res) => {
    // console.log(req.params.imageUrl)
    let imageURL=req.params.imageUrl;
    if(imageURL!=undefined)
    {
        const temp=fs.readFileSync(`./modules/uploads/events/${imageURL}`)        
        // res.setHeader("Content-Type","image/jpeg")
        res.send(temp);
    }
    // res.json("Hello");
}

exports.getImage = async(req,res) => {

    // console.log(req.params.resultUrl)    
    let resultUrl=req.params.resultUrl;
    if(resultUrl!=undefined)
    {
        const temp=fs.readFileSync(`./modules/uploads/result/${resultUrl}`)        
        // res.setHeader("Content-Type","image/jpeg")
        res.send(temp);
    }        
}