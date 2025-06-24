const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // <--- importar cors

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'myapp',
  charset: 'utf8mb4'
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
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const isEmail = identifier.includes('@');
  const campoBusqueda = isEmail ? 'email' : 'usuario';
  const query = `SELECT * FROM usuarios WHERE ${campoBusqueda} = ? LIMIT 1`;

  db.query(query, [identifier], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error de servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario o correo no encontrado' });
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
      rol: user.rol_id,
      usuario: user.usuario
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

app.get('/usuarios/:user', (req, res) => {
  const { user } = req.params;
  const query = 'SELECT * FROM usuarios WHERE usuario = ?';
  db.query(query, [user], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results);
  });
})

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results);
  });
});

app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion,precio, sku, inventario, imagen } = req.body;

  const query = `
    UPDATE productos
    SET nombre = ?, descripcion = ?, precio= ?, sku = ?, inventario = ?, imagen = ?
    WHERE id = ?
  `;

  db.query(query, [nombre, descripcion, precio, sku, inventario, imagen, id], (err, result) => {
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
  const { nombre, descripcion, precio, sku, inventario, imagen } = req.body;

  const query = `
    INSERT INTO productos (nombre, descripcion, precio, sku, inventario, imagen)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nombre, descripcion, precio, sku, inventario, imagen], (err, result) => {
    if (err) {
      console.log(err);
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

app.get('/roles/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM roles WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results);
  });
})


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
