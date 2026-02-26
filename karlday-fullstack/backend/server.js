// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karlday')
.then(() => console.log('He conectado mi servidor exitosamente con MongoDB'))
.catch(err => console.error('Error al conectar con MongoDB:', err));

// --- REGISTRO DE RUTAS REALES ---
// Usamos api.js para TODO lo relacionado con productos y login
app.use('/api/products', require('./routes/api')); 
app.use('/api/users', require('./routes/api')); 

// Usamos currency.js para el dólar
app.use('/api/currency', require('./routes/currency'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Mi servidor está corriendo al 100% en el puerto ${PORT}`);
});