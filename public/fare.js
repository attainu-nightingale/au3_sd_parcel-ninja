console.log("hello");

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

$("#showorders").on("click", function() {
  var name = $("#name").text();
  $("tbody").html("");
  $.ajax({
    url: "/clientdashboard/orders",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].Clientname == name) {
          console.log(data[i]);
          console.log(data[i].Clientname);
          $("tbody").append(
            "<tr><td>" +
              data[i]._id +
              "</td><td>" +
              data[i].deliveryaddress +
              "</td><td>" +
              data[i].pickupaddress +
              "</td><td>" +
              data[i].status +
              "</td></tr>"
          );
        }
      }
    }
  });
});
