import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div>
                <ul>
                    <li><Link to="/login">Inicio de sesión</Link></li>
                    <li><Link to="/register">Registro</Link></li>
                    <li><Link to="/products">Productos</Link></li>
                </ul>
            </div>
            <div>
                <p>Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer; 