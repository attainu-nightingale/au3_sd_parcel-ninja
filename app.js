var express = require("express");
var app = express();

var ninjalogin = require("./routes/ninjalogin");
var customerlogin = require("./routes/customerlogin");

var ninjasignup = require("./routes/ninjasignup");
var customersignup = require("./routes/customersignup");


app.use("/ninjalogin", ninjalogin);
app.use("/ninjasignup", ninjasignup);
app.use("/customerlogin", customerlogin);
app.use("/customersignup", customersignup);

app.listen(3000, function(){
    console.log("listening on port 3000");
});