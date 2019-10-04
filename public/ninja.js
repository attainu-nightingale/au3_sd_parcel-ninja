$("#available").click(function() {
  var id = $("#id").val();
  $.ajax({
    url: "/ninjadashboard/statusAvail", //Your api url
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

$(document).ready(function() {
  var id = $("#book").val();

  $("#clienttable").DataTable({
    processing: true,
    serverSide: true,
    bInfo: false,
    ajax: { url: "/ninjadashboard/orders", dataSrc: "" },
    columns: [
      { data: "_id" },
      { data: "Clientname" },
      { data: "deliveryaddress" },
      { data: "mobilenumber" },
      { data: "pickupaddress" },
      { data: "status" }
    ]
  });
  $("#clienttable tbody").on("click", "tr", function() {
    $(this).toggleClass("selected");
  });
  $("#inTransit").click(function() {
    var table = $("#clienttable").DataTable();
    var ids = table.rows(".selected").data()[0]._id;

    $.ajax({
      url: "/ninjadashboard/orderUpdate", //Your api url
      type: "post", //type is any HTTP method
      data: {
        nid: ids,
        status: "in transit"
      }, //Data as js object
      success: function() {
        alert(" status changed to in-Transit succesfully");
      }
    });
    console.log(ids);
  });
});

$("#Delieverd").click(function() {
  var table = $("#clienttable").DataTable();
  var ids = table.rows(".selected").data()[0]._id;

  $.ajax({
    url: "/ninjadashboard/orderUpdate", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: ids,
      status: "Delieverd"
    }, //Data as js object
    success: function() {
      alert(" status changed to Delieverd succesfully");
    }
  });
  console.log(ids);
});
/* 
$("#newOrder").on("click", function() {
  console.log("k");
  var id = $("#id").val();
  $("tbody").html("");
  $.ajax({
    url: "/ninjadashboard/orders",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].status);
        if (data[i].ninjaid == id && data[i].status == "yet to be picked") {
          $("tbody").append(
            "<tr><td>" +
              data[i]._id +
              "</td><td>" +
              data[i].Clientname +
              "</td><td>" +
              data[i].deliveryaddress +
              "</td><td>" +
              data[i].pickupaddress +
              "</td><td>" +
              data[i].mobilenumber +
              "</td><td>" +
              data[i].locality +
              "</td><td>" +
              data[i].Pincode +
              "</td></tr>"
          );
        }
      }
    }
  });
});
$("#delieverdOrders").on("click", function() {
  console.log("ki");
  var id = $("#id").val();
  $("tbody").html("");
  $.ajax({
    url: "/ninjadashboard/orders",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].status);
        if (data[i].ninjaid == id && data[i].status == "delieverd") {
          $("tbody").append(
            "<tr><td>" +
              data[i]._id +
              "</td><td>" +
              data[i].Clientname +
              "</td><td>" +
              data[i].deliveryaddress +
              "</td><td>" +
              data[i].pickupaddress +
              "</td><td>" +
              data[i].mobilenumber +
              "</td><td>" +
              data[i].locality +
              "</td><td>" +
              data[i].Pincode +
              "</td></tr>"
          );
        }
      }
    }
  });
});
 */
