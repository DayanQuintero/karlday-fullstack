const Product = require('../models/Product');
const axios = require('axios'); // Para la API externa

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        
        // Integración de API externa (Tipo de cambio)
        const exchangeRateRes = await axios.get('https://api.exchangerate-api.com/v4/latest/MXN');
        const mxnToUsd = exchangeRateRes.data.rates.USD;

        const productsWithConvertedPrice = products.map(p => ({
            ...p._doc,
            priceUSD: (p.price * mxnToUsd).toFixed(2)
        }));

        res.json(productsWithConvertedPrice);
    } catch (error) {
        next(error); // Pasa el error al middleware global de depuración
    }
};