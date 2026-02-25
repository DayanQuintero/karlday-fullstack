const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('../routes/api');

// Configuración básica de una app de prueba
const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

// Mock (simulación) de Mongoose para no conectar a la base real durante el test
jest.mock('../models/User');
jest.mock('../models/Product');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Pruebas de API Karlday', () => {
    // Prueba 1: Verificar que la ruta de productos existe
    it('GET /api/products debería responder (aunque sea sin datos reales)', async () => {
        const res = await request(app).get('/api/products');
        // Esperamos 200 (OK) o 500 (Error interno por falta de DB real), 
        // lo importante es que el servidor recibe la petición.
        expect(res.statusCode).not.toBe(404);
    });

    // Prueba 2: Verificar seguridad en rutas protegidas
    it('POST /api/products debería fallar sin token', async () => {
        const res = await request(app).post('/api/products').send({
            title: "Prueba",
            price: 100
        });
        // Debería dar 401 Unauthorized porque no enviamos token
        expect(res.statusCode).toBe(401);
    });
});