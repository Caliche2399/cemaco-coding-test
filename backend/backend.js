const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // <--- importar cors

const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors({
  origin: '*', // Permite cualquier origen (en desarrollo). Para producción usa un dominio específico.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para recibir JSON
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'myapp'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecreto'; 

app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE usuario = ? LIMIT 1';
  db.query(query, [usuario], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error de servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      rol: user.rol,  // ← puedes usar esto en frontend para saber el tipo de usuario
      email: user.email
    });
  });
});


app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results);
  });
});

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results);
  });
});

app.put('/productos', (req, res) => {
  const { id, nombre, descripcion, SKU, inventario, imagen } = req.body;

  const query = `
    UPDATE productos
    SET nombre = ?, descripcion = ?, SKU = ?, inventario = ?, imagen = ?
    WHERE id = ?
  `;

  db.query(query, [nombre, descripcion, SKU, inventario, imagen, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado correctamente' });
  });
});

app.post('/productos', (req, res) => {
  const { nombre, descripcion, SKU, inventario, imagen } = req.body;

  const query = `
    INSERT INTO productos (nombre, descripcion, SKU, inventario, imagen)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [nombre, descripcion, SKU, inventario, imagen], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el producto' });
    }

    res.status(201).json({ message: 'Producto creado exitosamente', productoId: result.insertId });
  });
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM productos WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
