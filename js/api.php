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
    "create_account" => "INSERT INTO users (`Email`, `Password`) VALUES ('arg1', 'arg2');",
    "get_new_products"  => "SELECT PKProduct, Name, Price, Image, FKCategory FROM products ORDER BY PKProduct DESC LIMIT 8;"
];
$private_requests = [
    "get_account" => "SELECT * FROM users WHERE Email='arg1'",
    "get_cart" => "SELECT Cart FROM users WHERE Email='arg1'",
    "update_account" => "UPDATE users SET `Password` = 'arg2', `Name` = 'arg3', `LastName` = 'arg4', `Adress` = 'arg5', `City` = 'arg6' WHERE (`Email` = 'arg1')",
    "update_cart" => "UPDATE users SET `Cart` = 'arg3' WHERE (`Email` = 'arg1');",
    "su" => null
];

if (isset($_POST["request"])) {
    if(isset($_POST["args"])) {
        $args = json_decode($_POST["args"]);
        if ($_POST["request"] == "su") {
            is_safe($args, TRUE);
        } else {
            is_safe($args);
        }
    }
    $request = $_POST["request"];
    if (array_key_exists($request, $public_requests)) {
        $request = $public_requests[$request];
        if(isset($args)) {
            if ($_POST["request"] == "create_account") {
                $acc = runQuery("SELECT EXISTS (SELECT 1 FROM users WHERE Email = '$args[0]') AS value;", 1);
                if($acc[0]["value"] == 1) { exit("Account already exists!");}
                $args[1] = password_hash($args[1], PASSWORD_BCRYPT);
            }
            for ($i = 0; $i < count($args); $i++) {
                $request = str_replace("arg" . ($i+1), $args[$i], $request);
            }
        }
        runQuery($request);
    } else if (array_key_exists($request, $private_requests)) {
        $password = runQuery("SELECT Password FROM users WHERE Email='$args[0]'", 1);
        $password = $password[0]["Password"];
        if (password_verify($args[1], $password)) {
            if ($request == "su") {
                $Is_Admin = runQuery("SELECT Is_Admin FROM users WHERE Email='$args[0]'", 1)[0]["Is_Admin"];
                if ($Is_Admin==1) {
                    runQuery($args[2]);
                    exit();
                } else {
                    exit("Unauthorized Query!");
                }
            }
            if($request == "update_account") {
                $args[1] = password_hash($args[1], PASSWORD_BCRYPT);
            }
            $request = $private_requests[$request];
            for ($i = 0; $i < count($args); $i++) {
                if ($args[$i] == "") { $args[$i] = null; }
                $request = str_replace("arg" . ($i+1), $args[$i], $request);
            }
            //echo $request;
            runQuery($request);
        } else {
            exit("Invalid Password!");
        }
    } else {
        exit("Unknown Query!");
    }
} else {
    exit("No query provided!");
}

function runQuery($query, $no_echo = null)
{
    global $conn;
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    } else if (strpos($query, "UPDATE") !== false) {
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


function is_safe($args, $su=null) {
    // SQL injection patterns
    $bad_patterns = [
        '/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b/i', // SQL keywords
        '/--/', // SQL comment
        '/;/', // Semicolon
        '/[\'"]\s*--/', // Quote with comment
        '/\b(OR|AND)\s*1\s*=\s*1/i' // 1=1 tricks
    ];
    foreach ($args as $arg) {
        foreach ($bad_patterns as $pattern) {
            if (preg_match($pattern, $arg)) {
                if (isset($su) && $arg == $args[2]) {
                    continue; // Skip 3rd argument of SU request
                }
                exit("Fatal Error"); // Dont tell user we know he entered SQL
            }
        }
    }
}

?>