// src/components/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // Función que se activa al hacer clic en la tarjeta
    const handleClick = () => {
        // Redirijo a la página de detalles y le paso los datos del producto actual
        navigate(`/producto/${product._id}`, { state: { product } });
    };

    return (
        <div onClick={handleClick} style={{ position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
            
            {product.badge && (
                <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#000', color: '#fff', padding: '5px 10px', fontSize: '10px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', zIndex: 10 }}>
                    {product.badge}
                </div>
            )}
            
            <div style={{ width: '100%', height: '380px', overflow: 'hidden', backgroundColor: '#f4f4f4' }}>
                <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>

            <div style={{ paddingTop: '15px' }}>
                <h3 className="font-bold-brand" style={{ fontSize: '15px', marginBottom: '4px' }}>
                    ${product.price} MXN
                </h3>
                <p style={{ fontSize: '13px', textTransform: 'uppercase', color: '#000', marginBottom: '2px' }}>
                    {product.title}
                </p>
                <p style={{ fontSize: '12px', color: '#767677', marginBottom: '4px' }}>
                    {product.category}
                </p>
                {product.priceUsd && (
                    <p style={{ fontSize: '12px', color: '#767677', fontWeight: '700' }}>
                        ≈ ${product.priceUsd} USD
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;