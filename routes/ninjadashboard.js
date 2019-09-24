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

router.post("/status", function(req, res) {
  var status = req.body.status;
  db.collection("ninja").update(
    { id: req.query.id },
    { $set: { availability: status } },
    function(err, result) {
      if (err) throw err;
      console.log(req.body);
      res.redirect("/ninjadashboard");
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
