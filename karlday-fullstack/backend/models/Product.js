const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, default: false } // Manteniendo la compatibilidad con tus 'tasks' anteriores
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);