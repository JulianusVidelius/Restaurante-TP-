const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: true
}));

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Reemplaza con tu usuario de MySQL
    password: '',  // Reemplaza con tu contraseña
    database: 'registros'  // Reemplaza con el nombre de tu base de datos
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Rutas para manejar productos y pedidos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/pedido', (req, res) => {
    const { productos } = req.body;
    if (productos.length === 0) return res.send('El carrito está vacío.');

    db.query('INSERT INTO pedidos (productos) VALUES (?)', [JSON.stringify(productos)], (error, results) => {
        if (error) throw error;
        res.send('Pedido procesado con éxito.');
    });
});

app.get('/verificarSesion', (req, res) => {
    res.json({ sesionIniciada: !!req.session.user });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Cargar productos desde Node.js
fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos);
    });

// Finalizar pedido
function finalizarPedido() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    fetch('http://localhost:3000/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productos: carrito })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        carrito = [];
        cerrarCarrito();
        actualizarContadorCarrito();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
