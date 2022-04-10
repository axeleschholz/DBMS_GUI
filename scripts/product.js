//fire the getData() function when the page loads
$(document).ready(function () {
  //load navbar
  $.get("navigation.html", function (data) {
    $("#nav-placeholder").replaceWith(data);
  });

  //get all the data
  var url = new URL(window.location.href);
  var productID = url.searchParams.get("id");
  getData(productID);
  getStores(productID);
});

function getData(id) {
  //make a request to server.php
  $.get("server.php?action=getProduct&id=" + id, function (data) {
    var product = data[0];
    var html_string =
      "<h1>Name: " +
      product["name"] +
      "</h1><h2>Brand: " +
      product["brand"] +
      "</h2><table class=table><tbody><tr><td>Organic:<td>" +
      product["organic"] +
      "</td></tr><tr><td>Perishable:</td><td>" +
      product["perishable"] +
      "</td></tr><tr><td>Description:</td><td>" +
      product["description"] +
      "</td></tr></tbody></table>";
    console.log(html_string);
    //set the HTML string on the client
    $("#information").html(html_string);
  });
}

function getStores(id) {
  //make a request to server.php
  $.get("server.php?action=getProductOfferings&id=" + id, function (data) {
    //iterate over the JSON response, building an HTML string
    var html_string = "";
    $(data).each(function (key, object) {
      //HTML table row
      html_string +=
        '<tr id="' +
        object["offering_id"] + //Add a conditional for organic = green
        '"><td><a href=store.html?id=' +
        object["store_id"] +
        ">" +
        object["store.name"] +
        "</td><td>" +
        object["price"] +
        "</td><td>" +
        object["update_time"] +
        "</td><tr>"; //add CRUD functionality for manager
    });

    //set the HTML string on the client
    $("#table_body").html(html_string);
  });
}
