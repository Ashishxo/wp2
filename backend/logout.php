<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


session_start();
session_unset(); 
session_destroy(); 

echo json_encode(["status" => "success", "message" => "Logout successful"]);
?>
