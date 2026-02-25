const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('He conectado exitosamente con MongoDB'))
  .catch(err => console.error('Error de conexión a Mongo:', err));

// Rutas de la API
app.use('/api', require('./routes/api'));

// Middleware global de manejo de errores (Requisito de la rúbrica)
app.use(errorHandler);

// --- CONFIGURACIÓN PARA PRODUCCIÓN (RENDER) ---
// Sirve los archivos estáticos de la carpeta 'dist' de React
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Cualquier ruta que no sea de la API, se la pasamos a React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));