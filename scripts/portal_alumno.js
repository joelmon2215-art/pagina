// Simulación de base de datos
const usuarios = [
    { cuil: "12345678", email: "alumno@escuela.com", password: "123", nombre: "Juan Pérez", rol: "alumno" },
    { cuil: "87654321", email: "profe@escuela.com", password: "456", nombre: "Dr. García", rol: "docente" }
];

const notas = [
    { cuil_alumno: "12345678", materia: "Matemáticas", nota: 9, fecha: "2023-11-20" },
    { cuil_alumno: "12345678", materia: "Lengua", nota: 7, fecha: "2023-11-15" }
];

const horarios = [
    { dia: "Lunes", materia: "Informática", hora: "08:00 - 09:30" },
    { dia: "Lunes", materia: "Física", hora: "09:45 - 11:15" }
];

// script.js (Actualizado)

function cargarPortal() {
    // 1. Verificar si hay un usuario logueado en la memoria del navegador
    const nombreGuardado = localStorage.getItem('usuarioNombre');
    const cuilGuardado = localStorage.getItem('usuarioCUIL');

    // SEGURIDAD: Si no hay datos, significa que no pasó por el login
    if (!nombreGuardado || !cuilGuardado) {
        alert("Acceso denegado. Por favor, inicia sesión.");
        window.location.href = "login.html";
        return;
    }

    // 2. Mostrar el nombre del alumno en el saludo
    document.getElementById('saludo').innerText = `Bienvenido/a, ${nombreGuardado}`;

    // 3. Cargar las Notas filtrando por el CUIL que inició sesión
    const listaNotas = document.getElementById('lista-notas');
    listaNotas.innerHTML = ""; // Limpiar lista por si acaso

    const notasAlumno = notas.filter(n => n.cuil_alumno === cuilGuardado);
    
    if (notasAlumno.length === 0) {
        listaNotas.innerHTML = "<li>Aún no tienes notas cargadas.</li>";
    } else {
        notasAlumno.forEach(n => {
            let li = document.createElement('li');
            li.innerHTML = `<strong>${n.materia}:</strong> ${n.nota} <small>(${n.fecha})</small>`;
            listaNotas.appendChild(li);
        });
    }

    // 4. Cargar Horarios (Esto puede ser general o por curso)
    const tablaBody = document.querySelector('#tabla-horarios tbody');
    tablaBody.innerHTML = "";
    horarios.forEach(h => {
        let row = `<tr><td>${h.dia}</td><td>${h.hora}</td><td>${h.materia}</td></tr>`;
        tablaBody.innerHTML += row;
    });
}

function cerrarSesion() {
    localStorage.clear(); // Borra el nombre y el CUIL de la memoria
    window.location.href = "login.html";
}

// Ejecutar cuando cargue el portal
if(document.getElementById('portal-alumno')) {
    cargarPortal();
}