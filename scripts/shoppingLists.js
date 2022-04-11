//fire the getData() function when the page loads
$(document).ready(function () {
  $.get("navigation.html", function (data) {
    $("#nav-placeholder").replaceWith(data);
  });
  //set title to product name?
  //get all the data
  getData();
});

//this method will "get" all data, build the table rows and insert the HTML into the table body
function getData() {
  //make a request to server.php
  $.get("server.php?action=getLists", function (data) {
    //iterate over the JSON response, building an HTML string
    var html_string = "";
    $(data).each(function (key, object) {
      //HTML table row
      html_string +=
        '<tr id="' +
        object["list_id"] +
        '"><td><a href=product.html?id=' +
        object["list_id"] +
        ">" +
        object["name"] +
        "</td><td>" +
        object["user.name"] +
        "</td><td>";
      html_string +=
        '<a href="#" onclick="getDetails(' +
        object["list_id"] +
        '); return false;">view</a>&nbsp;';
      html_string += "</td></tr>";
    });
    //set the HTML string on the client
    $("#table_body").html(html_string);
  });
}

//this method will "get" a specific record (by id) and open a Dialog to view the details (e.g. email address)
function getDetails(id) {
  $.get("server.php?action=getListContents&id=" + id, function (data) {
    //build the dynamic HTML
    var html_string = "";
    html_string +=
      "<tr></td><td colspan=6><table class='table'><thead class='thead-dark'><tr><th>Name</th><th>Price</th><th>Store</th></tr></thead><tbody>";
    $(data).each(function (key, object) {
      html_string +=
        '<tr id="' +
        object["offering_id"] +
        '"><td><a href=product.html?id=' +
        object["product_id"] +
        ">" +
        object["product.name"] +
        "</a></td><td>" +
        object["price"] +
        "</td><td><a href=store.html?id=" +
        object["store_id"] +
        ">" +
        object["store.name"] +
        "</a></td><tr>";
    });
    html_string += "</tbody></td>";

    //set the HTML in the div on the dialog
    var html_command =
      '<a href="#" onclick="closeDetails(' +
      id +
      '); return false;">hide</a>&nbsp;';
    $("#lists > tbody > #" + id).after(html_string);
    $("#lists > tbody > #" + id + " > td")
      .eq(2) //change to correct column
      .html(html_command);
  });
}

function closeDetails(id) {
  var html_command =
    '<a href="#" onclick="getDetails(' +
    id +
    '); return false;">view</a>&nbsp;';
  $("#lists > tbody > #" + id)
    .next()
    .remove();
  $("#lists > tbody > #" + id + " > td")
    .eq(2) //change to correct column
    .html(html_command);
}
