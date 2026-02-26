// src/pages/ProductoDetalle.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductoDetalle = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    const [cantidad, setCantidad] = useState(1);
    
    // ESTADO NUEVO: Controla si la notificación de "Agregado" está visible o no
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    if (!product) {
        return (
            <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
                <h2 className="font-bold-brand">Aún no has seleccionado ninguna prenda.</h2>
                <button 
                    onClick={() => navigate('/catalogo')} 
                    style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                    Volver al Catálogo
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        // 1. LÓGICA DE CARRITO ACTIVO: Guardo el producto en la memoria de la computadora
        let carritoActual = JSON.parse(localStorage.getItem('karlday_cart')) || [];
        
        // Verifico si la prenda ya estaba en el carrito para solo sumarle la cantidad
        const index = carritoActual.findIndex(item => item._id === product._id);
        if(index !== -1) {
            carritoActual[index].cantidad += parseInt(cantidad);
        } else {
            carritoActual.push({ ...product, cantidad: parseInt(cantidad) });
        }
        
        // Guardo el carrito actualizado
        localStorage.setItem('karlday_cart', JSON.stringify(carritoActual));

        // 2. LÓGICA DEL MENSAJE VISUAL: Muestro la notificación
        setMostrarMensaje(true);
        
        // La oculto automáticamente después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
            setMostrarMensaje(false);
        }, 3000);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px', display: 'flex', gap: '50px', flexWrap: 'wrap', backgroundColor: '#fff', minHeight: '80vh', position: 'relative' }}>
            
            {/* --- NOTIFICACIÓN FLOTANTE (TOAST) --- */}
            {mostrarMensaje && (
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '20px 30px',
                    fontSize: '14px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    borderRadius: '4px'
                }}>
                    <span style={{ fontSize: '20px' }}>✔️</span> 
                    <div>
                        ¡SE AGREGÓ AL CARRITO!
                        <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#ccc', fontWeight: 'normal' }}>
                            {cantidad}x {product.title}
                        </p>
                    </div>
                </div>
            )}
            
            {/* SECCIÓN IZQUIERDA: Fotografía del producto */}
            <div style={{ flex: '1 1 500px', backgroundColor: '#f4f4f4', position: 'relative' }}>
                {product.badge && (
                    <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: '#000', color: '#fff', padding: '8px 15px', fontSize: '12px', fontWeight: '900', letterSpacing: '1px' }}>
                        {product.badge}
                    </div>
                )}
                <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '700px' }} 
                />
            </div>

            {/* SECCIÓN DERECHA: Información y compras */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                
                <p style={{ textTransform: 'uppercase', color: '#767677', fontWeight: '700', fontSize: '13px', marginBottom: '10px' }}>
                    Colección {product.category}
                </p>
                
                <h1 className="font-bold-brand" style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '20px', textTransform: 'uppercase' }}>
                    {product.title}
                </h1>
                
                <div style={{ marginBottom: '30px' }}>
                    <p style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>
                        ${product.price} MXN
                    </p>
                    {product.priceUsd && (
                        <p style={{ fontSize: '1.2rem', color: '#767677', fontWeight: '700' }}>
                            ≈ ${product.priceUsd} USD
                        </p>
                    )}
                </div>

                <p style={{ color: '#000', lineHeight: '1.6', marginBottom: '40px', fontSize: '15px' }}>
                    Exclusividad y diseño premium en cada detalle. Esta pieza de la colección Karlday ha sido confeccionada con materiales de la más alta calidad para asegurar durabilidad, confort y un estilo vanguardista incomparable.
                </p>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <input 
                        type="number" 
                        min="1" 
                        value={cantidad} 
                        onChange={(e) => setCantidad(e.target.value)} 
                        style={{ width: '80px', padding: '15px', border: '1px solid #000', fontSize: '1.2rem', textAlign: 'center', fontWeight: 'bold', outline: 'none' }} 
                    />
                    
                    <button 
                        onClick={handleAddToCart} 
                        style={{ flex: 1, padding: '15px', backgroundColor: '#000', color: '#fff', fontSize: '1.1rem', letterSpacing: '1px', fontWeight: 'bold', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
                    >
                        AGREGAR AL CARRITO
                    </button>
                </div>

                <button 
                    onClick={() => navigate('/catalogo')} 
                    style={{ padding: '15px', backgroundColor: 'transparent', color: '#000', border: '1px solid #ebedee', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer', transition: 'border 0.3s ease' }}
                    onMouseOver={e => e.currentTarget.style.border = '1px solid #000'}
                    onMouseOut={e => e.currentTarget.style.border = '1px solid #ebedee'}
                >
                    SEGUIR COMPRANDO
                </button>

                <ul style={{ marginTop: '40px', paddingLeft: '20px', color: '#767677', fontSize: '13px', lineHeight: '2' }}>
                    <li>Envío gratis en compras mayores a $999 MXN</li>
                    <li>Devoluciones gratuitas en un plazo de 30 días</li>
                    <li>Garantía de calidad oficial Karlday</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductoDetalle;