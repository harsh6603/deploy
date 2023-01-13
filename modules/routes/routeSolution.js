const express=require("express");
const { body } = require("express-validator");
const router=express.Router();
const solutionControl=require("../controller/solutionControl");
const authentication=require("../middleware/authentication")

//create solution
router.post("/createSolution/:CID",authentication.authenticateUser,[
    body("questionNo","Please enter question No.").exists().notEmpty(),
    body("questionNo","Please enter only digits in question number.").isDecimal(),
    body("name","Please enter name of question.").exists().notEmpty(),
    body("question","Please enter file of question.").exists().notEmpty(),
    body("ioformat","Please enter file of input output format").exists().notEmpty(),
    body("constraints","Please enter file of constarints").exists().notEmpty(),
    body("inputs","Please enter file of input test case.").exists().notEmpty(),
    body("outputs","Please enter file of output test case.").exists().notEmpty(),
    body("solutions","Please enter at least one solution").exists().notEmpty()
],solutionControl.createSolution);

//read questions
router.get("/readQuestions/:CID",solutionControl.readQuestions);

//read one question
router.get("/readQuestion/:QID",solutionControl.readOneQuestion);

//update one question
router.patch("/updateQuestion/:QID",authentication.authenticateUser,solutionControl.updateQuestion);

//delete one question 
router.delete("/deleteQuestion/:QID",authentication.authenticateUser,solutionControl.deleteQuestions);

module.exports = router;