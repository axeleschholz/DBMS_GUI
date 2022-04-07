//fire the getData() function when the page loads
$(document).ready(function () {
  //initialize dialog box (jQuery UI) with config settings (show/hide animation)

  //get all the data
  getData();
});

//this method will "get" all data, build the table rows and insert the HTML into the table body
function getData() {
  //make a request to server.php
  $.get("server.php?action=getall", function (data) {
    //iterate over the JSON response, building an HTML string
    var html_string = "";

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
        object["id"] +
        '); return false;">view</a>&nbsp;';
      html_string += //add a conditional on being a manager at the store
        '<a href="#" onclick="deleteRecordById(' +
        object["id"] +
        '); return false;">delete</a>';
      html_string += "</td></tr>";
    });

    //set the HTML string on the client
    $("#table_body").html(html_string);
  });
}

function deleteRecordById(id) {
  $.get("server.php?action=deleteone&id=" + id, function (data) {
    //alert("deleted");
    document.getElementById(id).style.display = "none";
  });
}

//this method will "get" a specific record (by id) and open a Dialog to view the details (e.g. email address)
function getRecordById(id) {
  //make a request to server.php
  $.get("server.php?action=getone&id=" + id, function (data) {
    //build the dynamic HTML
    $(data).each(function (key, object) {
      //HTML table row
      html_string +=
        '<tr id="' +
        object["Offering_id"] +
        '"><td>' +
        object["Price"] +
        "</td><td>" +
        object["Price"] +
        "</td></tr>";
    });

    //set the HTML in the div on the dialog
    $("#dialog_content").html(html_string);

    //open the dialog
    $("#dialog").dialog("open");
  });
}
