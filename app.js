var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var login = require("./routes/login");
var signup = require("./routes/signup");
var track = require("./routes/track");
var clientdashboard = require("./routes/clientdashboard");
var ninjadashboard = require("./routes/ninjadashboard");
var messages = require("./routes/messages.js");

var app = express();

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

var db;
var mongoclient = require("mongodb").MongoClient;
mongoclient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true },
  function(err, client) {
    if (err) throw err;
    db = client.db("parcelninja");
  } 
);
app.use(
  session({
    secret: "Express session secret"
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/login", login);
app.use("/signup", signup);
app.use("/track", track);
app.use("/clientdashboard", clientdashboard);
app.use("/ninjadashboard", ninjadashboard);
app.use("/messages", messages);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/public/about.html");
});
app.get("/contact", function(req, res) {
  res.sendFile(__dirname + "/public/contact.html");
});
/* app.get("/admin", function(req, res) {
  res.sendFile(__dirname + "/public/login.html");
}); */

app.listen(5000, function() {
  console.log("port is running!!!");
});
