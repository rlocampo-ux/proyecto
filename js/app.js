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
