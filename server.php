<?php
// curl http://localhost/Assignment7/server.php?action=getall
// curl http://localhost/Assignment7/server.php?action=getone"&"id=1

//get db connection (database, username, pwd)
//$con = mysqli_connect("localhost","contacts_user","passw0rd","contacts");
$con = mysqli_connect("database","root", $_ENV['MYSQL_ROOT_PASSWORD'], "contacts");

// Check connection
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    die();
}

//#######################################################################################################################
//get the requested action and build the appropriate SQL query
$action = $_GET['action'];

if ($action === 'getall') {

    //get all fields and rows in the Contact table
    $sql_statement = "SELECT id, firstname, lastname, email FROM contact ORDER BY lastname ASC;";

} else if ($action === 'getone') {

    //get all fields FROM A SPECIFIC ROW in the Contact table
    $sql_statement = "SELECT id, firstname, lastname, email FROM contact WHERE id = " . $_GET['id']. " ORDER BY lastname ASC;";

} else if ($action === 'deleteone') {

    $sql_statement = "DELETE FROM contact WHERE id = " . $_GET['id'];

}
//#######################################################################################################################

//execute sql statement on the db connection, returning rows of data ($result)
$result = mysqli_query($con, $sql_statement);

//set content type to JSON, so the client will know what we're sending
header('Content-Type: application/json; charset=utf-8');

if ($action === 'deleteone') {
    echo json_encode("{'success':true}");
    die();

}


//if the result is not null (empty), build an associative array and output the array, json-encoded (via echo)
if ($result != null) {
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
    }
    echo json_encode($myArray);
} else {
    echo json_encode("'success':false}");
}

//close the connection
$con->close();

?>