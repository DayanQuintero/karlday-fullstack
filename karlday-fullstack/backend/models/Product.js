// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    priceUsd: { type: Number },
    hasDiscount: { type: Boolean, default: false },
    discountPercent: { type: String },
    badge: { type: String }
}, { timestamps: true });

// LA CLAVE: Exportar directamente el modelo
module.exports = mongoose.model('Product', productSchema);