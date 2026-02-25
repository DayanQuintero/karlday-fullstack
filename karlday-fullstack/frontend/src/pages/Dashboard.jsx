import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        // Uso de ruta relativa para que funcione en Render
        const res = await fetch('/api/products', {
          headers: { 'auth-token': token }
        });
        
        if (!res.ok) throw new Error('Error al obtener inventario');
        
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>PANEL ADMINISTRATIVO</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {products.map(product => (
          <div key={product._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid #ccc', backgroundColor: '#111', color: 'white' }}>
            <p>{product.title}</p>
            <div>
              <button style={{ marginRight: '10px', background: 'transparent', color: 'white', border: '1px solid white', padding: '5px 10px' }}>EDITAR</button>
              <button style={{ background: 'transparent', color: 'gray', border: 'none' }}>ELIMINAR</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;