const solutionModel=require("../models/solutionModel");
const userModel=require("../models/userModel");
const { validationResult } = require('express-validator');

/**
 * function for creating a solution
 * @param {*} req 
 * @param {*} res 
 */
exports.createSolution = async(req,res) => {
    //Validation error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErr = errors.array();
        // console.log(newErr);
        // console.log(newErr[0].msg)
        return res.status(400).json({ errors: newErr[0].msg });
    }

    try{
        //finding loged in user details
        const check=await userModel.User.findById(req.userID);

        //check whether user is admin or not
        if(check.type === "super")
        {
            req.body.eventId=req.params.CID;
            const doc=new solutionModel.Solutions(req.body);
            const result=await doc.save();            
            res.json({
                success:true,
                message:result
            })
        }
        else
        {
            res.status(500).json({
                success:false,
                errors:"You are not allowed to create question."
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

/**
 * function for reading questions
 * @param {*} req 
 * @param {*} res 
 */
exports.readQuestions = async(req,res) => {
    try{
        const result=await solutionModel.Solutions.find({deleted:false,eventId:req.params.CID});        
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

/**
 * function for reading one question
 * @param {*} req 
 * @param {*} res 
 */
 exports.readOneQuestion = async(req,res) => {
    try{
        const result=await solutionModel.Solutions.find({deleted:false,_id:req.params.QID});
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


exports.updateQuestion = async(req,res) => {
    try{
        const check = await userModel.User.findById(req.userID);

        //check user is admin or not
        if(check.type=="super")
        {
            const result = await solutionModel.Solutions.findById(req.params.QID);

            if(!result)
                return res.status(500).json({
                    success:false,
                    errors:"Question not found"
                });

            data=req.body;
            const updateData = await solutionModel.Solutions.findByIdAndUpdate(req.params.QID,{ $set:data });
            res.json({
                success:true,
                message:updateData
            })            
        }
        else
            res.status(500).json({
                success:false,
                errors:"You are not allowed to make changes."
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

exports.deleteQuestions = async(req,res) => {

}