const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// RUTAS
app.use('/api/users', userRoutes);  // <-- Esto es clave

// CONEXIÓN DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión', err));

// SERVIDOR
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);