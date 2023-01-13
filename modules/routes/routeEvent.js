const express=require("express");
const router=express.Router();
const authentication = require("../middleware/authentication")
const { body } = require('express-validator');
const eventControl=require("../controller/eventControl")
const multer = require("multer")

const storage=multer.diskStorage({

    destination:(req,res,cb) => {
        cb(null,"./backend/modules/uploads")
    },    

    filename: (req,file,cb) => {
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const upload = multer({storage:storage});

//create event for logged in user
router.post("/createEvent",authentication.authenticateUser,upload.single("files"),eventControl.createEvent)
    
//read event
router.get("/readEvent",eventControl.readEvent);

//get image
router.get("/image/:imageUrl",eventControl.findImage);

//update event
router.patch("/updateEvent/:id",authentication.authenticateUser,upload.single("files"),eventControl.updateEvent);

//delete event
router.delete("/deleteEvent/:id",authentication.authenticateUser,eventControl.deleteEvent);

module.exports = router;
