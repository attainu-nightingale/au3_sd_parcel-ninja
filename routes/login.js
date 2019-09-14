var express = require("express");
var session = require("express-session");
var router = express.Router();

var mongoClient = require("mongodb").MongoClient;
var db;
mongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  function(err, client) {
    if (err) throw err;
    db = client.db("parcelninja");
  }
);
router.use(
  session({
    secret: "Express session secret"
  })
);
router.use(express.urlencoded({ extended: false }));
router.use(express.static("public"));
router.get("/", function(req, res) {
  res.sendFile("login.html", { root: "public" });
});
var flag = false;
router.post("/", function(req, res) {
  if (req.body.name) {
    db.collection("ninja")
      .find({ email: "req.body.email", password: "req.body.password" })
      .toArray(function(err, result) {
        if (err) {
          res.redirect("/login");
          throw err;
        }
        req.session.loggedIn = true;
        res.redirect("/login/user");
      });
  }
  db.collection("ninjaUser")
    .find({ email: "req.body.email", password: "req.body.password" })
    .toArray(function(err, result) {
      if (err) {
        res.redirect("/login");
        throw err;
      }
      req.session.loggedIn = true;
      res.redirect("/login/user");
    });
});
router.get("/user", function(req, res) {
  if (req.session.loggedIn) {
    res.redirect("/clientdashboard");
  } else {
    res.redirect("/login");
  }
});
module.exports = router;
