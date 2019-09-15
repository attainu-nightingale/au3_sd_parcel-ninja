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
router.post("/", function(req, res) {
  console.log(req.body);
  if (req.body.name) {
    db.collection("ninja")
      .find({})
      .toArray(function(err, result) {
        if (err) {
          throw err;
          res.redirect("/login");
        }
        for (var i = 0; i < result.length; i++) {
          if (
            result[i].email == req.body.email &&
            result[i].password == req.body.password
          ) {
            req.session.loggedIn = true;
            res.redirect("/login/ninja");
          }
        }
      });
  } else {
    db.collection("ninjaUser")
      .find({})
      .toArray(function(err, result) {
        if (err) {
          throw err;
          res.redirect("/login");
        }
        for (var i = 0; i < result.length; i++) {
          if (
            result[i].email == req.body.email &&
            result[i].password == req.body.password
          ) {
            req.session.loggedIn = true;
            res.redirect("/login/user");
          }
        }
      });
  }
});

router.get("/user", function(req, res) {
  if (req.session.loggedIn) {
    res.redirect("/clientdashboard");
  } else {
    res.redirect("/login");
  }
});

router.get("/ninja", function(req, res) {
  if (req.session.loggedIn) {
    res.redirect("/ninjadashboard");
  } else {
    res.redirect("/login");
  }
});
router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});
module.exports = router;
