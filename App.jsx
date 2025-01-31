import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
// Importar otras páginas...

function App() {
    return (
        <Router>
            <CartProvider>
                <ToastProvider>
                    <div className="app">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/* Agregar más rutas según sea necesario */}
                        </Routes>
                        <Footer />
                    </div>
                </ToastProvider>
            </CartProvider>
        </Router>
    );
}

export default App; 