import { productos, clientes } from "./datos_iniciales.js";
import { getCookie } from "./cookies.js";


//esto es solo una prueba
window.addEventListener("DOMContentLoaded", () => {

  const ultimo = getCookie("ultimoUsuario");
  if (ultimo) {
    const mensajeBienvenida = document.createElement("p");
    mensajeBienvenida.textContent = `👋 Bienvenido de nuevo, ${ultimo}!`;
    mensajeBienvenida.classList.add("mensaje-bienvenida");

    // 🔹 Insertar justo después del header
    const header = document.querySelector("header");
    header.insertAdjacentElement("afterend", mensajeBienvenida);

    // 🔹 Mostrar con transición suave y desaparecer después de 4s
    setTimeout(() => {
      mensajeBienvenida.classList.add("ocultar");
      setTimeout(() => mensajeBienvenida.remove(), 1000); // se elimina del DOM
    }, 4000);
  }

  const contenedor = document.getElementById("contenedor-productos");
  
  productos.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <a href="./producto-detalle.html?id=${p.id}" class="enlace-producto">
        <img src="../img/${p.imagen}" alt="${p.nombre}" class="producto-img">
        ${p.mostrarResumen()}
      </a>
    `;
    contenedor.appendChild(card);
  });

  const contenedor1 = document.getElementById("contenedor-clientes");
  clientes.forEach(p => {
    const card1 = document.createElement("div");
    card1.innerHTML = `<strong>${p.nombre}</strong> - ${p.email} `;
    contenedor1.appendChild(card1);
  });

  //CARRUSEL
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let index = 0;

  function actualizarCarrusel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length; 
    actualizarCarrusel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    actualizarCarrusel();
  });

  // Opcional: auto-play cada 4 segundos
  setInterval(() => {
    index = (index + 1) % slides.length;
    actualizarCarrusel();
  }, 4000);
  
});