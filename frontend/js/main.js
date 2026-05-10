import { getCookie } from "./cookies.js";
import { Producto } from "./producto.js";

const API_URL = "http://localhost:3000/api";

window.addEventListener("DOMContentLoaded", async () => {


  //MENSAJE BIENVENIDA 

  const ultimo = getCookie("ultimoUsuario");

  if (ultimo) {
    const mensajeBienvenida = document.createElement("p");
    mensajeBienvenida.textContent = `👋 Bienvenido de nuevo, ${ultimo}!`;
    mensajeBienvenida.classList.add("mensaje-bienvenida");

    // Buscar <main-header> (nuevo componente) o <header>
    const header = document.querySelector("main-header") || document.querySelector("header");

    if (header) {
      header.insertAdjacentElement("afterend", mensajeBienvenida);

      setTimeout(() => {
        mensajeBienvenida.classList.add("ocultar");
        setTimeout(() => mensajeBienvenida.remove(), 1000);
      }, 4000);
    }
  }

//PINTAR PRODUCTOS DESTACADOS

  const contenedor = document.getElementById("contenedor-productos");

  if (contenedor) {
    try {
      const res = await fetch(`${API_URL}/productos`);
      const datos = await res.json();
      const productos = datos.map(p => new Producto(
        p._id, p.nombre, p.descripcion, p.imagen, p.precio,
        p.tipo, p.especificaciones, p.descuento, p.urlVideo
      ));

      productos.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("producto-card");
      card.innerHTML = `
        <a href="./producto-detalle.html?id=${p._id}" class="enlace-producto">
          <img src="../img/${p.imagen}" alt="${p.nombre}" class="producto-img">
          ${p.mostrarResumen()}
        </a>
      `;
      contenedor.appendChild(card);
    });      
    } catch (err) {
      console.error('Error cargando productos:', err);
      contenedor.innerHTML = '<p>Error al cargar los productos. Inténtalo más tarde.</p>';
    }
    
  }
  
  // ============================================================
  // CARRUSEL (solo si existe) – imágenes desde array
  // ============================================================
  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (track && nextBtn && prevBtn) {

    // Nombres de archivos dentro de /img
    const imagenesCarrusel = [
      "../img/ryzen7800x3d.jpg",
      "../img/rtx4070ti.jpg",
      "../img/samsung_990pro.jpg",
      "../img/crucial_mx500.jpg",
      "../img/asus_b650e_f.jpg",
      "../img/b550_aorus_elite.jpg"
    ];

    // 1. Crear las <img> dentro del .carousel-track
    imagenesCarrusel.forEach((nombre, index) => {
      const img = document.createElement("img");
      img.src = `../img/${nombre}`;   // carpeta /img
      img.alt = nombre;
      img.classList.add("slide");
      if (index === 0) img.classList.add("active");
      track.appendChild(img);
    });

    // 2. Ahora que ya existen las imágenes, las recogemos
    const slides = Array.from(track.querySelectorAll(".slide"));

    if (slides.length > 0) {
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

      // autoplay cada 4s
      setInterval(() => {
        index = (index + 1) % slides.length;
        actualizarCarrusel();
      }, 4000);
    }
  }
});
