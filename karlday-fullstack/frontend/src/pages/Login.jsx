// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    
    // NUEVO ESTADO: Controla la notificación visual
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    // Función para mostrar la notificación elegante y redirigir
    const showNotification = (message, type, redirect = false) => {
        setToast({ show: true, message, type });
        
        // Esperamos 2 segundos para que el usuario lea el mensaje
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
            if (redirect) {
                window.location.href = '/'; // Recargamos para actualizar la cabecera
            }
        }, 2000); 
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const adminEmails = [
            'evelyn.dayan@karlday.com', 
            'jorge.alejandro@karlday.com', 
            'michelle@karlday.com'
        ];

        const normalUsers = {
            'valeria.mendoza@gmail.com': 'usuarioFacil1',
            'carlos.vargas@hotmail.com': 'usuarioFacil2',
            'cristina.ortiz@outlook.com': 'usuarioFacil3',
            'daniela.silva@gmail.com': 'usuarioFacil4',
            'francisco.navarro@yahoo.com': 'usuarioFacil5'
        };

        // --- ACCESO RÁPIDO: Trabajadores VIP ---
        if (adminEmails.includes(correo) && password === 'passwordAdmin123') {
            localStorage.setItem('token', 'sesion_admin_prueba');
            localStorage.setItem('role', 'admin');
            showNotification('¡Bienvenido Administrador Karlday!', 'success', true);
            return;
        }

        // --- ACCESO RÁPIDO: Clientes de Prueba ---
        if (normalUsers[correo] && normalUsers[correo] === password) {
            localStorage.setItem('token', 'sesion_user_prueba');
            localStorage.setItem('role', 'user');
            showNotification('¡Bienvenido a Karlday! Disfruta tu compra.', 'success', true);
            return;
        }

        // --- CONEXIÓN A MONGODB ---
        try {
            const res = await fetch('http://127.0.0.1:10000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });
            const data = await res.json();

            if (data.success || res.ok) {
                localStorage.setItem('token', data.token || 'sesion_activa');
                
                if (adminEmails.includes(correo)) {
                    localStorage.setItem('role', 'admin');
                    showNotification('¡Bienvenido Administrador Karlday!', 'success', true);
                } else {
                    localStorage.setItem('role', 'user');
                    showNotification('¡Bienvenido a Karlday! Disfruta tu compra.', 'success', true);
                }
            } else {
                showNotification('Credenciales incorrectas. Verifica tu correo y contraseña.', 'error', false);
            }
        } catch (error) {
            console.error("Error en login:", error);
            showNotification('Error al conectar con el servidor.', 'error', false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f9f9f9', position: 'relative' }}>
            
            {/* --- NOTIFICACIÓN FLOTANTE (TOAST) --- */}
            {toast.show && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: toast.type === 'error' ? '#d32f2f' : '#000',
                    color: '#fff',
                    padding: '15px 30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    <span style={{ fontSize: '18px' }}>{toast.type === 'error' ? '❌' : '✔️'}</span>
                    {toast.message}
                </div>
            )}

            <div style={{ backgroundColor: '#fff', padding: '50px', width: '100%', maxWidth: '400px', border: '1px solid #ebedee', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h2 className="font-bold-brand" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', textTransform: 'uppercase' }}>Iniciar Sesión</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>CORREO ELECTRÓNICO</label>
                        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #000', outline: 'none' }} placeholder="ejemplo@correo.com" />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '900', marginBottom: '8px' }}>CONTRASEÑA</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #000', outline: 'none' }} placeholder="********" />
                    </div>
                    <button type="submit" style={{ padding: '15px', backgroundColor: '#000', color: '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', textTransform: 'uppercase', marginTop: '10px' }}>Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;