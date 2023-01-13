const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://admin:admin123456@codechefbvm.lib5snr.mongodb.net/bvm_codechef?retryWrites=true&w=majority";

mongoose.connect(mongoURL)
.then(() => {
    console.log("connected.");
}).catch((err) => {
    console.log(err);
})