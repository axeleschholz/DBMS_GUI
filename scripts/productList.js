//fire the getData() function when the page loads
$(document).ready(function () {
  //get all the data
  getData();
});

//this method will "get" all data, build the table rows and insert the HTML into the table body
function getData() {
  //make a request to server.php
  $.get("server.php?action=getProducts", function (data) {
    //iterate over the JSON response, building an HTML string
    var html_string = "";

    $(data).each(function (key, object) {
      //HTML table row
      html_string += '<tr id="' + object["Product_id"]; //Add a conditional for organic = green
      '"><td>' +
        object["Name"] +
        "</td><td>" +
        object["Brand"] +
        "</td><td>" +
        object["Description"] +
        "</td><td>" +
        object["Lifetime"] +
        "</td><td>";
      html_string +=
        '<a href="#" onclick="getRecordById(' +
        object["customer_id"] +
        '); return false;">view</a>&nbsp;';
      html_string += "</td></tr>";
    });

    //set the HTML string on the client
    $("#table_body").html(html_string);
  });
}

//this method will "get" a specific record (by id) and open a Dialog to view the details (e.g. email address)
function getDetails(id) {
  $.get("server.php?action=getProducts&id=" + id, function (data) {
    //build the dynamic HTML
    var html_string = "";
    html_string +=
      "<tr></td><td colspan=6><table style='border-spacing:5px'><thead class='thead-dark'><tr><th>Order No.</th><th>Total</th><th>Description</th><th>Date</th></tr></thead><tbody>";
    $(data).each(function (key, object) {
      //HTML table row

      html_string +=
        '<tr id="' +
        object["order_id"] +
        '"><td>' +
        object["order_id"] +
        "</td><td>" +
        object["total"] +
        "</td><td>" +
        object["description"] +
        "</td><td>" +
        object["date"] +
        "</td></tr>";
    });
    html_string += "</tbody></td>";

    //set the HTML in the div on the dialog
    var html_command =
      '<a href="#" onclick="closeRecord(' +
      id +
      '); return false;">hide</a>&nbsp;';
    $("#customers > tbody > #" + id).after(html_string);
    $("#customers > tbody > #" + id + " > td")
      .eq(5)
      .html(html_command);
  });
}

function closeDetails(id) {
  var html_command =
    '<a href="#" onclick="getDetails(' +
    id +
    '); return false;">view</a>&nbsp;';
  $("#customers > tbody > #" + id)
    .next()
    .remove();
  $("#customers > tbody > #" + id + " > td")
    .eq(5)
    .html(html_command);
}
