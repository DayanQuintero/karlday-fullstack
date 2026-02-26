// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // SEGURIDAD: Lectura de rol
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const isAdmin = token !== null && role === 'admin';
    const isLogged = token !== null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/'; 
    };

    const handleOpenCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('karlday_cart')) || [];
        setCartItems(storedCart);
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const handleRemove = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('karlday_cart', JSON.stringify(updatedCart));
    };

    const subtotalMXN = cartItems.reduce((sum, item) => sum + (item.price * item.cantidad), 0);
    const subtotalUSD = cartItems.reduce((sum, item) => sum + (item.priceUsd * item.cantidad), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

    const aplicaDescuento = subtotalMXN >= 1000;
    const descuentoMXN = aplicaDescuento ? (subtotalMXN * 0.10) : 0;
    const descuentoUSD = aplicaDescuento ? (subtotalUSD * 0.10) : 0;
    const totalFinalMXN = subtotalMXN - descuentoMXN;
    const totalFinalUSD = subtotalUSD - descuentoUSD;

    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: '#fff', borderBottom: '1px solid #ebedee', position: 'sticky', top: 0, zIndex: 100 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                    <h1 className="font-bold-brand" style={{ fontSize: '24px', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>KARLDAY</h1>
                </Link>
                
                <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#767677', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase' }}>Nosotros</Link>
                    <Link to="/catalogo" style={{ textDecoration: 'none', color: '#000', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase' }}>Catálogo</Link>
                    
                    {/* PANEL: Solo visible para los 3 administradores VIP */}
                    {isAdmin && (
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#767677', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase' }}>Panel</Link>
                    )}

                    {isLogged ? (
                        <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#d32f2f', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', cursor: 'pointer' }}>Salir</button>
                    ) : (
                        <Link to="/login" style={{ textDecoration: 'none', color: '#000', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase' }}>Login</Link>
                    )}
                    
                    <div onClick={handleOpenCart} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '20px' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {totalItems > 0 && (
                            <span style={{ backgroundColor: '#000', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '11px', fontWeight: 'bold' }}>{totalItems}</span>
                        )}
                    </div>
                </nav>
            </header>

            {isCartOpen && (
                <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', height: '100vh', zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
                    <div onClick={handleCloseCart} style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', cursor: 'pointer' }}></div>
                    <div style={{ width: '400px', maxWidth: '100%', height: '100%', backgroundColor: '#fff', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', borderBottom: '1px solid #ebedee' }}>
                            <h2 className="font-bold-brand" style={{ fontSize: '18px', margin: 0 }}>TU BOLSA</h2>
                            <button onClick={handleCloseCart} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold', color: '#767677' }}>✕</button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '25px' }}>
                            {cartItems.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#767677', marginTop: '50px', fontWeight: 'bold', fontSize: '14px' }}>TU BOLSA ESTÁ VACÍA</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item._id} style={{ display: 'flex', gap: '15px', marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #ebedee' }}>
                                        <img src={item.imageUrl} alt={item.title} style={{ width: '80px', height: '100px', objectFit: 'cover' }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: '0 0 5px 0', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}>{item.title}</p>
                                            <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#767677' }}>CANTIDAD: {item.cantidad}</p>
                                            <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '900' }}>${item.price * item.cantidad} MXN</p>
                                            <p style={{ margin: 0, fontSize: '11px', color: '#767677', fontWeight: 'bold' }}>≈ ${(item.priceUsd * item.cantidad).toFixed(2)} USD</p>
                                        </div>
                                        <button onClick={() => handleRemove(item._id)} style={{ background: 'transparent', border: 'none', color: '#767677', cursor: 'pointer', height: 'fit-content', textDecoration: 'underline', fontSize: '11px', fontWeight: 'bold' }}>ELIMINAR</button>
                                    </div>
                                ))
                            )}
                        </div>
                        {cartItems.length > 0 && (
                            <div style={{ padding: '25px', borderTop: '1px solid #ebedee', backgroundColor: '#f9f9f9' }}>
                                {aplicaDescuento ? (
                                    <div style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '11px', fontWeight: '900', textAlign: 'center', border: '1px solid #ceead6' }}>✅ ¡SE APLICARÁ EL CÓDIGO DE DESCUENTO DEL 10%!</div>
                                ) : (
                                    <div style={{ backgroundColor: '#f1f3f4', color: '#5f6368', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '11px', fontWeight: '900', textAlign: 'center', border: '1px solid #e8eaed' }}>💡 RECUERDA: DESPUÉS DE $1,000 PESOS SE APLICA 10% OFF</div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontWeight: 'bold', fontSize: '13px', color: '#767677' }}>SUBTOTAL:</span><span style={{ fontWeight: 'bold', fontSize: '13px', color: '#767677' }}>${subtotalMXN.toFixed(2)}</span></div>
                                {aplicaDescuento && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#d32f2f' }}><span style={{ fontWeight: '900', fontSize: '13px' }}>DESCUENTO (10%):</span><span style={{ fontWeight: '900', fontSize: '13px' }}>-${descuentoMXN.toFixed(2)}</span></div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ccc', marginBottom: '5px' }}><span style={{ fontWeight: '900', fontSize: '16px' }}>TOTAL MXN:</span><span style={{ fontWeight: '900', fontSize: '22px' }}>${totalFinalMXN.toFixed(2)}</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}><span style={{ fontWeight: 'bold', fontSize: '13px', color: '#767677' }}>TOTAL USD:</span><span style={{ fontWeight: '900', fontSize: '13px', color: '#767677' }}>≈ ${totalFinalUSD.toFixed(2)}</span></div>
                                <button onClick={() => { alert(`¡Pago simulado con éxito! Se cobrarán $${totalFinalMXN.toFixed(2)} MXN a tu tarjeta.`); localStorage.removeItem('karlday_cart'); setCartItems([]); setIsCartOpen(false); }} style={{ width: '100%', padding: '18px', backgroundColor: '#000', color: '#fff', fontWeight: '900', fontSize: '14px', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}>IR AL PAGO</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;