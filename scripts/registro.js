document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Captura de valores de los inputs
    const nombre = document.getElementById('regNombre').value;
    const apellido = document.getElementById('regApellido').value;
    const cuil = document.getElementById('regCuil').value;
    const email = document.getElementById('regEmail').value;
    const rol = document.getElementById('regRol').value; // Captura el rol (alumno, docente, etc.)
    const pass = document.getElementById('regPass').value;
    const confirm = document.getElementById('regPassConfirm').value;
    const errorMsg = document.getElementById('errorMatch');

    // Validar que las contraseñas coincidan
    if (pass !== confirm) {
        errorMsg.style.display = "block";
        errorMsg.innerText = "Las contraseñas no coinciden.";
        return;
    }

    // Crear el objeto del nuevo usuario
    const nuevoUsuario = {
        nombre: `${nombre} ${apellido}`,
        cuil: cuil,
        email: email,
        rol: rol,
        password: pass
    };

    // Obtener la base de datos actual o crear una nueva
    let listaUsuarios = JSON.parse(localStorage.getItem('baseDeDatosEscuela')) || [];

    // Guardar el nuevo usuario en el array
    listaUsuarios.push(nuevoUsuario);

    // Actualizar localStorage
    localStorage.setItem('baseDeDatosEscuela', JSON.stringify(listaUsuarios));

    alert(`Registro exitoso como ${rol.toUpperCase()}. Ya puedes iniciar sesión.`);
    window.location.href = "login.html";
});