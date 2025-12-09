/**
 * INICIALIZACIÓN: Inyecta un usuario de prueba si la lista está vacía.
 */
(function inicializarAdmin() {
    let listaUsuarios = JSON.parse(localStorage.getItem('baseDeDatosEscuela')) || [];

    // Definimos el usuario de prueba
    const usuarioPrueba = {
        nombre: "Nacho",
        cuil: "20480863098",
        email: "nacho@gmail.com",
        password: "1234",
        rol: "alumno" // Puedes cambiarlo a 'docente' para probar otras páginas
    };

    const existe = listaUsuarios.find(u => u.cuil === usuarioPrueba.cuil);

    if (!existe) {
        listaUsuarios.push(usuarioPrueba);
        localStorage.setItem('baseDeDatosEscuela', JSON.stringify(listaUsuarios));
        console.log("Usuario de prueba inyectado correctamente.");
    }
})();

/**
 * LOGIN: Valida y redirige según el rol.
 */
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const cuilIngresado = document.getElementById('cuil').value;
    const emailIngresado = document.getElementById('email').value;
    const passIngresada = document.getElementById('password').value;

    const listaUsuarios = JSON.parse(localStorage.getItem('baseDeDatosEscuela')) || [];

    const usuario = listaUsuarios.find(u => 
        u.cuil === cuilIngresado && 
        u.email === emailIngresado && 
        u.password === passIngresada
    );

    const msgError = document.getElementById('mensajeError');

    if (usuario) {
        localStorage.setItem('usuarioNombre', usuario.nombre);
        localStorage.setItem('usuarioRol', usuario.rol);
        localStorage.setItem('usuarioCUIL', usuario.cuil);

        // Redirección dinámica basada en el mapa de sitio
        switch(usuario.rol) {
            case 'alumno': window.location.href = "portal_alumno.html"; break;
            case 'docente': window.location.href = "portal_docente.html"; break;
            case 'egresado': window.location.href = "portal_egresado.html"; break;
            case 'tutor': window.location.href = "portal_tutor.html"; break;
            default: alert("Rol no definido");
        }
    } else {
        msgError.style.display = "block";
        msgError.innerText = "Datos incorrectos o usuario no registrado.";
    }
});