<?php


$host = "5adb-ben.minoffice.be";
$user = "miniemen_ben_5adb";
$pass = "Miniemen123";
$dbname = "miniemen_ben_5adb";

$conn = new mysqli($host, $user, $pass, $dbname);

$public_requests = [
    "get_categories" => "SELECT * FROM categories", 
    "get_category" => "SELECT PKProduct, Name, Price, Image FROM products WHERE FKCategory = arg1",
    "get_product" => "SELECT Name, Price, Image, Description FROM products WHERE PKProduct = arg1",
    "create_account" => "INSERT INTO users (`Email`, `Password`) VALUES ('arg1', 'arg2');"
];
$private_requests = [
    "get_account" => "SELECT * FROM users WHERE email=arg1 AND password=arg2"
];

if (isset($_POST["request"])) {
    $request = $_POST["request"];
    if (array_key_exists($request, $public_requests)) {
        $request = $public_requests[$request];
        if(isset($_POST["args"])) {
            $args = json_decode($_POST["args"]);
            for ($i = 0; $i < count($args); $i++) {
                $request = str_replace("arg" . ($i+1), $args[$i], $request);
            }
        }
        runQuery($request);
    } else if (array_key_exists($request, $private_requests)) {
        $args = json_decode($_POST["args"]);
        $password = runQuery("SELECT Password FROM users WHERE Email='$args[0]'");
        echo $password;
        if ($password == $args[1]) {
            echo "Valid Password =)";
        }
    } else {
        echo "Unauthorized Query !";
    }
} else {
    echo "No query provided";
}

function runQuery($query)
{
    global $conn;
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    return json_encode($data);
}

?>
