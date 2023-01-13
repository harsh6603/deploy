const userModel=require("../models/userModel");
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
SECRET = process.env.JWT_SECRET;

//To enter new user data in database
exports.createUser = async(req,res) =>{
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErr = errors.array();
        // console.log(newErr);
        // console.log(newErr[0].msg)
        return res.status(400).json({ success: false, errors: newErr[0].msg });
    }
    try{
        hashPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashPassword;        
        const user = new userModel.User(req.body);        
        const result=await user.save();
        console.log(result);
        const data={
            id:result._id,
            name:result.name,            
        }
        console.log(data);
        const token=jwt.sign(data,SECRET);
        console.log(token);
        const responce={
            success:true,
            token:token,
            name:result.name,
            email:result.email,
            type:(result.type)?result.type:"normal"
        }    
        res.json({
            success:true,
            message:responce
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            success:false,
            errors:"Some error occure."
        })
    }
}

//check wether email is present in database or not
exports.findUserByEmail = (mail) => {
    return userModel.User.find({email:mail});
}

//login user
exports.login = async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErr = errors.array();
        // console.log(newErr);
        // console.log(newErr[0].msg)
        return res.status(400).json({ success: false, errors: newErr[0].msg });
    }

    try{
        const loginData = req.body;
        const result = await userModel.User.findOne({ email:loginData.email });
        console.log(result);

        if(!result)
        {
            res.status(400).json({
                success:false,
                errors:"Invalid login details"
            });
        }
        else
        {
            const checkPassword = await bcrypt.compare(loginData.password,result.password);
            if(checkPassword == false)
            {
                res.status(400).json({
                    success:false,
                    errors:"Invalid login details"
                })
            }
            else
            {
                const data={
                    id:result._id,
                    name:result.name                    
                }                
                const token=jwt.sign(data,SECRET);
                res.json({
                    success:true,
                    token:token,
                    name:result.name,
                    email:result.email,
                    type:result.type                    
                })
            }
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

//fetch user details
exports.getUser = async(req,res) => {
    try{
        userID=req.userID;
        const result=await userModel.User.findOne({_id:userID});        
        res.json({
            success:true,
            message:result
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            errors:"Some error occure"
        })
    }
}

exports.getApi = (req,res) => {
    res.json("Hello");
}
