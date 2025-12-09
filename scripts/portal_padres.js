// ====================================================================
// 1. DATOS DE PRUEBA (SIMULACIÓN DE LA BASE DE DATOS)
// ====================================================================

// Notas de los hijos (simulación)
const notasHijos = [
    { cuil_tutor: "27112233445", hijo: "Juan Pérez", materia: "Matemática", nota: 8, fecha: "10/05/2025" },
    { cuil_tutor: "27112233445", hijo: "Juan Pérez", materia: "Lengua", nota: 7, fecha: "20/06/2025" },
    { cuil_tutor: "27112233445", hijo: "María Pérez", materia: "Historia", nota: 9, fecha: "15/07/2025" },
    { cuil_tutor: "27112233445", hijo: "María Pérez", materia: "Inglés", nota: 10, fecha: "01/09/2025" },
];

// Fechas y requisitos de inscripción
const inscripciones = [
    { nivel: "Fechas y Requisitos", fecha_inicio: "2026-02-01", fecha_fin: "2026-02-15", requisitos: ["DNI del alumno", "Partida de nacimiento", "Constancia de domicilio", "Foto carnet"] },
    
];

// ====================================================================
// 2. FUNCIONES PRINCIPALES
// ====================================================================

function cargarPortalInscripciones() {
    const nombre = localStorage.getItem('usuarioNombre') || "Padre/Madre";
    const cuil = localStorage.getItem('usuarioCUIL') || "27112233445";

    if (!cuil) {
        window.location.href = "login.html";
        return;
    }

    const saludoElement = document.getElementById('saludo');
    if (saludoElement) {
        saludoElement.innerText = `¡Bienvenido/a, ${nombre}!`;
    }

    cargarNotasHijos(cuil);
    cargarInscripciones();
}

/**
 * Mostrar notas de los hijos
 */
function cargarNotasHijos(cuil) {
    const notasAlumno = notasHijos.filter(n => n.cuil_tutor === cuil);
    const listaNotas = document.getElementById('lista-notas-hijos');
    listaNotas.innerHTML = '';

    if (notasAlumno.length === 0) {
        listaNotas.innerHTML = '<li>No hay notas registradas aún.</li>';
        return;
    }

    notasAlumno.forEach(n => {
        let claseNota = 'riesgo';
        if (n.nota >= 7.5) claseNota = 'promocionado';
        else if (n.nota >= 4) claseNota = 'regular';

        let li = document.createElement('li');
        li.innerHTML = `
            <div><strong>${n.hijo}</strong> - ${n.materia} (${n.fecha})</div>
            <div class="nota ${claseNota}">${n.nota}</div>
        `;
        listaNotas.appendChild(li);
    });
}

/**
 * Mostrar inscripciones disponibles
 */
function cargarInscripciones() {
    const listaInscripciones = document.getElementById('lista-inscripciones');
    listaInscripciones.innerHTML = '';

    inscripciones.forEach(i => {
        const hoy = new Date();
        const inicio = new Date(i.fecha_inicio);
        const fin = new Date(i.fecha_fin);

        let estado = "Fuera de fecha";
        if (hoy >= inicio && hoy <= fin) {
            estado = "Inscripción abierta";
        } else if (hoy < inicio) {
            estado = "Próximamente";
        }

        let li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${i.nivel}</strong> - del ${i.fecha_inicio} al ${i.fecha_fin}
                <br>Estado: <span class="estado">${estado}</span>
            </div>
            <div>
                Requisitos:
                <ul>
                    ${i.requisitos.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        `;
        listaInscripciones.appendChild(li);
    });
}

/**
 * Modo Oscuro y Cierre de Sesión
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}

// ====================================================================
// 3. INICIALIZACIÓN
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    cargarPortalInscripciones();
});
