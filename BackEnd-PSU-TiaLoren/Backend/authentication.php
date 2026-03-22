<?php
// Enable error reporting (for debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set the response to JSON format
header('Content-Type: application/json');

// Function to encrypt by adding 3 to ASCII value of each character
function encrypt($text) {
    $encrypted = '';
    for ($i = 0; $i < strlen($text); $i++) {
        $encrypted .= chr(ord($text[$i]) + 3);
    }
    return $encrypted;
}

// Hardcoded encrypted credentials
$storedUser = encrypt('usuario123');    // Encrypted username
$storedPassword = encrypt('password123');  // Encrypted password

// Retrieve the JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Extract username and password from the request
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// Encrypt user-provided credentials
$encryptedUser = encrypt($username);
$encryptedPassword = encrypt($password);

// Check if encrypted credentials match the stored ones
if ($encryptedUser === $storedUser && $encryptedPassword === $storedPassword) {
    // Successful login response
    echo json_encode(['success' => true, 'message' => 'Login exitoso']);
} else {
    // Failed login response
    http_response_code(401);  // Sets HTTP status code to 401 Unauthorized
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
}
?>
