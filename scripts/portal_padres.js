// ====================================================================
// 1. DATOS DE PRUEBA
// ====================================================================
const notas = [
    { cuil_tutor: "27112233445", materia: "Matemática", nota: 7, fecha: "15/05/2025" },
    { cuil_tutor: "27112233445", materia: "Informática", nota: 9, fecha: "01/06/2025" },
    { cuil_tutor: "27112233445", materia: "Física", nota: 6, fecha: "20/06/2025" },
    { cuil_tutor: "27112233445", materia: "Historia", nota: 8, fecha: "25/07/2025" },
    { cuil_tutor: "27112233445", materia: "Química", nota: 10, fecha: "01/10/2025" },
];

const examenes = [
    { materia: "Matemática", fecha: "2026-01-20", descripcion: "Recuperatorio 2do Parcial" },
    { materia: "Informática", fecha: "2026-02-10", descripcion: "Examen Final Módulo JS" },
    { materia: "Inglés", fecha: "2026-03-01", descripcion: "Examen de Suficiencia" },
];

// ====================================================================
// 2. FUNCIONES PRINCIPALES
// ====================================================================
function cargarPortal() {
    const nombre = localStorage.getItem('usuarioNombre') || "Padre/Madre";
    const cuil = localStorage.getItem('usuarioCUIL') || "27112233445";

    if (!cuil) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById('saludo').innerText = `¡Bienvenido/a, ${nombre}!`;

    calcularPromedio(cuil);
    cargarUltimasNotas(cuil);
    cargarExamenes();
}

function calcularPromedio(cuil) {
    const notasAlumno = notas.filter(n => n.cuil_tutor === cuil);
    const divPromedio = document.getElementById('promedio-valor');

    if (notasAlumno.length > 0) {
        const suma = notasAlumno.reduce((acc, n) => acc + n.nota, 0);
        const promedio = suma / notasAlumno.length;

        let estado = "Regular";
        let clase = "regular";

        if (promedio >= 7.5) {
            estado = "¡Promocionado!";
            clase = "promocionado";
        } else if (promedio < 4) {
            estado = "Riesgo de recursar";
            clase = "riesgo";
        }

        divPromedio.innerHTML = `
            Promedio General: <span class="nota ${clase}">${promedio.toFixed(2)}</span>
            <br>Estado Global: <strong>${estado}</strong>
        `;
    } else {
        divPromedio.innerText = "Aún no hay notas para calcular el promedio.";
    }
}

function cargarUltimasNotas(cuil) {
    const notasAlumno = notas.filter(n => n.cuil_tutor === cuil);
    const listaNotas = document.getElementById('lista-ultimas-notas');
    listaNotas.innerHTML = '';

    if (notasAlumno.length === 0) {
        listaNotas.innerHTML = '<li>Aún no tienes notas registradas.</li>';
        return;
    }

    function parseDate(str) {
        const [day, month, year] = str.split('/');
        return new Date(year, month - 1, day);
    }

    notasAlumno.sort((a, b) => parseDate(b.fecha) - parseDate(a.fecha));
    const ultimasNotas = notasAlumno.slice(0, 4);

    ultimasNotas.forEach(n => {
        let claseNota = 'riesgo';
        if (n.nota >= 7.5) claseNota = 'promocionado';
        else if (n.nota >= 4) claseNota = 'regular';

        let li = document.createElement('li');
        li.innerHTML = `
            <div><strong>${n.materia}</strong> - Examen del ${n.fecha}</div>
            <div class="dias-restantes ${claseNota}">${n.nota}</div>
        `;
        listaNotas.appendChild(li);
    });
}

function cargarExamenes() {
    const listaExamenes = document.getElementById('lista-examenes');
    listaExamenes.innerHTML = '';

    examenes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    examenes.forEach(e => {
        const fechaExamen = new Date(e.fecha);
        const hoy = new Date();
        const diffDias = Math.ceil((fechaExamen - hoy) / (1000 * 60 * 60 * 24));

        let diasRestantes = diffDias > 0 ? `${diffDias} días` : (diffDias === 0 ? '¡Hoy!' : 'Pasado');

        let li = document.createElement('li');
        li.innerHTML = `
            <div><strong>${e.materia}</strong> - ${e.descripcion}</div>
            <div class="dias-restantes">${diasRestantes}</div>
        `;
        listaExamenes.appendChild(li);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    cargarPortal();
});
