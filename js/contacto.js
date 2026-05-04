// ================= CONFIG =================
const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjM0YzVhM2RkYmQxMjRhMmI4NGIxYjMxYWRmZWQ0ZmZhIiwiaCI6Im11cm11cjY0In0="; // 

// Coordenadas del negocio (Araia, España)
const negocio = [42.88722, -2.31493];

// ================= MAPA =================
const map = L.map('map').setView(negocio, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marcador negocio
L.marker(negocio).addTo(map)
  .bindPopup("Mi negocio")
  .openPopup();

// ================= BOTÓN =================
document.getElementById("btnRuta").addEventListener("click", () => {

  if (!navigator.geolocation) {
    alert("Geolocalización no soportada");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {

    const cliente = [
      pos.coords.latitude,
      pos.coords.longitude
    ];

    // Marcador cliente
    L.marker(cliente).addTo(map)
      .bindPopup("Tu ubicación")
      .openPopup();

    // ================= PETICIÓN A ORS =================
    const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates: [
          [cliente[1], cliente[0]], // ORS usa [lng, lat]
          [negocio[1], negocio[0]]
        ]
      })
    });

    const data = await response.json();

    // ================= DIBUJAR RUTA =================
    const ruta = L.geoJSON(data, {
      style: {
        color: "blue",
        weight: 5
      }
    }).addTo(map);

    // Ajustar mapa a la ruta
    map.fitBounds(ruta.getBounds());

  }, () => {
    alert("No se pudo obtener tu ubicación");
  });

});