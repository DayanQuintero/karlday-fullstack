// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [tipoCambio, setTipoCambio] = useState(17); // Valor de respaldo
    
    // Estado del formulario para capturar los datos de la nueva prenda
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: 'Mujer',
        description: '',
        imageUrl: '',
        hasDiscount: false,
        discountPercent: '10'
    });

    // 1. SEGURIDAD Y CARGA INICIAL
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        // Si no hay token o no es administrador (Michelle, Jorge o Evelyn), lo sacamos
        if (!token || role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchProducts();
        fetchCurrency();
    }, [navigate]);

    // 2. OBTENER PRODUCTOS (GET)
    const fetchProducts = async () => {
        try {
            const res = await fetch('http://127.0.0.1:10000/api/products');
            const data = await res.json();
            if (data.success) setProducts(data.data);
        } catch (error) {
            console.error("Error al cargar inventario:", error);
        }
    };

    // 3. OBTENER DÓLAR EN VIVO (API EXTERNA)
    const fetchCurrency = async () => {
        try {
            const res = await fetch('http://127.0.0.1:10000/api/currency/dolar');
            const data = await res.json();
            if (data.success) {
                setTipoCambio(data.rate); // Actualiza el recuadro verde
            }
        } catch (error) {
            console.error("Error en API cambiaria:", error);
        }
    };

    // 4. FUNCIÓN MAESTRA: AGREGAR PRODUCTO CON SEGURIDAD JWT
    const handleAdd = async (e) => {
        e.preventDefault();
        
        // Recuperamos la llave digital (Token) guardada en el Login
        const token = localStorage.getItem('token'); 
        
        // Calculamos el precio en USD usando el valor real de la API externa
        const priceUsd = (parseFloat(formData.price) / tipoCambio).toFixed(2);
        
        const finalProduct = {
            ...formData,
            priceUsd: parseFloat(priceUsd),
            badge: formData.hasDiscount ? `-${formData.discountPercent}% OFF` : 'NUEVO'
        };

        try {
            const res = await fetch('http://127.0.0.1:10000/api/products', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    // ENVIAMOS EL TOKEN AL SERVIDOR PARA QUE NOS DEJE PASAR (Bearer)
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(finalProduct)
            });
            
            const result = await res.json();

            if (res.ok) {
                alert(`¡Producto "${formData.title}" publicado! El servidor validó tu token JWT.`);
                // Limpiamos el formulario para la siguiente prenda
                setFormData({ title: '', price: '', category: 'Mujer', description: '', imageUrl: '', hasDiscount: false, discountPercent: '10' });
                fetchProducts();
            } else {
                // Si el servidor rechaza el token o faltan datos
                alert(`Error de seguridad: ${result.error}`);
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor de seguridad.");
        }
    };

    return (
        <div style={{ padding: '40px 20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* CABECERA DEL PANEL */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 className="font-bold-brand" style={{ fontSize: '2.5rem', textTransform: 'uppercase', margin: 0 }}>
                        PANEL DE ADMINISTRACIÓN
                    </h1>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {/* RECUADRO DINÁMICO DEL DÓLAR */}
                        <div style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '8px 15px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #ceead6' }}>
                            DÓLAR HOY: ${tipoCambio.toFixed(2)} MXN
                        </div>
                        <div style={{ backgroundColor: '#000', color: '#fff', padding: '8px 15px', fontSize: '12px', fontWeight: 'bold' }}>
                            SESIÓN ACTIVA
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                    
                    {/* COLUMNA IZQUIERDA: FORMULARIO */}
                    <div style={{ flex: '1 1 600px', backgroundColor: '#fff', padding: '40px', border: '1px solid #ebedee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <h2 className="font-bold-brand" style={{ fontSize: '1.5rem', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
                            AÑADIR NUEVA PRENDA
                        </h2>
                        
                        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>NOMBRE DEL PRODUCTO</label>
                                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '12px', border: '1px solid #000', outline: 'none' }} placeholder="Ej. Chamarra Essential" />
                                </div>
                                <div style={{ width: '150px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>CATEGORÍA</label>
                                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #000', outline: 'none', backgroundColor: '#fff' }}>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Colecciones">Colecciones</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>DESCRIPCIÓN DE LA PRENDA</label>
                                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required style={{ width: '100%', padding: '12px', border: '1px solid #000', outline: 'none', minHeight: '100px', resize: 'vertical' }} placeholder="Materiales, corte y detalles..."></textarea>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>ENLACE DE FOTOGRAFÍA (URL)</label>
                                <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} required style={{ width: '100%', padding: '12px', border: '1px solid #000', outline: 'none' }} placeholder="https://ejemplo.com/foto.jpg" />
                            </div>

                            <div style={{ border: '1px solid #ebedee', padding: '20px', backgroundColor: '#f9f9f9' }}>
                                <h3 className="font-bold-brand" style={{ fontSize: '14px', marginBottom: '15px' }}>CONFIGURACIÓN DE PRECIO</h3>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>PRECIO EN MXN</label>
                                        <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={{ width: '100%', padding: '12px', border: '1px solid #000', outline: 'none' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={formData.hasDiscount} onChange={e => setFormData({...formData, hasDiscount: e.target.checked})} />
                                            DESCUENTO DE TEMPORADA
                                        </label>
                                        {formData.hasDiscount && (
                                            <select value={formData.discountPercent} onChange={e => setFormData({...formData, discountPercent: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '10px', border: '1px solid #d32f2f', color: '#d32f2f', fontWeight: 'bold' }}>
                                                <option value="5">5% OFF</option>
                                                <option value="10">10% OFF</option>
                                                <option value="15">15% OFF</option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" style={{ padding: '18px', backgroundColor: '#000', color: '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                PUBLICAR EN CATÁLOGO
                            </button>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: RESUMEN */}
                    <div style={{ flex: '1 1 400px' }}>
                        <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid #ebedee' }}>
                            <h2 className="font-bold-brand" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>RESUMEN DE INVENTARIO</h2>
                            <p style={{ fontSize: '13px', color: '#767677', lineHeight: '1.6' }}>
                                Actualmente gestionas <strong>{products.length}</strong> prendas. El sistema de seguridad <strong>JWT</strong> está activo para proteger el inventario de Karlday contra accesos no autorizados.
                            </p>
                            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f4f4f4', borderLeft: '4px solid #000' }}>
                                <p style={{ fontSize: '13px', margin: 0 }}>
                                    Cualquier cambio se verá reflejado en el catálogo global tras validar el token de administración.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;