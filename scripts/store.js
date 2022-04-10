//fire the getData() function when the page loads
$(document).ready(function () {
  //load navbar
  $.get("navigation.html", function (data) {
    $("#nav-placeholder").replaceWith(data);
  });

  //get all the data
  var url = new URL(window.location.href);
  var storeID = url.searchParams.get("id");
  getData(storeID);
  getOfferings(storeID);
});

function getData(id) {
  //make a request to server.php
  $.get("server.php?action=getStore&id=" + id, function (data) {
    var store = data[0];
    var html_string =
      "<h1>Name: " +
      store["name"] +
      "</h1><h2>Location: " +
      store["location"] +
      "</h2>";
    //set the HTML string on the client
    $("#information").html(html_string);
  });
}

function getOfferings(id) {
  //make a request to server.php
  $.get("server.php?action=getStoreProducts&id=" + id, function (data) {
    //iterate over the JSON response, building an HTML string
    var html_string = "";
    $(data).each(function (key, object) {
      //HTML table row
      html_string +=
        '<tr id="' +
        object["offering_id"] + //Add a conditional for organic = green
        '"><td><a href=product.html?id=' +
        object["product_id"] +
        ">" +
        object["name"] +
        "</td><td>" +
        object["brand"] +
        "</td><td>" +
        object["description"] +
        "</td><td>" +
        object["category.name"] +
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
