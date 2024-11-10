<?php
include 'db.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Headers: Content-Type"); 

$input = json_decode(file_get_contents("php://input"), true);
$user_id = isset($input['user_id']) ? intval($input['user_id']) : null; 

if ($user_id) {
    $query = "
        SELECT 
            ci.cart_items_id, ci.quantity, 
            p.name, p.price, pi.image_url, pi.alt_text 
        FROM 
            cart_items ci
        JOIN 
            cart c ON ci.cart_id = c.cart_id
        JOIN 
            products p ON ci.product_id = p.product_id
        LEFT JOIN 
            product_images pi ON p.product_id = pi.product_id
        WHERE 
            c.user_id = $user_id
    ";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $cartItems = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $cartItems[] = $row;
        }
        echo json_encode(["status" => "success", "cartItems" => $cartItems]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error fetching cart items"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User ID is required."]);
}

mysqli_close($conn);
?>
