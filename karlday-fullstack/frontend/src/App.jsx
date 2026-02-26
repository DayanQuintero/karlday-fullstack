// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importo mi Header corporativo
import Header from './components/Header';

// Importo todas mis páginas
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProductoDetalle from './pages/ProductoDetalle'; // Importo mi nueva página de detalle

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          {/* Añado la ruta dinámica para ver el detalle de cada prenda */}
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;