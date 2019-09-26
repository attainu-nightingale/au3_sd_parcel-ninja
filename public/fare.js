$("#cal").on("click", function() {
  var fare;
  var origin = $("#pickUp").val();
  var destination = $("#drop").val();
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
      unitSystem: google.maps.UnitSystem.METRIC
    },
    callback
  );

  function callback(response, status) {
    if (status == "OK") {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      var distance = response.rows[0].elements[0].distance.text;
      dist = parseInt(distance, 10);
      console.log(dist);
      fare = fareCalc(dist);
      $("#fare").attr("value", fare);
      $("#fare").attr("placeholder", fare);
    }
  }
  function fareCalc(distance) {
    console.log("h");
    var cost;

    if (distance < 20) {
      cost = 200;
    } else if (20 < distance < 40) {
      cost = 500;
    } else {
      cost = 700;
    }
    return cost;
  }
});
