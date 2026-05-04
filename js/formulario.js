const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll(".extra");
const total = document.getElementById("total");

// ================= CÁLCULO =================
// Convierte a número seguro (evita NaN)
function toNumber(val) {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

// Limpia selección de extras
function resetExtras() {
  extras.forEach(e => (e.checked = false));
}
// Calcula el presupuesto
function calcularTotal() {
   let precioBase = toNumber(producto.value);

  // Si no hay producto válido, limpiar total y salir
  if (precioBase === 0) {
    total.value = "";
    return;
  }

  // 2) Suma de extras (se calcula SIEMPRE desde cero)
  let sumaExtras = 0;
  extras.forEach(extra => {
    if (extra.checked) {
      sumaExtras += toNumber(extra.value);
    }
  });

  // 3) Subtotal antes de descuento
  let subtotal = precioBase + sumaExtras;

  // 4) Descuento por plazo
  let meses = toNumber(plazo.value);
  let descuento = 0;

  if (meses > 5) {
    descuento = 0.25;
  } else if (meses > 3) {
    descuento = 0.20;
  } else if (meses > 1) {
    descuento = 0.10;
  }

  // 5) Total final
  let totalFinal = subtotal * (1 - descuento);

  // 6) Mostrar resultado formateado
  total.value = "S/ " + totalFinal.toFixed(2);
}

// Eventos automáticos (sin botón)
producto.addEventListener("change", () => {
  resetExtras();
  calcularTotal();
});

// Input + change para compatibilidad total (Edge incluido)
plazo.addEventListener("input", calcularTotal);
plazo.addEventListener("change", calcularTotal);

// Extras
extras.forEach(e => e.addEventListener("change", calcularTotal));


// ================= VALIDACIONES =================

document.getElementById("formulario").addEventListener("submit", function(e){

  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");
  const condiciones = document.getElementById("condiciones");

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{1,15}$/;
  const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{1,40}$/;
  const regexTelefono = /^[0-9]{9}$/;
  const regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  if (!regexNombre.test(nombre.value)) {
    alert("Nombre inválido. Sólo podrá contener letras y tendrá una longitud máxima de 15 caracteres.");
    nombre.focus();
    e.preventDefault();
    return;
  }

  if (!regexApellidos.test(apellidos.value)) {
    alert("Apellidos inválidos. Sólo podrá contener letras y tendrá una longitud máxima de 40 caracteres.");
    apellidos.focus();
    e.preventDefault();
    return;
  }

  if (!regexTelefono.test(telefono.value)) {
    alert("Teléfono inválido. Sólo podrá contener números y tendrá una longitud de 9 dígitos.");
    telefono.focus();
    e.preventDefault();
    return;
  }

  if (!regexEmail.test(email.value)) {
    alert("Email inválido.");
    email.focus();
    e.preventDefault();
    return;
  }

  if (producto.value==0){
    alert("Debe seleccionar un producto.")
    producto.focus();
    e.preventDefault();
    return;
  }

  if (!condiciones.checked) {
    alert("Debe aceptar condiciones");
    condiciones.focus();
    e.preventDefault();
    return;
  }

  alert("Presupuesto enviado");

});