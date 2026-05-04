<?php
session_start();
header('Content-Type: application/json');

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "tryon_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input         = trim($_POST["username"]);   // can be name or email
    $passwordInput = trim($_POST["password"]);

    // Allow login by name OR email (case-insensitive)
    $stmt = $conn->prepare(
        "SELECT id, name, password FROM users WHERE LOWER(name) = LOWER(?) OR LOWER(email) = LOWER(?)"
    );
    $stmt->bind_param("ss", $input, $input);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $actualName, $hashedPassword);
        $stmt->fetch();

        if (password_verify($passwordInput, $hashedPassword)) {
            $_SESSION['user'] = $actualName;
            echo json_encode(["status" => "success", "name" => $actualName]);
        } else {
            echo json_encode(["status" => "invalid", "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["status" => "invalid", "message" => "User not found. Please sign up first."]);
    }
    $stmt->close();
}
$conn->close();
?>
