<?php

$host = "5adb-ben.minoffice.be";
$user = "miniemen_ben_5adb";
$pass = "Miniemen123";
$dbname = "miniemen_ben_5adb";

$conn = new mysqli($host, $user, $pass, $dbname);

if (isset($_POST["runQuery"])) {
    runQuery($_POST["runQuery"]);
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
    echo json_encode($data);
}

?>
