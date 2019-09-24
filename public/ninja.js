$("#available").click(function() {
  $("#availability").empty();
  $("#availability").append("<p>Available</p>");
  var availability = "available";
  var id = 001;
  $.ajax({
    url: "ninjadashboard/status", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      status: availability
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
    }
  });
});
$("#not_available").click(function() {
  $("#availability").empty();
  $("#availability").append("<p>Not Available</p>");
  var availability = "not available";
  var id = "001";
  $.ajax({
    url: "ninjadashboard/status", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      status: availability
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
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
