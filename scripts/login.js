/**
 * LISTA DE USUARIOS AUTORIZADOS
 * Solo los usuarios definidos en este array podrán acceder a los portales.
 */
const usuariosAutorizados = [
    // Usuario de Prueba (Alumno)
    { 
        nombre: "Gonzalez Juan Ignacio", 
        cuil: "1111", 
        email: "alumno@gmail.com", 
        password: "1234", 
        rol: "alumno" 
    },
    // Usuario de Prueba (Docente)
    { 
        nombre: "Alexis", 
        cuil: "1111", 
        email: "profe@gmail.com", 
        password: "1234", 
        rol: "docente" 
    },
    // Usuario de Prueba (Tutor/Padre)
    { 
        nombre: "Tutor Autorizado", 
        cuil: "1111", 
        email: "tutor@gmail.com", 
        password: "1234", 
        rol: "tutor" 
    },
    // Usuario de Prueba (Egresado)

];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const cuilIngresado = document.getElementById('cuil').value;
    const emailIngresado = document.getElementById('email').value;
    const passIngresada = document.getElementById('password').value;

    // Buscar la coincidencia SOLO dentro del array "usuariosAutorizados"
    const usuarioEncontrado = usuariosAutorizados.find(u => 
        u.cuil === cuilIngresado && 
        u.email === emailIngresado && 
        u.password === passIngresada
    );

    const msgError = document.getElementById('mensajeError');

    if (usuarioEncontrado) {
        // Guardamos los datos de la sesión (nombre y rol)
        localStorage.setItem('usuarioNombre', usuarioEncontrado.nombre);
        localStorage.setItem('usuarioRol', usuarioEncontrado.rol);
        localStorage.setItem('usuarioCUIL', usuarioEncontrado.cuil);

        // Redirección dinámica basada en el rol
        switch(usuarioEncontrado.rol) {
            case 'alumno': window.location.href = "portal_alumno.html"; break;
            case 'docente': window.location.href = "portal_docente.html"; break;
            case 'tutor': window.location.href = "portal_tutor.html"; break;
            default: alert("Error: Rol no definido.");
        }
    } else {
        msgError.style.display = "block";
        msgError.innerText = "Acceso denegado. Credenciales no autorizadas.";
    }
});