// Selecciona todas las secciones de la página
const sections = document.querySelectorAll("section");
// Selecciona todos los links del menú
const navLinks = document.querySelectorAll(".nav-link");
// Evento que detecta el scroll
window.addEventListener("scroll", () => {
  let current = "";
  // Recorre cada sección
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    // Detecta en qué sección está el usuario
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  // Activa el link correspondiente en el menú
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================= CARGA DE NOTICIAS =================
// Petición al archivo JSON
fetch("data/noticias.json")
  .then(res => res.json())  // Convierte respuesta a JSON
  .then(data => {
    // Selecciona contenedor
    const contenedor = document.getElementById("contenedor-noticias");
    // Recorre cada noticia
    data.forEach(n => {
      const div = document.createElement("div");
      div.classList.add("card");
      // Inserta contenido dinámico
      div.innerHTML = `
        <h3>${n.titulo}</h3>
        <p>${n.descripcion}</p>
        <small>${n.fecha}</small>
      `;
      contenedor.appendChild(div);
    });
  });