<?php
include 'db.php';
header("Access-Control-Allow-Origin: http://localhost:5173"); // Specify your React app's origin
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

// Get JSON input data
$input = json_decode(file_get_contents("php://input"), true);
$user_id = $input['user_id'] ?? null; // Get user_id from request
$product_id = $input['product_id'] ?? null;
$quantity = $input['quantity'] ?? 1;

// Check if user_id and product_id are provided
if (!$user_id || !$product_id) {
    echo json_encode(["status" => "error", "message" => "User ID and Product ID are required."]);
    exit;
}

// Check if a cart exists for the user
$cart_query = "SELECT cart_id FROM cart WHERE user_id = $user_id LIMIT 1";
$cart_result = mysqli_query($conn, $cart_query);

if (mysqli_num_rows($cart_result) > 0) {
    $cart = mysqli_fetch_assoc($cart_result);
    $cart_id = $cart['cart_id'];
} else {
    // Create a new cart for the user
    $create_cart_query = "INSERT INTO cart (user_id, created_at, updated_at) VALUES ($user_id, NOW(), NOW())";
    mysqli_query($conn, $create_cart_query);
    $cart_id = mysqli_insert_id($conn);
}

// Check if the item already exists in the cart
$check_query = "SELECT * FROM cart_items WHERE cart_id = $cart_id AND product_id = $product_id";
$check_result = mysqli_query($conn, $check_query);

if (mysqli_num_rows($check_result) > 0) {
    // Update quantity if item already in cart
    $update_query = "UPDATE cart_items SET quantity = quantity + $quantity WHERE cart_id = $cart_id AND product_id = $product_id";
    mysqli_query($conn, $update_query);
} else {
    // Add new item to cart
    $insert_query = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($cart_id, $product_id, $quantity)";
    mysqli_query($conn, $insert_query);
}

echo json_encode(["status" => "success", "message" => "Product added to cart."]);

// Close the connection
mysqli_close($conn);
?>
