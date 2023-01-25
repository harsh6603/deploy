const express=require("express");
const router=express.Router();
const authentication = require("../middleware/authentication")
const { body } = require('express-validator');
const eventControl=require("../controller/eventControl")
const multer = require("multer")

const storage=multer.diskStorage({

    destination:(req,file,cb) => {
        if (file.fieldname === "files") {
            cb(null,"./modules/uploads/events")
        }
        else if (file.fieldname === "files1") {
            cb(null,"./modules/uploads/result")
        }
        // cb(null,"./backend/modules/uploads")
    },    

    filename: (req,file,cb) => {
        if (file.fieldname === "files") {
            cb(null,Date.now()+'-'+file.originalname)
        }
        else if (file.fieldname === "files1") {
            cb(null,Date.now()+'-'+file.originalname)
        }
        // cb(null,Date.now()+'-'+file.originalname)
    }
})

const upload = multer({storage:storage});

//create event for logged in user
router.post("/createEvent",authentication.authenticateUser,upload.fields([{name:"files",maxCount:1},{name:"files1",maxCount:1}]),eventControl.createEvent)
    
//read event
router.get("/readEvent",eventControl.readEvent);

//read single event
router.get("/readSingleEvent/:contestID",eventControl.readSingleEvent);

//get image
router.get("/image/:imageUrl",eventControl.findImage);

//get image
router.get("/imageInQuestions/:resultUrl",eventControl.getImage);

//update event
router.patch("/updateEvent/:id",authentication.authenticateUser,upload.fields([{name:"files",maxCount:1},{name:"files1",maxCount:1}]),eventControl.updateEvent);

//delete event
router.delete("/deleteEvent/:id",authentication.authenticateUser,eventControl.deleteEvent);

module.exports = router;
