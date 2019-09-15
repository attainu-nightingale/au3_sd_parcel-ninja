$("#track").on("click", function() {
  var id = $("#trackId").val();
  var status;
  $.ajax({
    url: "/track",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (i = 0; i < data.length; i++) {
        if ((data[i].orderId = id)) {
          status = data[i].status;
          console.log(status);
          $("#status").text(
            "your parcel with id   " + id + "  is  being" + status
          );
        }
      }
    }
  });
  $("#exampleModal").modal("show");
});
