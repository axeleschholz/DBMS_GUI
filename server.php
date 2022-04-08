<?php
// curl http://localhost/Assignment7/server.php?action=getcustomers
// curl http://localhost/Assignment7/server.php?action=getcustomerorders"&"id=1

//get db connection (database, username, pwd)
$con = mysqli_connect("localhost","administrator", "passw0rd", "store_database");

// Check connection
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    die();
}

//ADD CRUD FUNCTIONALITY TO REQUESTS
//#######################################################################################################################
//get the requested action and build the appropriate SQL query
$action = $_GET['action'];

if ($action === 'getProducts') {

    //get all fields and rows in the Contact table
    $sql_statement = "SELECT * FROM product ORDER BY product_id ASC;";

} else if ($action === 'getProduct') {

    //get all fields and rows in the Contact table
    $sql_statement = "SELECT * FROM offering WHERE product_id=" .$_GET['id']. " ORDER BY price ASC;";

} else if ($action === 'getStores') {

    //get all fields and rows in the Contact table
    $sql_statement = "SELECT * FROM store ORDER BY store_id ASC;";

} else if ($action === 'getStore') {

    //get all fields and rows in the Contact table
    $sql_statement = "SELECT * FROM store WHERE store_id=" .$_GET['id']. ";";

} else if ($action === 'getcustomerorders') {
    //get all fields FROM A SPECIFIC ROW in the Contact table
    $sql_statement = "SELECT order_id, customer_id, total, `description`, `date` FROM `order` WHERE customer_id=" .$_GET['id']. " ORDER BY `date` DESC;";

} 
//#######################################################################################################################

//execute sql statement on the db connection, returning rows of data ($result)
$result = mysqli_query($con, $sql_statement);


//set content type to JSON, so the client will know what we're sending
header('Content-Type: application/json; charset=utf-8');


//if the result is not null (empty), build an associative array and output the array, json-encoded (via echo)
if ($result != null) {
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
    }
    echo json_encode($myArray);
} else {
    echo json_encode("{'success':false}"); //fix this
}

//close the connection
$con->close();

?>