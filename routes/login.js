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
  res.sendFile("loginninja.html", { root: "public" });
});
router.get("/customer", function(req, res) {
  res.sendFile("logincustomer.html", { root: "public" });
});
//ninjaUser
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
          req.session.fname = result[i].first_name;
          req.session.lname = result[i].last_name;
          req.session.email = result[i].email;
          res.redirect("/login/user");
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
//ninja
router.post("/ninja", function(req, res) {
  db.collection("ninja")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (
          result[i].email == req.body.email &&
          result[i].password == req.body.password
        ) {
          req.session.loggedIn = true;
          req.session.email = result[i].email;
          req.session.fname = result[i].first_name;
          req.session.lname = result[i].last_name;

          res.redirect("/ninjadashboard/ninjadash");
        }
      }
    });
});

module.exports = router;
