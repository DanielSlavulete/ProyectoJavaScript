import { productos, clientes } from "./datos_iniciales.js";

//esto es solo una prueba
window.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("contenedor-productos");
  productos.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <img src="../img/${p.imagen}" alt="${p.nombre}" class="producto-img">
      <strong>${p.nombre}</strong><br>
      ${p.precio} €
    `;
    contenedor.appendChild(card);
  });

  const contenedor1 = document.getElementById("contenedor-clientes");
  clientes.forEach(p => {
    const card1 = document.createElement("div");
    card1.innerHTML = `<strong>${p.nombre}</strong> - ${p.email} `;
    contenedor1.appendChild(card1);
  });
  
});