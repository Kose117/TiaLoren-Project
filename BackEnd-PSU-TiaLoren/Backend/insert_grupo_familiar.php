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

// Get POST data for Grupo Familiar
$estrato_social = $_POST['estrato_social'];
$grupo_poblacional = $_POST['grupo_poblacional'];
$grupo_vulnerabilidad = $_POST['grupo_vulnerabilidad'];
$ciudad = $_POST['ciudad'];
$localidad = $_POST['localidad'] ?? null; // Optional
$direccion = $_POST['direccion_titular'];
$documento_titular = $_POST['numero_documento'];

// Insert Grupo Familiar
$sql_grupo_familiar = "INSERT INTO GruposFamiliares 
    (Documento_Titular, Estrato_Social, Grupo_Poblacional, Grado_de_Vulnerabilidad, Ciudad, Localidad, Direccion, Estado, Fecha_Registro)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Activo', NOW())";

$stmt_grupo_familiar = $conn->prepare($sql_grupo_familiar);
$stmt_grupo_familiar->bind_param("sssssss", $documento_titular, $estrato_social, $grupo_poblacional, $grupo_vulnerabilidad, $ciudad, $localidad, $direccion);

if (!$stmt_grupo_familiar->execute()) {
    echo json_encode(["status" => "error", "message" => "Error inserting Grupo Familiar: " . $stmt_grupo_familiar->error]);
    exit;
}

// Get the inserted Grupo Familiar ID
$id_grupo_familiar = $conn->insert_id;

// Get POST data for Adulto Titular
$nombre = $_POST['nombre_titular'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];
$tipo_documento = $_POST['tipo_documento'];
$numero_documento = $_POST['numero_documento'];
$celular = $_POST['celular_titular'];
$correo = $_POST['correo_titular'];
$sexo = $_POST['sexo_titular'];
$eps = $_POST['eps'];
$grupo_sanguineo = $_POST['grupo_sanguineo'];

// Insert Adulto Titular
$sql_adulto_titular = "INSERT INTO AdultosTitulares 
    (ID_Grupo_Familiar, Numero_de_Documento, Tipo_de_Documento, Nombre, Fecha_de_Nacimiento, Sexo, Celular, Correo, Grupo_sanguineo, EPS, Estado, Fecha_de_Registro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo', NOW())";

$stmt_adulto_titular = $conn->prepare($sql_adulto_titular);
$stmt_adulto_titular->bind_param("isssssssss", $id_grupo_familiar, $numero_documento, $tipo_documento, $nombre, $fecha_nacimiento, $sexo, $celular, $correo, $grupo_sanguineo, $eps);

if ($stmt_adulto_titular->execute()) {
    echo json_encode(["status" => "success", "message" => "Data inserted successfully!", "grupo_familiar_id" => $id_grupo_familiar]);
} else {
    echo json_encode(["status" => "error", "message" => "Error inserting Adulto Titular: " . $stmt_adulto_titular->error]);
}

// Close statements and connection
$stmt_grupo_familiar->close();
$stmt_adulto_titular->close();
$conn->close();
?>
