//fire the getData() function when the page loads
$(document).ready(function () {
  //get all the data
  getData();
});

//this method will "get" all data, build the table rows and insert the HTML into the table body
function getData() {
  //make a request to server.php
  $.get("server.php?action=getStores", function (data) {
    //iterate over the JSON response, building an HTML string
    var html_string = "";

    $(data).each(function (key, object) {
      //HTML table row
      html_string += '<tr id="' + object["Store_id"]; //Add a conditional for organic = green
      '"><td>' +
        object["Name"] +
        "</td><td>" +
        object["Location"] +
        "</td><td>";
    });

    //set the HTML string on the client
    $("#table_body").html(html_string);
  });
}
