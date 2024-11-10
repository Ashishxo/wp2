<?php
include 'db.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$category = $_GET['category'] ?? '';

if (!empty($category)) {
    $category = mysqli_real_escape_string($conn, $category);

    $query = "
        SELECT 
            p.product_id, p.name, p.brand_name, p.description, p.price, p.quantity,
            pi.image_url, pi.alt_text
        FROM 
            products p
        JOIN 
            categories c ON p.category_id = c.category_id
        LEFT JOIN 
            product_images pi ON p.product_id = pi.product_id
        WHERE 
            c.name = '$category'
        GROUP BY 
            p.product_id
    ";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $products = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }
        echo json_encode(["status" => "success", "products" => $products]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error fetching products"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Category is required"]);
}

mysqli_close($conn);
?>
