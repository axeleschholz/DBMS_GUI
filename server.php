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

    $sql_statement = "SELECT category.name AS 'category.name', product.name, product.product_id, product.brand, product.description, product.category_id FROM product LEFT JOIN category ON product.category_id=category.category_id ORDER by product_id ASC;";

} else if ($action === 'getLists') {

    $sql_statement = "SELECT user.name AS 'user.name', shopping_list.name, shopping_list.list_id FROM shopping_list LEFT JOIN user ON shopping_list.user_id=user.user_id ORDER by list_id ASC;";

} else if ($action === 'getProduct') {

    $sql_statement = "SELECT category.name AS 'category.name', product.* FROM product LEFT JOIN category ON product.category_id=category.category_id WHERE product_id=" .$_GET['id']. " ORDER by product_id ASC;";

} else if ($action === 'getProductOfferings') {

    $sql_statement = "SELECT store.name AS 'store.name', offering.offering_id, offering.store_id, offering.price, offering.update_time FROM offering LEFT JOIN store ON offering.store_id=store.store_id WHERE product_id=" .$_GET['id']. " ORDER by price ASC;";

} else if ($action === 'getListContents') {

    $sql_statement = "SELECT store.name AS 'store.name', product.name AS 'product.name', offering.store_id, offering.price, list_content.offering_id, list_content.quantity FROM offering LEFT JOIN store ON offering.store_id=store.store_id LEFT JOIN product ON product.product_id=offering.product_id RIGHT JOIN list_content ON list_content.offering_id=offering.offering_id WHERE list_id=" .$_GET['id']. " ORDER by price ASC;";

} else if ($action === 'getStores') {

    $sql_statement = "SELECT * FROM store ORDER BY store_id ASC;";

} else if ($action === 'getStore') {

    $sql_statement = "SELECT * FROM store WHERE store_id=" .$_GET['id']. ";";

} else if ($action === 'getStoreProducts') {

    $sql_statement = "SELECT category.name AS 'category.name', product.name, product.product_id, product.brand, product.description, product.category_id, offering.offering_id, offering.price, offering.update_time FROM product LEFT JOIN category ON product.category_id=category.category_id RIGHT JOIN offering ON offering.product_id=product.product_id WHERE store_id=" .$_GET['id']. " ORDER by product_id ASC;";

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