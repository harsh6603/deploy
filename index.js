const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 7000
dotenv.config({path:"./backend/.env"});
const path=require("path");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"*"
}));

//database connection
require("./db");


app.get("/",(req,res) => {
    res.send("Hello world");
})

app.use("/api/user",require("./modules/routes/routeUser"))
app.use("/api/event",require("./modules/routes/routeEvent"))
app.use("/api/solution",require("./modules/routes/routeSolution"))

app.listen(port,() => {
    console.log("Server connected at "+port);
})