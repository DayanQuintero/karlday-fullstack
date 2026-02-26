// src/pages/Catalogo.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [categoriaActiva, setCategoriaActiva] = useState('Mujer'); 

    // 1. Inventario premium fijo: Imágenes verificadas, precios menores a $500 MXN y USD.
    const inventarioPremium = [
        // --- SECCIÓN MUJER ---
        { _id: 'm1', title: 'Vestido de Noche Elegante', price: 499, priceUsd: 29.35, category: 'Mujer', badge: 'MÁS VENDIDO', imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80' },
        { _id: 'm4', title: 'Abrigo de Invierno Camel', price: 499, priceUsd: 29.35, category: 'Mujer', imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80' },
        { _id: 'm5', title: 'Leggings Deportivos Pro', price: 299, priceUsd: 17.58, category: 'Mujer', badge: 'LO MEJOR PARA TI', imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80' },
        { _id: 'm6', title: 'Top Transpirable', price: 199, priceUsd: 11.70, category: 'Mujer', imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80' },
        { _id: 'm7', title: 'Zapatillas Running Mujer', price: 499, priceUsd: 29.35, category: 'Mujer', badge: 'TENDENCIA', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
        { _id: 'm9', title: 'Gafas de Sol Vintage', price: 250, priceUsd: 14.70, category: 'Mujer', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
        { _id: 'm10', title: 'Suéter de Punto Grueso', price: 399, priceUsd: 23.47, category: 'Mujer', imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80' },

        // --- SECCIÓN HOMBRE ---
        { _id: 'h1', title: 'Chamarra de Cuero Negra', price: 499, priceUsd: 29.35, category: 'Hombre', badge: 'MÁS VENDIDO', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
        { _id: 'h4', title: 'Sudadera Urbana Gris', price: 450, priceUsd: 26.47, category: 'Hombre', badge: 'NUEVO', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80' },
        { _id: 'h6', title: 'Playera Básica Negra', price: 199, priceUsd: 11.70, category: 'Hombre', badge: 'BÁSICO', imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80' },
        { _id: 'h7', title: 'Jeans Slim Fit', price: 399, priceUsd: 23.47, category: 'Hombre', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80' },
        { _id: 'h8', title: 'Reloj Minimalista', price: 499, priceUsd: 29.35, category: 'Hombre', badge: 'EXCLUSIVO', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
        { _id: 'h10', title: 'Botas Chelsea de Piel', price: 499, priceUsd: 29.35, category: 'Hombre', imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80' },

        // --- SECCIÓN NUEVO ---
        { _id: 'n2', title: 'Mochila Urbana Impermeable', price: 399, priceUsd: 23.47, category: 'Nuevo', badge: 'RECIÉN LLEGADO', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
        { _id: 'n9', title: 'Botas de Senderismo', price: 499, priceUsd: 29.35, category: 'Nuevo', imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80' },
        { _id: 'n10', title: 'Lentes Deportivos Espejo', price: 299, priceUsd: 17.58, category: 'Nuevo', badge: 'TENDENCIA', imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80' },

        // --- SECCIÓN COLECCIONES ---
        { _id: 'c2', title: 'Conjunto Sastre Minimalista', price: 499, priceUsd: 29.35, category: 'Colecciones', badge: 'PREMIUM', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' },
        { _id: 'c4', title: 'Set de Yoga Pro Karlday', price: 450, priceUsd: 26.47, category: 'Colecciones', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80' },
        { _id: 'c6', title: 'Zapatos Oxford de Lujo', price: 499, priceUsd: 29.35, category: 'Colecciones', badge: 'EDICIÓN LIMITADA', imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80' },
        { _id: 'c7', title: 'Maleta de Viaje Karlday', price: 499, priceUsd: 29.35, category: 'Colecciones', imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80' },
        { _id: 'c9', title: 'Tenis Colaboración Exclusiva', price: 499, priceUsd: 29.35, category: 'Colecciones', badge: 'MÁS VENDIDO', imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80' },
        { _id: 'c10', title: 'Reloj Cronógrafo Gold', price: 499, priceUsd: 29.35, category: 'Colecciones', imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80' }
    ];

    // 2. Conecto a MongoDB y mezclo los productos de la base de datos con los fijos
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const res = await fetch('http://127.0.0.1:10000/api/products');
                const data = await res.json();
                
                if (data.success) {
                    // Si responde MongoDB, sumo los productos de la BD a los que ya tengo en código
                    setProductos([...inventarioPremium, ...data.data]);
                } else {
                    setProductos(inventarioPremium);
                }
            } catch (error) {
                console.error("Error conectando a MongoDB:", error);
                // Si el servidor está apagado, al menos muestro mis productos fijos
                setProductos(inventarioPremium); 
            }
        };

        cargarProductos();
    }, []);

    const categorias = ['Mujer', 'Hombre', 'Nuevo', 'Colecciones'];

    return (
        <div style={{ padding: '40px 20px', backgroundColor: '#fff', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="font-bold-brand" style={{ fontSize: '2.5rem', textTransform: 'uppercase' }}>
                    CATÁLOGO KARLDAY
                </h1>
                <p style={{ color: '#767677', marginTop: '10px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>
                    Explorando la sección: {categoriaActiva}
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap', borderBottom: '1px solid #ebedee', paddingBottom: '15px' }}>
                {categorias.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setCategoriaActiva(cat)}
                        style={{ padding: '10px 20px', backgroundColor: categoriaActiva === cat ? '#000' : 'transparent', color: categoriaActiva === cat ? '#fff' : '#000', border: '1px solid #000', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer', fontSize: '13px', transition: 'all 0.3s ease' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
                {productos.filter(p => p.category === categoriaActiva).map(producto => (
                    <ProductCard key={producto._id} product={producto} />
                ))}
            </div>
        </div>
    );
};

export default Catalogo;