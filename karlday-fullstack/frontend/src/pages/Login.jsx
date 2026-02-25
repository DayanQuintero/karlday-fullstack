import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Guardamos el token para usarlo en las peticiones del CRUD
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      
      // Redirigimos al panel de administración
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', padding: '40px', border: '1px solid #eaeaea' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>Iniciar Sesión</h2>
          
          {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>USUARIO</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>CONTRASEÑA</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', outline: 'none' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'black', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;