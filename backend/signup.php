<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';



if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $name = $fname . ' ' . $lname; 
    $mobile = mysqli_real_escape_string($conn, $_POST['mobile']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $is_seller = mysqli_real_escape_string($conn, $_POST['type']) == 'yes' ? 'seller' : 'customer';

    if (empty($name) || empty($mobile) || empty($email) || empty($address) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "All required fields must be filled out."]);
        exit;
    }

    
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);


    $query = "INSERT INTO users (name, email, password, address, phone_number, user_type) VALUES ('$name',  '$email', '$hashed_password', '$address',  '$mobile', '$is_seller')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "Signup successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . mysqli_error($conn)]);
    }


    mysqli_close($conn);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
