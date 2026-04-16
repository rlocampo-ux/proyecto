const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

fetch("data/noticias.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("contenedor-noticias");

    data.forEach(n => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <h3>${n.titulo}</h3>
        <p>${n.descripcion}</p>
        <small>${n.fecha}</small>
      `;
      contenedor.appendChild(div);
    });
  });