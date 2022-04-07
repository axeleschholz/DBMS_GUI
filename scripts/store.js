//fire the getData() function when the page loads
$(document).ready(function () {
  //get all the data
  $id = $param[0];
  getData(id);
  getOfferings(id);
});

function getData(id) {
  //make a request to server.php
  $.get("server.php?action=getStore?id=" + id, function (data) {
    store = JSON.parse(data); //this may not be correct
    var html_string =
      "<h3>Name: " + store["Name"] + ", Location: " + store["Location"];
    //set the HTML string on the client
    $("#information").html(html_string);
  });
}

function getOfferings(id) {
  //make a request to server.php
  $.get("server.php?action=getStoreProducts?id=" + id, function (data) {
    //iterate over the JSON response, building an HTML string
    var html_string = "";
    var product;
    $(data).each(function (key, object) {
      //HTML table row
      product = getProduct(object["Product_id"]);
      html_string += '<tr id="' + object["Offering_id"]; //Add a conditional for organic = green
      '"><td>' +
        product["Name"] +
        "</td><td>" +
        product["Brand"] +
        "</td><td>" +
        product["Description"] +
        "</td><td>" +
        product["Lifetime"] +
        "</td><td>" +
        object["Price"] +
        "</td><tr>"; //add CRUD functionality for manager
    });

    //set the HTML string on the client
    $("#table_body").html(html_string);
  });
}

function getProduct(id) {
  //make a request to server.php
  $.get("server.php?action=getProduct?id=" + id, function (data) {
    product = JSON.parse(data); //this may not be correct
    return product;
  });
}
