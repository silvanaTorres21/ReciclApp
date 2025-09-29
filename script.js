let totalPuntos = 0;

// Reglas de puntos por tipo de material (por kg)
const puntosPorKg = {
  plastico: 10,
  papel: 5,
  vidrio: 8
};

document.getElementById('recycling-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const material = document.getElementById('material').value;
  const cantidad = parseFloat(document.getElementById('cantidad').value);

  if (!material || isNaN(cantidad) || cantidad <= 0) {
    alert('Por favor, ingresa datos válidos.');
    return;
  }

  // Calculamos puntos y actualizamos total
  const puntosGanados = cantidad * (puntosPorKg[material] || 0);
  totalPuntos += puntosGanados;

  // Mostrar resultados
  document.getElementById('total-puntos').textContent = `${totalPuntos.toFixed(2)} puntos`;

  // Reset form
  document.getElementById('recycling-form').reset();
});
