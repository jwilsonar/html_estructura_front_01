import React from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

function ProductCard({ product }) {
    const { dispatch } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        showToast(`${product.nombre} agregado al carrito`);
    };

    return (
        <div className="contenido__producto">
            <img src={product.imagen} alt={product.nombre} />
            <div className="contenido__producto">
                <h3>{product.nombre}</h3>
                <div>
                    <p>S/ {product.precio.toFixed(2)}</p>
                    <button onClick={handleAddToCart}>Añadir al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard; 