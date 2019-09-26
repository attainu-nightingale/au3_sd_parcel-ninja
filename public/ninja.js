// availibilty status
$("#available").click(function() {
  var id = $("#id").val();
  $.ajax({
    url: "/ninjadashboard/status", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      status: "Available"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#availability").text("Available");
    }
  });
});
$("#not_available").click(function() {
  var id = $("#id").val();

  $.ajax({
    url: "/ninjadashboard/statusAvail", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      status: "Not Available"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#availability").text(" Not Available");
    }
  });
});
//duty status
$("#Onduty").click(function() {
  var id = $("#id").val();
  $.ajax({
    url: "/ninjadashboard/statusDuty", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      duty: "On Duty"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#duty").text("On Duty");
    }
  });
});
$("#Offduty").click(function() {
  var id = $("#id").val();

  $.ajax({
    url: "/ninjadashboard/statusDuty", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      duty: "Off Duty"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#duty").text("Off Duty");
    }
  });
});
/* $("orders").on("click", function() {
  var id = $("#id").val();
  $.ajax({
    url: "/orders",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i]._id == id) {
          status = data[i].status;
        }
      }
    }
  });
}); */
