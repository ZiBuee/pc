<?php


$host = "5adb-ben.minoffice.be";
$user = "miniemen_ben_5adb";
$pass = "Miniemen123";
$dbname = "miniemen_ben_5adb";

$conn = new mysqli($host, $user, $pass, $dbname);

$public_requests = [
    "get_categories" => "SELECT * FROM categories", 
    "get_category" => "SELECT PKProduct, Name, Price, Image FROM products WHERE FKCategory = 'arg1'",
    "get_product" => "SELECT Name, Price, Image, Description, FKCategory FROM products WHERE PKProduct = 'arg1'",
    "create_account" => "INSERT INTO users (`Email`, `Password`) VALUES ('arg1', 'arg2');"
];
$private_requests = [
    "get_account" => "SELECT * FROM users WHERE Email='arg1'",
    "get_cart" => "SELECT Cart FROM users WHERE Email='arg1'",
    "update_account" => "UPDATE users SET `Password` = 'arg2', `Name` = 'arg3', `LastName` = 'arg4', `Adress` = 'arg5', `City` = 'arg6' WHERE (`Email` = 'arg1')",
    "update_cart" => "UPDATE users SET `Cart` = 'arg3' WHERE (`Email` = 'arg1');"
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
        $password = runQuery("SELECT Password FROM users WHERE Email='$args[0]'", 1);
        $password = $password[0]["Password"];
        if ($password == $args[1]) {
            $request = $private_requests[$request];
            for ($i = 0; $i < count($args); $i++) {
                if ($args[$i] == "") { $args[$i] = null; }
                $request = str_replace("arg" . ($i+1), $args[$i], $request);
            }
            //echo $request;
            runQuery($request);
        } else {
            echo "Error: Invalid Password";
        }
    } else {
        echo "Error: Unauthorized Query !";
    }
} else {
    echo "Error: No query provided";
}

function runQuery($query, $no_echo = null)
{
    global $conn;
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    } else if (str_contains($query, "UPDATE")) {
        echo "Succesfull Update";
        return 0;
    }
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    if (isset($no_echo)) {
        return $data;
    }
    echo json_encode($data);
}

?>
