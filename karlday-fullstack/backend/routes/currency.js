// backend/routes/currency.js
const express = require('express');
const router = express.Router();

router.get('/dolar', async (req, res) => {
    try {
        // Consumimos la API externa pública
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        
        // Extraemos el valor del Peso Mexicano (MXN)
        const mxnRate = data.rates.MXN; 
        
        // Lo enviamos a tu frontend
        res.status(200).json({ success: true, rate: mxnRate });
    } catch (error) {
        console.error("Error API Externa:", error);
        res.status(500).json({ success: false, error: 'Error al conectar con la API externa' });
    }
});

module.exports = router;