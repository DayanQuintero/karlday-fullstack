// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            
            {/* --- SECCIÓN HERO (PORTADA) --- */}
            <div style={{ 
                height: '85vh', 
                backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative' 
            }}>
                {/* Filtro oscuro sobre la foto para que resalten las letras */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
                
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '20px' }}>
                    <h1 className="font-bold-brand" style={{ fontSize: '4.5rem', fontWeight: '900', letterSpacing: '8px', marginBottom: '20px', textTransform: 'uppercase' }}>
                        Karlday
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', fontWeight: '300', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        Redefiniendo la moda urbana premium.
                    </p>
                    <Link to="/catalogo" style={{ 
                        padding: '18px 45px', 
                        backgroundColor: '#fff', 
                        color: '#000', 
                        textDecoration: 'none', 
                        fontWeight: '900', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px',
                        transition: 'all 0.3s ease'
                    }}>
                        DESCUBRIR COLECCIÓN
                    </Link>
                </div>
            </div>

            {/* --- SECCIÓN NOSOTROS (MISIÓN Y VISIÓN) --- */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 20px', textAlign: 'center' }}>
                <h2 className="font-bold-brand" style={{ fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '20px' }}>
                    ¿Quisieras formar parte de Karlday?
                </h2>
                <p style={{ color: '#767677', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 60px auto', lineHeight: '1.8' }}>
                    Buscamos personas apasionadas por el estilo, la innovación y el diseño exclusivo. En Karlday no solo vendemos prendas, creamos una identidad para quienes no temen destacar en la ciudad.
                </p>

                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {/* Caja Misión */}
                    <div style={{ flex: '1 1 400px', padding: '50px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <h3 className="font-bold-brand" style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '3px solid #000', paddingBottom: '10px', display: 'inline-block' }}>
                            NUESTRA MISIÓN
                        </h3>
                        <p style={{ lineHeight: '1.8', color: '#000', fontSize: '15px' }}>
                            Empoderar a nuestros clientes a través de prendas de alta calidad y diseño vanguardista. Buscamos redefinir la moda urbana, ofreciendo exclusividad, confort y la máxima confianza en cada detalle de nuestras colecciones para el día a día.
                        </p>
                    </div>

                    {/* Caja Visión */}
                    <div style={{ flex: '1 1 400px', padding: '50px', backgroundColor: '#000', color: '#fff', textAlign: 'left' }}>
                        <h3 className="font-bold-brand" style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '3px solid #fff', paddingBottom: '10px', display: 'inline-block' }}>
                            NUESTRA VISIÓN
                        </h3>
                        <p style={{ lineHeight: '1.8', fontSize: '15px', color: '#f4f4f4' }}>
                            Posicionarnos como la marca líder en e-commerce de moda urbana a nivel nacional e internacional. Inspirar una cultura de elegancia donde Karlday sea reconocido no solo como una tienda, sino como un referente absoluto de estilo y calidad.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN REDES SOCIALES --- */}
            <div style={{ backgroundColor: '#f9f9f9', padding: '80px 20px', textAlign: 'center', borderTop: '1px solid #ebedee' }}>
                <h3 className="font-bold-brand" style={{ fontSize: '1.8rem', textTransform: 'uppercase', marginBottom: '30px' }}>
                    Conecta con la marca
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    
                    {/* Botón Facebook */}
                    <a href="https://www.facebook.com/share/1CGNB6taTb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ 
                        padding: '15px 40px', 
                        border: '2px solid #000', 
                        color: '#000', 
                        textDecoration: 'none', 
                        fontWeight: '900', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px' 
                    }}>
                        Seguir en Facebook
                    </a>

                    {/* Botón Instagram */}
                    <a href="https://www.facebook.com/share/1CGNB6taTb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ 
                        padding: '15px 40px', 
                        backgroundColor: '#000', 
                        color: '#fff', 
                        textDecoration: 'none', 
                        fontWeight: '900', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px' 
                    }}>
                        Seguir en Instagram
                    </a>
                </div>
            </div>
            
        </div>
    );
};

export default Home;