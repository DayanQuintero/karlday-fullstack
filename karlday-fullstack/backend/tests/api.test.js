// backend/tests/api.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Importamos tus rutas y el modelo
const apiRoutes = require('../routes/api');
const Product = require('../models/Product');

const app = express();
app.use(express.json());
app.use('/api/products', apiRoutes);

const JWT_SECRET = 'Karlday_Secret_Key_2026';

// --- CONFIGURACIÓN DE CONEXIÓN PARA PRUEBAS ---
beforeAll(async () => {
    // Conectamos a la base de datos antes de empezar las pruebas
    const url = 'mongodb://127.0.0.1:27017/karlday';
    await mongoose.connect(url);
});

afterAll(async () => {
    // Cerramos la conexión y limpiamos procesos para evitar el error TCPSERVERWRAP
    await mongoose.connection.close();
});

describe('Pruebas de Robustez y Seguridad API Karlday', () => {
    
    // Generamos un token válido para las pruebas de administrador
    const adminToken = jwt.sign(
        { correo: 'michelle@karlday.com', role: 'admin' }, 
        JWT_SECRET
    );

    // 1. PRUEBA FUNCIONAL: Obtener productos (GET)
    test('Debe retornar 200 y una lista de productos con paginación', async () => {
        const res = await request(app).get('/api/products');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        // Verifica que la paginación que implementamos funcione
        expect(res.body).toHaveProperty('pagination'); 
    });

    // 2. PRUEBA DE SEGURIDAD: Intentar publicar sin token
    test('Debe denegar acceso (401) si no se envía un token JWT', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                title: "Chamarra Intruso",
                price: 999,
                category: "Hombre",
                imageUrl: "https://link.com/foto.jpg"
            });
        
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toBe('Acceso denegado. No hay token.');
    });

    // 3. PRUEBA DE ACEPTACIÓN: Publicar con token válido
    test('Debe permitir crear un producto (201) con token de administrador válido', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: "Prenda Test Tecmilenio",
                price: 1500,
                category: "Nuevo",
                description: "Validación de robustez de la API",
                imageUrl: "https://karlday.com/test-tecmilenio.jpg"
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Prenda Test Tecmilenio");
    });
});