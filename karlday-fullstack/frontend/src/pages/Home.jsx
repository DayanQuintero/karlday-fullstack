import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import '../App.css';

const Home = () => {
  // Simulando los datos que llegarían de tu backend
  const [products, setProducts] = useState([
    { id: 1, title: 'Vestido Rosado', price: 1299, priceUSD: 65, category: 'Mujer' },
    { id: 2, title: 'Pantalón Azul Marino', price: 899, priceUSD: 45, category: 'Hombre' }
  ]);

  return (
    <div>
      <Navbar />
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            title={product.title}
            priceMXN={product.price}
            priceUSD={product.priceUSD}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;