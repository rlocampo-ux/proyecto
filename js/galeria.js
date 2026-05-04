// Array de imágenes (puedes agregar más fácilmente)
// Contiene las rutas de las imágenes que se mostrarán
const imagenes = [
  "../img/dev1.jpg",
  "../img/dev2.jpg",
  "../img/dev3.jpg",
  "../img/dev1.jpg",
  "../img/dev2.jpg",
  "../img/dev3.jpg",
  "../img/dev1.jpg",
  "../img/dev2.jpg",
  "../img/dev3.jpg"
];

// Contenedor donde se insertarán las imágenes
const galeria = document.getElementById("galeria");

// Elementos del modal
const modal = document.getElementById("modal");
const imgModal = document.getElementById("img-modal");
const cerrar = document.getElementById("cerrar");

// Generar galería dinámicamente
// Recorre el array de imágenes
imagenes.forEach(src => {
  const img = document.createElement("img"); // Crea un elemento <img> por cada imagen
  img.src = src;  // Asigna la ruta de la imagen
  img.classList.add("img");  // Aplica clase CSS para estilos de la imagen

  // Evento click
  // Cuando el usuario hace click en la imagen
  img.addEventListener("click", () => {
    modal.style.display = "flex";   // Muestra el modal
    imgModal.src = src;   // Cambia la imagen del modal por la seleccionada
  });

  galeria.appendChild(img);  // Inserta la imagen en el contenedor
});

// Cerrar el modal con la "X"
cerrar.onclick = () => {
  modal.style.display = "none";
};

// Cerrar haciendo click fuera de la imagen
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};