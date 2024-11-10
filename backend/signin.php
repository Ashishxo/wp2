<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


session_start();

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $input = json_decode(file_get_contents("php://input"), true);
    $email = mysqli_real_escape_string($conn, $input['email']);
    $password = mysqli_real_escape_string($conn, $input['password']);

    
    if (empty($email) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Email and password are required."]);
        exit;
    }

    $query = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        
        if (password_verify($password, $user['password'])) {
  
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_type'] = $user['user_type'];

            echo json_encode([
                "status" => "success", 
                "message" => "Signin successful!", 
                "user_id" => $user['user_id'], 
                "user_name" => $user['name']
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No account found with this email."]);
    }
    

    mysqli_close($conn);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
