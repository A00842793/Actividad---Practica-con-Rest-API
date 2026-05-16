const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/login', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});