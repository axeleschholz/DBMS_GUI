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
      html_string +=
        '<tr id="' +
        object["product_id"] +
        '"><td>' +
        object["name"] +
        "</td><td>" +
        object["brand"] +
        "</td><td>" +
        object["description"] +
        "</td><td>" +
        object["description"] +
        "</td><td>" +
        object["lifespan"] +
        "</td><td>";
      html_string +=
        '<a href="#" onclick="getDetails(' +
        object["product_id"] +
        '); return false;">view</a>&nbsp;';
      html_string += "</td></tr>";
    });
    //set the HTML string on the client
    $("#table_body").html(html_string);
  });
}

//A work in progress
function getStore(id) {
  //make a request to server.php
  var store = $.get("server.php?action=getStore?id=" + id, function (data) {
    store = JSON.parse(data); //this may not be correct
    return store;
  });
  return store;
}

//this method will "get" a specific record (by id) and open a Dialog to view the details (e.g. email address)
function getDetails(id) {
  $.get("server.php?action=getProduct&id=" + id, function (data) {
    //build the dynamic HTML
    var html_string = "";
    html_string +=
      "<tr></td><td colspan=6><table class='table'><thead class='thead-dark'><tr><th>Price</th><th>Date</th></tr></thead><tbody>";
    $(data).each(function (key, object) {
      //HTML table row
      html_string +=
        '<tr id="' +
        object["offering_id"] +
        '"><td>' +
        object["price"] +
        "</td><td>" +
        object["update_time"] +
        "</td></tr>";
    });
    html_string += "</tbody></td>";

    //set the HTML in the div on the dialog
    var html_command =
      '<a href="#" onclick="closeDetails(' +
      id +
      '); return false;">hide</a>&nbsp;';
    $("#products > tbody > #" + id).after(html_string);
    $("#products > tbody > #" + id + " > td")
      .eq(5)
      .html(html_command);
  });
}

function closeDetails(id) {
  var html_command =
    '<a href="#" onclick="getDetails(' +
    id +
    '); return false;">view</a>&nbsp;';
  $("#products > tbody > #" + id)
    .next()
    .remove();
  $("#products > tbody > #" + id + " > td")
    .eq(5)
    .html(html_command);
}
