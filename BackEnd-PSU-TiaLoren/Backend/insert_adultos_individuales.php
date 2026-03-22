<?php
// Database connection
$host = "localhost";
$username = "fundatia_Admin_Usuarios";
$password = "Letmein.2025*";
$database = "fundatia_Usuarios_Familias_Registradas";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$nombre = $_POST['nombre_titular'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];
$tipo_documento = $_POST['tipo_documento'];
$numero_documento = $_POST['numero_documento'];
$celular = $_POST['celular_titular'];
$correo = $_POST['correo_titular'];
$ciudad = $_POST['ciudad'];
$localidad = $_POST['localidad'] ?? null; // Optional
$direccion = $_POST['direccion_titular'];
$grupo_poblacional = $_POST['grupo_poblacional'];
$grupo_vulnerabilidad = $_POST['grupo_vulnerabilidad'];
$estrato_social = $_POST['estrato_social'];
$grupo_sanguineo = $_POST['grupo_sanguineo'];
$eps = $_POST['eps'];

// Insert data into the table
$sql = "INSERT INTO AdultosIndividuales 
    (Nombre, Fecha_de_Nacimiento, Tipo_de_Documento, Numero_de_Documento, Celular, Correo, Ciudad, Localidad, Direccion, Grupo_Poblacional, Grado_de_Vulnerabilidad, Estrato_Social, Grupo_Sanguineo, EPS, Estado, Fecha_de_Registro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo', NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssssss", $nombre, $fecha_nacimiento, $tipo_documento, $numero_documento, $celular, $correo, $ciudad, $localidad, $direccion, $grupo_poblacional, $grupo_vulnerabilidad, $estrato_social, $grupo_sanguineo, $eps);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Data inserted successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error inserting data: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
