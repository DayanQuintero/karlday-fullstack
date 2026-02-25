const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Importar los modelos y el middleware que creamos antes
const User = require('../models/User');
const Product = require('../models/Product');
const verifyTokenAndRole = require('../middleware/auth');

// ==========================================
// RUTAS DE AUTENTICACIÓN (JWT & BCRYPT)
// ==========================================

// 1. Registro de Usuario (Para crear la cuenta de Day o la tuya)
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: 'El usuario ya existe' });

        // Encriptar la contraseña (Buenas prácticas de seguridad)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const newUser = new User({
            username,
            password: hashedPassword,
            role: role || 'user' // Por defecto es 'user', a menos que mandes 'admin'
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        next(error); // Pasa al errorHandler global
    }
});

// 2. Login de Usuario
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validar que el usuario exista
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

        // Crear el token JWT incluyendo el ID y el ROL 
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.header('auth-token', token).json({
            success: true,
            message: 'Bienvenido a Karlday',
            token,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
});

// ==========================================
// RUTAS DEL INVENTARIO (CRUD COMPLETO)
// ==========================================

// 3. GET: Leer todos los productos (Público, con integración de API externa y Paginación) 
router.get('/products', async (req, res, next) => {
    try {
        // Paginación: Recibir página y límite desde la query URL
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const totalDocs = await Product.countDocuments();

        // Integración de API externa (Tipo de cambio MXN a USD) 
        let mxnToUsd = 0.05; // Valor de fallback por si falla la API
        try {
            const exchangeRateRes = await axios.get('https://api.exchangerate-api.com/v4/latest/MXN');
            mxnToUsd = exchangeRateRes.data.rates.USD;
        } catch (apiErr) {
            console.error('Error al consultar la API de divisas, usando fallback.');
        }

        // Mapear los productos para incluir el precio en USD
        const productsWithConvertedPrice = products.map(p => ({
            ...p._doc,
            priceUSD: (p.price * mxnToUsd).toFixed(2)
        }));

        res.status(200).json({
            success: true,
            pagination: {
                total: totalDocs,
                currentPage: page,
                totalPages: Math.ceil(totalDocs / limit)
            },
            data: productsWithConvertedPrice
        });
    } catch (error) {
        next(error);
    }
});

// 4. POST: Crear un nuevo producto (Protegido: SOLO ADMIN) 
router.post('/products', verifyTokenAndRole('admin'), async (req, res, next) => {
    try {
        const { title, price, category } = req.body;
        
        const newProduct = new Product({ title, price, category });
        const savedProduct = await newProduct.save();
        
        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        next(error);
    }
});

// 5. PUT: Actualizar un producto existente (Protegido: SOLO ADMIN) 
router.put('/products/:id', verifyTokenAndRole('admin'), async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Devuelve el documento actualizado
        );
        
        if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
        
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        next(error);
    }
});

// 6. DELETE: Eliminar un producto (Protegido: SOLO ADMIN) 
router.delete('/products/:id', verifyTokenAndRole('admin'), async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        if (!deletedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
        
        res.status(200).json({ success: true, message: 'Producto eliminado del inventario' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;