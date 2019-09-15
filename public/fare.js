$("#book").on("click", function() {
  var distance;
  var fare;
  var origin = $("#pickUp").val();
  var destination = $("#drop").val();
  /* 
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
      distance = response.rows[0].elements[0].distance.text;
    }
  } */
  if (distance < 20) {
    fare = 200;
  } else if (20 < distance < 40) {
    fare = 500;
  } else {
    fare = 700;
  }
  var result = {
    id: $("#book").val(),
    fare: fare
  };
  $.ajax({
    url: "/clientdashboard/form",
    method: "post",
    data: result,
    dataType: "json",
    success: function(data) {
      console.log("sent");
    }
  });
  /*  $("#fare").attr("value", fare);
  $("#form").attr("action", "/clientdashboard/form");
  $("#form").submit(); */
});
