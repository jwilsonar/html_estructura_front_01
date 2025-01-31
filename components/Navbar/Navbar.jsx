import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Navbar() {
    const { state } = useCart();
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav>
            <div className="nav-brand">
                <Link to="/">
                    <i className="fas fa-gamepad"></i>
                    Joy Box
                </Link>
            </div>
            <div className="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li><Link to="/"><i className="fas fa-home"></i> Inicio</Link></li>
                <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Inicio de sesión</Link></li>
                <li><Link to="/register"><i className="fas fa-user-plus"></i> Registro</Link></li>
                <li><Link to="/products"><i className="fas fa-shopping-bag"></i> Productos</Link></li>
                <li className="cart-menu-item">
                    <Link to="/cart">
                        <i className="fas fa-shopping-cart"></i> 
                        Carrito
                        <span className={`cart-count ${totalItems > 0 ? 'active' : ''}`}>
                            {totalItems}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar; 