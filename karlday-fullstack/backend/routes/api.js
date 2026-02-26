// backend/routes/api.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Librería de seguridad
const Product = require('../models/Product'); 

const JWT_SECRET = 'Karlday_Secret_Key_2026'; // Clave para cifrar los tokens

// --- MIDDLEWARE: EL GUARDIÁN DEL PANEL (Seguridad Avanzada) ---
const authAdmin = (req, res, next) => {
    try {
        // Buscamos la llave en el encabezado de la petición
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ success: false, error: 'Acceso denegado. No hay token.' });

        // Verificamos si la llave es real y no ha sido alterada
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Verificamos si el rol es de Administrador
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'No tienes permisos de administrador.' });
        }

        req.user = decoded;
        next(); // Si todo está bien, lo dejamos pasar a la ruta
    } catch (error) {
        res.status(401).json({ success: false, error: 'Token inválido o expirado.' });
    }
};

// --- RUTA: LOGIN CON GENERACIÓN DE JWT ---
router.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    
    // Lista de Admins VIP (Para tu entrega)
    const adminEmails = ['evelyn.dayan@karlday.com', 'jorge.alejandro@karlday.com', 'michelle@karlday.com'];

    // Simulación de validación (Aquí conectarías con tu DB de Usuarios)
    if ((adminEmails.includes(correo) && password === 'passwordAdmin123') || password === 'usuarioFacil1') {
        const role = adminEmails.includes(correo) ? 'admin' : 'user';
        
        // FIRMAMOS EL TOKEN (La llave digital)
        const token = jwt.sign({ correo, role }, JWT_SECRET, { expiresIn: '2h' });

        return res.json({ success: true, token, role });
    }
    
    res.status(401).json({ success: false, error: 'Credenciales inválidas' });
});

// --- RUTA: OBTENER PRODUCTOS (Pública para el catálogo) ---
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const products = await Product.find().skip((page - 1) * limit).limit(limit);
        const total = await Product.countDocuments();
        res.json({ success: true, data: products, pagination: { total, page, pages: Math.ceil(total / limit) } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- RUTA: GUARDAR PRODUCTO (PROTEGIDA CON JWT Y VALIDACIÓN) ---
router.post('/', authAdmin, async (req, res) => {
    try {
        const { title, price, imageUrl } = req.body;

        // VALIDACIÓN DE DATOS (Punto extra de la rúbrica)
        if (!title || !price || !imageUrl) {
            return res.status(400).json({ success: false, error: 'Faltan campos obligatorios para el producto.' });
        }

        const newProduct = new Product(req.body); 
        await newProduct.save(); 
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;