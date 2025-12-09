// ====================================================================
// 1. DATOS DE PRUEBA (SIMULACIÓN DE LA BASE DE DATOS)
// ====================================================================
// NOTA: Asegúrate de que el CUIL 20123456789 coincida con tu usuario de prueba en auth.js
const notas = [
    { cuil_alumno: "1111", materia: "Matemática", nota: 7, fecha: "15/05/2025" },
    { cuil_alumno: "1111", materia: "Informática", nota: 9, fecha: "01/06/2025" },
    { cuil_alumno: "1111", materia: "Física", nota: 6, fecha: "20/06/2025" },
    { cuil_alumno: "1111", materia: "Historia", nota: 8, fecha: "25/07/2025" },
    { cuil_alumno: "1111", materia: "Química", nota: 10, fecha: "01/10/2025" },
];

// Exámenes Asignados Manualmente (FECHAS ACTUALIZADAS a 2026)
const examenes = [
    { materia: "Matemática", fecha: "2026-01-20", descripcion: "Recuperatorio 2do Parcial" },
    { materia: "Informática", fecha: "2026-02-10", descripcion: "Examen Final Módulo JS" },
    { materia: "Inglés", fecha: "2026-03-01", descripcion: "Examen de Suficiencia" },
];

// ====================================================================
// 2. FUNCIONES PRINCIPALES
// ====================================================================

function cargarPortal() {
    // Obtener datos del usuario logueado
    const nombre = localStorage.getItem('usuarioNombre');
    const cuil = localStorage.getItem('usuarioCUIL');
    
    // Si no hay CUIL, redirigir al login (Seguridad)
    if (!cuil) {
        window.location.href = "login.html";
        return;
    }

    // 1. Asignar el nombre al saludo (Reemplazando "Cargando...")
    const saludoElement = document.getElementById('saludo');
    if (saludoElement) {
        saludoElement.innerText = `¡Bienvenido/a, ${nombre}!`;
    }

    // 2. Ejecutar funcionalidades
    calcularPromedio(cuil); 
    cargarUltimasNotas(cuil); 
    cargarExamenes();
}

/**
 * Cálculo de promedio y estado
 */
function calcularPromedio(cuil) {
    const notasAlumno = notas.filter(n => n.cuil_alumno === cuil);
    const divPromedio = document.getElementById('promedio-valor');
    
    if (notasAlumno.length > 0) {
        const suma = notasAlumno.reduce((acc, n) => acc + n.nota, 0);
        const promedio = (suma / notasAlumno.length);
        
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


/**
 * Muestra las últimas 4 notas del alumno.
 */
function cargarUltimasNotas(cuil) {
    const notasAlumno = notas.filter(n => n.cuil_alumno === cuil);
    const listaNotas = document.getElementById('lista-ultimas-notas');
    listaNotas.innerHTML = '';

    if (notasAlumno.length === 0) {
        // Usamos <li> para que el CSS de lista aplique bien
        listaNotas.innerHTML = '<li style="list-style:none; padding:10px; color:#555;">Aún no tienes notas registradas.</li>'; 
        return;
    }

    // Función auxiliar para convertir DD/MM/AAAA a formato Date para ordenar
    function parseDate(str) {
        const [day, month, year] = str.split('/');
        return new Date(year, month - 1, day);
    }

    // 1. Ordenar las notas por fecha descendente (la más nueva primero)
    notasAlumno.sort((a, b) => parseDate(b.fecha) - parseDate(a.fecha));

    // 2. Tomar solo las últimas 4 notas
    const ultimasNotas = notasAlumno.slice(0, 4);

    // 3. Renderizar en el HTML
    ultimasNotas.forEach(n => {
        let li = document.createElement('li');
        
        // Asignación de clase de color
        let claseNota = 'riesgo';
        if (n.nota >= 7.5) {
            claseNota = 'promocionado';
        } else if (n.nota >= 4) {
            claseNota = 'regular';
        }

        li.innerHTML = `
            <div>
                <strong>${n.materia}</strong> - Examen del ${n.fecha}
            </div>
            <div class="dias-restantes ${claseNota}">
                ${n.nota}
            </div>
        `;
        listaNotas.appendChild(li);
    });
}


/**
 * Calendario de Exámenes
 */
function cargarExamenes() {
    const listaExamenes = document.getElementById('lista-examenes');
    listaExamenes.innerHTML = '';
    
    // Ordenar por fecha: el más próximo aparece primero
    examenes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    examenes.forEach(e => {
        const fechaExamen = new Date(e.fecha);
        const hoy = new Date();
        const diffDias = Math.ceil((fechaExamen - hoy) / (1000 * 60 * 60 * 24));
        
        let diasRestantes = diffDias > 0 ? `${diffDias} días` : (diffDias === 0 ? '¡Hoy!' : 'Pasado');
        
        let li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${e.materia}</strong> - ${e.descripcion}
            </div>
            <div class="dias-restantes">${diasRestantes}</div>
        `;
        listaExamenes.appendChild(li);
    });
}


/**
 * Modo Oscuro y Cierre de Sesión
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}

// ====================================================================
// 3. INICIALIZACIÓN (Al cargar la página)
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Restaurar tema oscuro
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // 2. Ejecutar todas las funciones de carga
    cargarPortal();
});