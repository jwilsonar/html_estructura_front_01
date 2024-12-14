// Credenciales de ejemplo.
let USUARIOS_VALIDOS = [
    { email: 'usuario@ejemplo.com', password: '123456', username: 'usuario' },
    { email: 'admin@ejemplo.com', password: 'admin123', username: 'admin' }
];

// Estructura para los productos
const PRODUCTOS = [
    { id: 1, nombre: 'Juego Lorem 1', precio: 150.00, imagen: 'juego.avif' },
    { id: 2, nombre: 'Juego Lorem 2', precio: 200.00, imagen: 'juego.avif' },
    { id: 3, nombre: 'Juego Lorem 3', precio: 500.00, imagen: 'juego.avif' }
];

// Funciones para el carrito
let carrito = [];

function inicializarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarVistaCarrito();
    }
}

function agregarAlCarrito(idProducto) {
    const producto = PRODUCTOS.find(p => p.id === idProducto);
    if (producto) {
        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.id === idProducto);
        
        if (productoExistente) {
            alert('Este producto ya está en el carrito');
            return;
        }
        
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito();
        alert('Producto agregado al carrito');
        
        // Si estamos en la página de lista de productos, redirigir al carrito
        if (window.location.pathname.includes('lista-productos.html')) {
            window.location.href = 'carrito-compras-productos.html';
        }
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0).toFixed(2);
}

function actualizarVistaCarrito() {
    const carritoLista = document.getElementById('carritoLista');
    const totalElement = document.getElementById('totalCarrito');
    const carritoVacio = document.getElementById('carritoVacio');
    const carritoConProductos = document.getElementById('carritoConProductos');
    
    if (carritoLista && totalElement) {
        if (carrito.length === 0) {
            if (carritoVacio && carritoConProductos) {
                carritoVacio.style.display = 'block';
                carritoConProductos.style.display = 'none';
            }
        } else {
            if (carritoVacio && carritoConProductos) {
                carritoVacio.style.display = 'none';
                carritoConProductos.style.display = 'block';
            }
            
            carritoLista.innerHTML = carrito.map((producto, index) => `
                <li>
                    ${producto.nombre} - S/. ${producto.precio.toFixed(2)}
                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </li>
            `).join('');
            
            totalElement.textContent = `S/. ${calcularTotal()}`;
        }
    }
}

// Validación de inicio de sesión
function validarFormulario(event) {
    event.preventDefault();
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensajeError');
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensajeError.textContent = 'Por favor, ingrese un correo electrónico válido';
        return false;
    }
    
    // Validar longitud de la contraseña
    if (password.length < 6) {
        mensajeError.textContent = 'La contraseña debe tener al menos 6 caracteres';
        return false;
    }
    
    // Verificar credenciales
    const usuarioValido = USUARIOS_VALIDOS.find(
        usuario => usuario.email === email && usuario.password === password
    );
    
    if (usuarioValido) {
        mensajeError.textContent = '';
        alert('¡Inicio de sesión exitoso!');
        window.location.href = 'index.html';
        return true;
    } else {
        mensajeError.textContent = 'Credenciales incorrectas';
        return false;
    }
}

// Función para validar el registro
function validarRegistro(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const mensajeError = document.getElementById('mensajeError');
    
    // Validar longitud del nombre de usuario
    if (username.length < 3) {
        mensajeError.textContent = 'El nombre de usuario debe tener al menos 3 caracteres';
        return false;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensajeError.textContent = 'Por favor, ingrese un correo electrónico válido';
        return false;
    }
    
    // Validar que el email no esté ya registrado
    if (USUARIOS_VALIDOS.some(usuario => usuario.email === email)) {
        mensajeError.textContent = 'Este correo electrónico ya está registrado';
        return false;
    }
    
    // Validar longitud de la contraseña
    if (password.length < 6) {
        mensajeError.textContent = 'La contraseña debe tener al menos 6 caracteres';
        return false;
    }
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        mensajeError.textContent = 'Las contraseñas no coinciden';
        return false;
    }
    
    // Si todo está bien, registrar al usuario
    const nuevoUsuario = {
        username: username,
        email: email,
        password: password
    };
    
    // Agregar el nuevo usuario al array de usuarios válidos
    USUARIOS_VALIDOS.push(nuevoUsuario);
    
    // Guardar en localStorage para persistencia (en un caso real esto iría a una base de datos)
    localStorage.setItem('usuarios', JSON.stringify(USUARIOS_VALIDOS));
    
    alert('¡Registro exitoso! Ahora puedes iniciar sesión');
    window.location.href = 'inicio-sesion.html';
    return true;
}

// Funciones para finalizar pedido
function cargarResumenPedido() {
    const resumenLista = document.getElementById('resumenPedido');
    const totalElement = document.getElementById('totalPedido');
    
    if (resumenLista && totalElement) {
        if (carrito.length === 0) {
            window.location.href = 'carrito-compras-productos.html';
            return;
        }
        
        resumenLista.innerHTML = carrito.map(producto => `
            <li>${producto.nombre} - S/. ${producto.precio.toFixed(2)}</li>
        `).join('');
        
        totalElement.textContent = `S/. ${calcularTotal()}`;
    }
}

function validarTarjeta(numero) {
    // Implementación del algoritmo de Luhn
    let sum = 0;
    let isEven = false;
    
    // Recorrer de derecha a izquierda
    for (let i = numero.length - 1; i >= 0; i--) {
        let digit = parseInt(numero[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

function validarFechaExpiracion(fecha) {
    const [mes, año] = fecha.split('/');
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear() % 100;
    const mesActual = fechaActual.getMonth() + 1;
    
    const mesExp = parseInt(mes);
    const añoExp = parseInt(año);
    
    return (añoExp > añoActual || (añoExp === añoActual && mesExp >= mesActual));
}

function finalizarPedido() {
    const mensajeError = document.getElementById('mensajeError');
    
    // Validar que haya productos en el carrito
    if (carrito.length === 0) {
        mensajeError.textContent = 'No hay productos en el carrito';
        return;
    }
    
    // Validar formulario de envío
    const formEnvio = document.getElementById('formEnvio');
    if (!formEnvio.checkValidity()) {
        mensajeError.textContent = 'Por favor, complete correctamente todos los campos de envío';
        return;
    }
    
    // Validar formulario de pago
    const formPago = document.getElementById('formPago');
    if (!formPago.checkValidity()) {
        mensajeError.textContent = 'Por favor, complete correctamente todos los campos de pago';
        return;
    }
    
    // Validar número de tarjeta
    const numeroTarjeta = document.getElementById('card-number').value;
    if (!validarTarjeta(numeroTarjeta)) {
        mensajeError.textContent = 'Número de tarjeta inválido';
        return;
    }
    
    // Validar fecha de expiración
    const fechaExp = document.getElementById('expiry-date').value;
    if (!validarFechaExpiracion(fechaExp)) {
        mensajeError.textContent = 'La tarjeta ha expirado';
        return;
    }
    
    // Si todo está bien, procesar el pedido
    alert('¡Pedido realizado con éxito!');
    localStorage.removeItem('carrito'); // Limpiar el carrito
    carrito = [];
    window.location.href = 'index.html';
}

// Modificar el evento DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', () => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
        USUARIOS_VALIDOS = JSON.parse(usuariosGuardados);
    }
    inicializarCarrito();
    
    // Cargar resumen del pedido si estamos en la página de finalizar pedido
    if (window.location.pathname.includes('finalizar-pedido.html')) {
        cargarResumenPedido();
    }
}); 