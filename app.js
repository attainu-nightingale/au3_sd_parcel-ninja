var express = require("express");
var app = express();

var login = require("./routes/login");
var signup = require("./routes/signup");

app.use("/login", login);
app.use("/signup", signup);

app.listen(3000, function(){
    console.log("listening on port 3000");
});