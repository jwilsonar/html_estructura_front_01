// Credenciales de ejemplo (en un caso real, esto se validaría contra una base de datos)
let USUARIOS_VALIDOS = [
    { email: 'usuario@ejemplo.com', password: '123456', username: 'usuario' },
    { email: 'admin@ejemplo.com', password: 'admin123', username: 'admin' }
];

// Función para validar el inicio de sesión
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

// Cargar usuarios guardados al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
        USUARIOS_VALIDOS = JSON.parse(usuariosGuardados);
    }
}); 