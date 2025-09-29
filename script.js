// Variables y constantes iniciales
let totalPuntos = 0;
let nivel = 1;
const puntosParaNivel = 100;

const puntosPorKg = {
  plastico: 10,
  papel: 5,
  vidrio: 8
};

const opciones = document.querySelectorAll('.material-option');
const barraProgreso = document.getElementById('progreso-nivel');
const textoNivel = document.getElementById('texto-nivel');
const contenedorLogros = document.getElementById('logros-list');

let materialSeleccionado = null;

const logros = [
  { id: 1, nombre: 'Novato del Reciclaje', nivelRequerido: 1 },
  { id: 2, nombre: 'Eco Guerrero', nivelRequerido: 3 },
  { id: 3, nombre: 'Salvador del Planeta', nivelRequerido: 5 },
];

// Elementos para toggle perfil
const btnToggle = document.getElementById('btn-toggle-perfil');
const perfilSection = document.getElementById('perfil-configuracion');

// Manejo de selección de material reciclable
opciones.forEach(opcion => {
  opcion.addEventListener('click', () => {
    // Quitar clase seleccionada de todas
    opciones.forEach(opt => opt.classList.remove('selected'));
    // Añadir clase a la seleccionada
    opcion.classList.add('selected');
    // Guardar material seleccionado (atributo data-material)
    materialSeleccionado = opcion.getAttribute('data-material');
  });
});

// Función para actualizar el nivel y barra de progreso
function actualizarNivel() {
  // Incrementar nivel si se cumple condición
  while (totalPuntos >= nivel * puntosParaNivel) {
    nivel++;
  }

  const puntosEnNivel = totalPuntos - (nivel - 1) * puntosParaNivel;
  const progresoPorcentaje = Math.min((puntosEnNivel / puntosParaNivel) * 100, 100);

  // Actualizar barra y texto de nivel
  barraProgreso.style.width = progresoPorcentaje + '%';
  textoNivel.textContent = `Nivel ${nivel} - ${puntosEnNivel.toFixed(0)} / ${puntosParaNivel} puntos`;

  actualizarLogros();
  actualizarPerfilInfo();
}

// Función para mostrar logros y medallas según nivel
function actualizarLogros() {
  contenedorLogros.innerHTML = ''; // Limpiar logros previos

  logros.forEach(logro => {
    const medalla = document.createElement('div');
    medalla.classList.add('medalla');

    if (nivel >= logro.nivelRequerido) {
      medalla.textContent = '🏅'; // Medalla desbloqueada
      medalla.title = `${logro.nombre} (Nivel ${logro.nivelRequerido} desbloqueado)`;
      medalla.classList.remove('locked');
    } else {
      medalla.textContent = '🔒'; // Medalla bloqueada
      medalla.title = `${logro.nombre} (Nivel ${logro.nivelRequerido} bloqueado)`;
      medalla.classList.add('locked');
    }

    contenedorLogros.appendChild(medalla);
  });
}

// Actualiza info visible en perfil (nombre, nivel, puntos)
function actualizarPerfilInfo() {
  // Cambiar por datos reales si tienes backend o localStorage
  const nombreUsuario = document.getElementById('nombre-usuario');
  const usuarioNivel = document.getElementById('usuario-nivel');

  nombreUsuario.textContent = 'Usuario Prueba'; // Ejemplo estático
  usuarioNivel.textContent = `Nivel ${nivel} • ${totalPuntos.toFixed(0)} puntos`;
}

// Evento submit para formulario de reciclaje
document.getElementById('recycling-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const cantidad = parseFloat(document.getElementById('cantidad').value);

  if (!materialSeleccionado || isNaN(cantidad) || cantidad <= 0) {
    alert('Por favor, selecciona un material y una cantidad válida.');
    return;
  }

  // Calcular puntos y actualizar total
  const puntosGanados = cantidad * (puntosPorKg[materialSeleccionado] || 0);
  totalPuntos += puntosGanados;

  actualizarNivel();

  // Mostrar resultado con animación
  const resultado = document.getElementById('total-puntos');
  resultado.textContent = `${totalPuntos.toFixed(2)} puntos`;
  resultado.style.animation = 'fadeIn 0.6s ease-in-out';

  setTimeout(() => {
    resultado.style.animation = 'none';
  }, 700);

  // Reset formulario y selección
  document.getElementById('cantidad').value = '';
  opciones.forEach(opt => opt.classList.remove('selected'));
  materialSeleccionado = null;
});

// Toggle para mostrar u ocultar la sección de perfil
btnToggle.addEventListener('click', () => {
  const estaOculto = perfilSection.classList.contains('oculto');

  if (estaOculto) {
    perfilSection.classList.remove('oculto');
    btnToggle.textContent = 'Perfil ▲';
  } else {
    perfilSection.classList.add('oculto');
    btnToggle.textContent = 'Perfil ▼';
  }
});

// Inicialización al cargar la página
actualizarNivel();
