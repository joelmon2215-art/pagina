// ====================================================================
// 1. DATOS DE PRUEBA (SIMULACIÓN DE LA BASE DE DATOS)
// ====================================================================

// Enunciados importantes (simulación)
let enunciados = [
    { id: 1, tipo: "nota", titulo: "Entrega TP Nº3", descripcion: "Se entrega el viernes en clase.", fecha: "2025-12-15", importante: true },
    { id: 2, tipo: "fecha", titulo: "Examen parcial", descripcion: "Matemática Aplicada I - Aula 12.", fecha: "2025-12-20", importante: false },
    { id: 3, tipo: "aviso", titulo: "Reunión de departamento", descripcion: "Electromecánica - 17:30 hs.", fecha: "", importante: false }
];

// Agenda y recursos (simulación)
const agenda = [
    { titulo: "Planificación semanal", detalle: "Unidad 2: Circuitos básicos y medición." },
    { titulo: "Corrección de TP Nº2", detalle: "Devolver con observaciones el jueves." }
];

const recursos = [
    { titulo: "Reglamento de evaluación", detalle: "Criterios de promoción y recuperación." },
    { titulo: "Formato de planilla de asistencia", detalle: "Versión 2025 actualizada." }
];

// ====================================================================
// 2. FUNCIONES PRINCIPALES
// ====================================================================

function cargarPortalProfesor() {
    const nombre = localStorage.getItem('usuarioNombre') || "Profesor/a";

    const saludoElement = document.getElementById('saludo');
    if (saludoElement) {
        saludoElement.innerText = ¡Bienvenido/a, ${nombre}!;
    }

    cargarEnunciados();
    cargarAgenda();
    cargarRecursos();
}

/**
 * Mostrar enunciados importantes
 */
function cargarEnunciados() {
    const lista = document.getElementById('lista-enunciados');
    lista.innerHTML = '';

    if (enunciados.length === 0) {
        lista.innerHTML = '<li class="enunciado-item"><em>No hay enunciados registrados aún.</em></li>';
        return;
    }

    enunciados.forEach(e => {
        const li = document.createElement('li');
        li.className = enunciado-item ${e.importante ? 'importante' : ''};
        li.dataset.tipo = e.tipo;

        li.innerHTML = `
            <div>
                <div class="enunciado-meta">
                    <span class="enunciado-tipo ${e.tipo}">${e.tipo}</span>
                    ${e.fecha ? <span><i class="fas fa-calendar-day"></i> ${e.fecha}</span> : ''}
                    ${e.importante ? <span class="badge-important"><i class="fas fa-star"></i> Importante</span> : ''}
                </div>
                <div class="enunciado-title">${e.titulo}</div>
                <div class="enunciado-desc">${e.descripcion}</div>
            </div>
            <div class="enunciado-actions">
                <button class="btn-icon" onclick="toggleImportante(${e.id})"><i class="fas fa-star"></i></button>
                <button class="btn-icon" onclick="eliminarEnunciado(${e.id})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        lista.appendChild(li);
    });
}

/**
 * Agregar nuevo enunciado desde formulario
 */
function agregarEnunciado(event) {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const fecha = document.getElementById('fecha').value;

    if (!titulo || !descripcion) return;

    const nuevo = {
        id: Date.now(),
        tipo,
        titulo,
        descripcion,
        fecha,
        importante: false
    };

    enunciados.unshift(nuevo);
    document.getElementById('form-enunciado').reset();
    cargarEnunciados();
}

/**
 * Marcar/desmarcar como importante
 */
function toggleImportante(id) {
    const e = enunciados.find(x => x.id === id);
    if (e) {
        e.importante = !e.importante;
        cargarEnunciados();
    }
}

/**
 * Eliminar enunciado
 */
function eliminarEnunciado(id) {
    enunciados = enunciados.filter(x => x.id !== id);
    cargarEnunciados();
}

/**
 * Mostrar agenda
 */
function cargarAgenda() {
    const listaAgenda = document.getElementById('lista-agenda');
    listaAgenda.innerHTML = '';
    agenda.forEach(a => {
        const li = document.createElement('li');
        li.innerHTML = <strong>${a.titulo}:</strong> ${a.detalle};
        listaAgenda.appendChild(li);
    });
}

/**
 * Mostrar recursos
 */
function cargarRecursos() {
    const listaRecursos = document.getElementById('lista-recursos');
    listaRecursos.innerHTML = '';
    recursos.forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = <strong>${r.titulo}:</strong> ${r.detalle};
        listaRecursos.appendChild(li);
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


// 3. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    cargarPortalProfesor();
    // Conectar formulario
    const form = document.getElementById('form-enunciado');
    if (form) {
        form.addEventListener('submit', agregarEnunciado);
    }
    // Conectar botón de modo oscuro
    const btnMode = document.getElementById('btn-mode');
    if (btnMode) {
        btnMode.addEventListener('click', toggleDarkMode);
    }
    // Conectar botón de cerrar sesión
    const btnSalir = document.getElementById('btn-salir');
    if (btnSalir) {
        btnSalir.addEventListener('click', cerrarSesion);
    }
});
let filtroActual = 'todos';

const filterButtons = document.querySelectorAll('.filter-btn');
const buscador = document.getElementById('buscador');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtroActual = btn.dataset.filter;
    aplicarFiltros();
  });
});

buscador.addEventListener('input', aplicarFiltros);

function aplicarFiltros() {
  let items = [...enunciados];

  // Filtrar por tipo
  if (filtroActual !== 'todos') {
    if (filtroActual === 'importante') {
      items = items.filter(i => i.importante);
    } else {
      items = items.filter(i => i.tipo === filtroActual);
    }
  }

  // Filtrar por búsqueda
  const q = buscador.value.trim().toLowerCase();
  if (q) {
    items = items.filter(i =>
      i.titulo.toLowerCase().includes(q) ||
      i.descripcion.toLowerCase().includes(q)
    );
  }

  // Mostrar resultado
  const lista = document.getElementById('lista-enunciados');
  lista.innerHTML = '';

  if (items.length === 0) {
    lista.innerHTML = '<li class="enunciado-item"><em>No hay enunciados para mostrar.</em></li>';
    return;
  }

  items.forEach(e => {
    const li = document.createElement('li');
    li.className = enunciado-item ${e.importante ? 'importante' : ''};
    li.dataset.tipo = e.tipo;

    li.innerHTML = `
      <div>
        <div class="enunciado-meta">
          <span class="enunciado-tipo ${e.tipo}">${e.tipo}</span>
          ${e.fecha ? <span><i class="fas fa-calendar-day"></i> ${e.fecha}</span> : ''}
          ${e.importante ? <span class="badge-important"><i class="fas fa-star"></i> Importante</span> : ''}
        </div>
        <div class="enunciado-title">${e.titulo}</div>
        <div class="enunciado-desc">${e.descripcion}</div>
      </div>
      <div class="enunciado-actions">
        <button class="btn-icon" onclick="toggleImportante(${e.id})"><i class="fas fa-star"></i></button>
        <button class="btn-icon" onclick="eliminarEnunciado(${e.id})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    lista.appendChild(li);
  });
}