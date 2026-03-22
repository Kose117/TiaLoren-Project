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
$celular = $_POST['celular_titular'] ?? null;
$sexo = $_POST['sexo_titular'];
$eps = $_POST['eps'];
$grupo_sanguineo = $_POST['grupo_sanguineo'];
$parentesco = $_POST['parentesco'] ?? null;
$id_grupo_familiar = $_POST['id_grupo_familiar'] ?? null;

// Determine the table to insert into
$age = date_diff(date_create($fecha_nacimiento), date_create('today'))->y;
if ($age < 18) {
    // Insert into `Menores`
    $sql = "INSERT INTO Menores 
        (ID_Grupo_Familiar, Numero_de_Documento, Tipo_de_Documento, Nombre, Fecha_de_Nacimiento, Sexo, Celular, Parentesco_con_Titular, Grupo_Sanguineo, EPS, Estado, Fecha_de_Registro)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo', NOW())";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssssssss", $id_grupo_familiar, $numero_documento, $tipo_documento, $nombre, $fecha_nacimiento, $sexo, $celular, $parentesco, $grupo_sanguineo, $eps);

} else {
    // Insert into `Adultos_de_Grupo_Familiar`
    $sql = "INSERT INTO Adultos_de_Grupo_Familiar 
        (ID_Grupo_Familiar, Numero_de_Documento, Tipo_de_Documento, Nombre, Fecha_de_Nacimiento, Sexo, Celular, Correo, Parentesco_con_Titular, Grupo_Sanguineo, EPS, Estado, Fecha_de_Registro)
        VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, 'Activo', NOW())";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssssssss", $id_grupo_familiar, $numero_documento, $tipo_documento, $nombre, $fecha_nacimiento, $sexo, $celular, $parentesco, $grupo_sanguineo, $eps);
}

// Execute and return response
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Data inserted successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error inserting data: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
