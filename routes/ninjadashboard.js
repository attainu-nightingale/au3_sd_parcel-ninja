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

router.post("/statusAvail", function(req, res) {
  console.log(req.body);
  db.collection("ninja").update(
    { id: req.body.id },
    { $set: { Availability: req.body.status } },
    function(err, result) {
      if (err) throw err;
      res.send("updated");
    }
  );
});
router.post("/statusDuty", function(req, res) {
  console.log(req.body);
  db.collection("ninja").update(
    { id: req.body.id },
    { $set: { duty: req.body.duty } },
    function(err, result) {
      if (err) throw err;
      res.send("updated");
    }
  );
});
router.get("/orders", function(req, res) {
  db.collection("parcel")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
});
module.exports = router;
