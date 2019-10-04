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
  res.render("logincustomer", { layout: false });
});
//ninjaUser
router.post("/customer", function(req, res) {
  db.collection("ninjaUser")
    .find({
      $and: [{ email: req.body.email }, { password: req.body.password }]
    })
    .toArray(function(err, result) {
      if (err) {
        throw err;
      } else {
        if (result == undefined || result.length == 0) {
          req.session.errMsg = "Invalid Credential";
          res.render("logincustomer", {
            layout: false,
            error: req.session.errMsg
          });
        } else {
          req.session.loggedIn = true;
          req.session.fname = result[0].first_name;
          req.session.lname = result[0].last_name;
          req.session.email = result[0].email;
          req.session.Address = result[0].Address;
          req.session.Phone = result[0].Phone;
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
    .find({
      $and: [{ email: req.body.email }, { password: req.body.password }]
    })
    .toArray(function(err, result) {
      if (err) {
        throw err;
      } else {
        if (result == undefined || result.length == 0) {
          req.session.errMsg = "Invalid Credential";
          res.render("loginninja", {
            layout: false,
            error: req.session.errMsg
          });
        } else {
          req.session.email = result[0].email;
          req.session.fname = result[0].first_name;
          req.session.lname = result[0].last_name;
          req.session.ninjaid = result[0]._id;
          req.session.loggedIn = true;

          res.redirect("/ninjadashboard/ninjadash");
        }
      }
    });
});

module.exports = router;
