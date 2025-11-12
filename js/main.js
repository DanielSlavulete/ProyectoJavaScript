import { productos, clientes } from "./datos_iniciales.js";
import { Producto } from "./producto.js";
import { Cliente } from "./cliente.js";


//esto es solo una prueba
window.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("contenedor-productos");
  productos.forEach(p => {
    const card = document.createElement("div");
    card.innerHTML = `<strong>${p.nombre}</strong> - ${p.precio} €`;
    contenedor.appendChild(card);
  });

  const contenedor1 = document.getElementById("contenedor-clientes");
  clientes.forEach(p => {
    const card1 = document.createElement("div");
    card1.innerHTML = `<strong>${p.nombre}</strong> - ${p.email} `;
    contenedor1.appendChild(card1);
  });
  
});