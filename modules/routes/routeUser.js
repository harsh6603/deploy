const express=require("express");
const router=express.Router();
const userControl=require("../controller/userControl")
const { body } = require('express-validator');
const authentication=require("../middleware/authentication")

router.post("/signup",[
    body('name',"please enter name").exists().notEmpty(),
    body('email',"Please enter email").exists().notEmpty(),
    body("email","PLease enter valid email").isEmail(),
    body("password","Please enter password").exists().notEmpty(),
    body("password","Please enter strong password").isStrongPassword(),
    body("email","Please enter valid email.").custom(value => {
        return userControl.findUserByEmail(value)
        .then(user => {
            if(user.length!=0)
            {
                return Promise.reject('E-mail already exist.');
            }
        })
    })
],userControl.createUser)

router.post("/login",[
    body("email","Please enter email").exists().notEmpty(),
    body("email","Please enter valid email").isEmail(),
    body("password","Please enter password").exists().notEmpty(),
],userControl.login)

router.get("/getUser",authentication.authenticateUser,userControl.getUser);

module.exports=router;