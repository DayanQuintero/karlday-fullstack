// backend/poblarProductos.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Asegúrate de que tu modelo se llame Product

dotenv.config();

// Configuro mis prendas premium con los links reales de Adidas para que luzcan de 10
const productos = [
  {
    title: "Tenis Adizero EVO SL",
    price: 3599,
    category: "Zapatillas",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/70743b09215049909986b510bc440d9c_9366/Tenis_Adizero_Evo_SL_Blanco_IH0230_01_standard.jpg"
  },
  {
    title: "Tenis VL Court Bold",
    price: 1799,
    category: "Zapatillas",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/43770119853344669866347101e405a1_9366/Tenis_VL_Court_Bold_Marron_IH5411_01_standard.jpg"
  },
  {
    title: "Polo Ingeniería Audi F1",
    price: 2299,
    category: "Playeras",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2069ec4e3d3f44358a946b510bc440d9c_9366/Playera_Copa_Mundial_26_Blanco_IH0230_01_standard.jpg"
  },
  {
    title: "Pants Deportivos Teamgeist",
    price: 1599,
    category: "Pantalones",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/808b88d3027b4e9491f0ae0e0081691a_9366/Pants_Deportivos_Teamgeist_Negro_HF0123_01_standard.jpg"
  }
];

// Conecto a mi base de datos para inyectar el inventario de Karlday
mongoose.connect(process.env.MONGO_URI || 'tu_url_de_mongodb_aqui')
  .then(async () => {
    console.log("Inyectando productos a Karlday...");
    await Product.deleteMany({}); // Limpio productos viejos para no duplicar
    await Product.insertMany(productos);
    console.log("¡Catálogo actualizado con éxito! 🚀");
    process.exit();
  })
  .catch(err => {
    console.error("Error al poblar:", err);
    process.exit(1);
  });