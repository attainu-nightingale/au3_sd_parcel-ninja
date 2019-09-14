var express = require("express");
var exphbs = require("express-handlebars");
var login = require("./routes/login");
var signup = require("./routes/signup");
var clientdashboard = require("./routes/clientdashboard");
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

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/login", login);
app.use("/signup", signup);
app.use("/clientdashboard", clientdashboard);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/public/about.html");
});
app.get("/contact", function(req, res) {
  res.sendFile(__dirname + "/public/contact.html");
});
app.get("/admin", function(req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

app.listen(5000, function() {
  console.log("port is running!!!");
});
