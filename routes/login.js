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
router.get("/ninja", function(req, res) {
  res.render("loginninja", { layout: false });
});
router.get("/customer", function(req, res) {
  res.render("loginclient", { layout: false });
});

router.post("/customer", function(req, res) {
  db.collection("ninjaUser")
    .find({})
    .toArray(function(err, result) {
      if (err) {
        throw err;
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
});

router.post("/ninja", function(req, res) {
  console.log(req.body);
  db.collection("ninja")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (i != result.length - 1) {
          if (
            result[i].email == req.body.email &&
            result[i].password == req.body.password
          ) {
            req.session.loggedIn = true;
            req.session.email = result[i].email;

            res.redirect("/login/ninjadash");
          }
        }
      }
    });
});

router.get("/user", function(req, res) {
  if (req.session.loggedIn) {
    res.redirect("/clientdashboard");
  } else {
    res.redirect("/login/customer");
  }
});

router.get("/ninjadash", function(req, res) {
  console.log(req.session.email);
  if (req.session.loggedIn) {
    db.collection("ninja")
      .find({ email: req.session.email })
      .toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        res.render("ninjadashboard", {
          title: "Ninja Dashboard",
          script: "./ninja.js",
          data: result
        });
      });
  } else {
    res.redirect("/login/ninja");
  }
});
router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login/customer");
});
module.exports = router;
