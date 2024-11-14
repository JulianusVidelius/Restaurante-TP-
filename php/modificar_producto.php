<?php
// verificar sesión de administrador
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(["error" => "No tienes permisos para realizar esta acción."]);
    exit();
}

// conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = ""; // tu contraseña
$database = "registros";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Verificar que se haya enviado el ID del producto y los nuevos datos
if (isset($_POST['id'], $_POST['nombre'], $_POST['precio'], $_POST['descripcion'])) {
    $id = (int)$_POST['id'];
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $precio = (float)$_POST['precio'];
    $descripcion = $conn->real_escape_string($_POST['descripcion']);

    // Actualizar el producto en la base de datos
    $sql = "UPDATE productos SET nombre = '$nombre', precio = '$precio', descripcion = '$descripcion' WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo "Producto actualizado correctamente.";
    } else {
        echo "Error al actualizar el producto: " . $conn->error;
    }
} else {
    echo "Faltan datos para actualizar el producto.";
}

// cerrar la conexión
$conn->close();
?>