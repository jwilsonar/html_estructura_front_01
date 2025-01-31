import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

function Home() {
    const featuredProducts = [
        { id: 1, nombre: 'Juego Lorem 1', precio: 150.00, imagen: 'juego.avif' },
        { id: 2, nombre: 'Juego Lorem 2', precio: 200.00, imagen: 'juego.avif' },
        { id: 3, nombre: 'Juego Lorem 3', precio: 500.00, imagen: 'juego.avif' }
    ];

    return (
        <main className="landing-main">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Bienvenido a Joy Box</h1>
                    <p>Tu destino para los mejores videojuegos</p>
                    <div className="hero-buttons">
                        <Link to="/products" className="cta-button">Ver Catálogo</Link>
                        <Link to="/register" className="secondary-button">Crear Cuenta</Link>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2>¿Por qué elegirnos?</h2>
                <div className="features-container">
                    <div className="feature-card">
                        <span className="feature-icon">🎮</span>
                        <h3>Amplio Catálogo</h3>
                        <p>Miles de juegos para todas las plataformas</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">⚡</span>
                        <h3>Entrega Inmediata</h3>
                        <p>Códigos digitales al instante</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">💰</span>
                        <h3>Mejores Precios</h3>
                        <p>Ofertas y descuentos exclusivos</p>
                    </div>
                </div>
            </section>

            <section className="featured-products">
                <h2>Productos Destacados</h2>
                <div className="contenedor__productos">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home; 