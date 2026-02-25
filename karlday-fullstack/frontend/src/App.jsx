import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Componente para proteger la ruta del Dashboard
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública: Catálogo de productos */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta pública: Pantalla de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta privada: Panel de administración (Protegida) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;