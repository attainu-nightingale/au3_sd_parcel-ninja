const express = require("express");
const router = express.Router();
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
router.get("/", function(req, res) {
  if (req.session.loggedIn) {
    db.collection("ninja")
      .find({})
      .toArray(function(err, result) {
        if (err) {
          throw err;
        }
        res.render("client", {
          title: "Client Dashboard",
          style: "/client.css",
          script: "/fare.js",
          fname: req.session.fname,
          lname: req.session.lname,
          email: req.session.email,
          data: result
        });
      });
  } else {
    res.redirect("/login/customer");
  }
});

router.post("/profileUpdate", function(req, res) {
  console.log(req.body);
  db.collection("ninjaUser").updateOne(
    { email: req.body.email },
    {
      $set: {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        Phone: req.body.Phone,
        Address: req.body.Address
      }
    },
    function(err, result) {
      if (err) throw err;
      res.redirect("/clientdashboard");
    }
  );
});

router.post("/form", function(req, res) {
  console.log(req.body);
  res.render("form", {
    name: req.session.fname,
    id: req.body.booking,
    fare: req.body.fare,
    pickupaddress: req.body.pickupaddress,
    deliveryaddress: req.body.deliveryaddress
  });
});

router.post("/parceldetails", function(req, res) {
  var id;
  var myobj = {
    Clientname: req.body.Clientname,
    Fare: req.body.fare,
    addresseename: req.body.addresseename,
    mobilenumber: req.body.mobilenumber,
    ninjaid: req.body.ninjaid,
    pickupaddress: req.body.pickupaddress,
    deliveryaddress: req.body.deliveryaddress,
    locality: req.body.locality,
    City: req.body.City,
    Pincode: req.body.Pincode,
    status: "yet to be picked"
  };
  db.collection("parcel").insertOne(myobj, function(err, result) {
    if (err) {
      throw err;
    }
    id = result._id;
    console.log(id);
  });
  res.render("order", { layout: false, orderid: id });
});

router.get("/orders", function(req, res) {
  console.log(req.body);
  if (req.session.loggedIn) {
    db.collection("parcel")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
      });
  }
});
router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login/customer");
});
module.exports = router;
