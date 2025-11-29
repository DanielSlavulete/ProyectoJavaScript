import { obtenerCarrito, guardarCarrito } from "./storage.js";

function lanzarEventoCambio() {
  window.dispatchEvent(new CustomEvent("carrito-cambiado"));
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-lista");
  const spanArticulos = document.getElementById("carrito-articulos");
  const spanTotal = document.getElementById("carrito-total");
  const btnVaciar = document.getElementById("carrito-vaciar");

  function pintarCarrito() {
    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
      spanArticulos.textContent = "0";
      spanTotal.textContent = "0.00 €";
      return;
    }

    let totalArticulos = 0;
    let totalPrecio = 0;

    carrito.forEach(item => {
      totalArticulos += item.cantidad;
      totalPrecio += item.precio * item.cantidad;

      const card = document.createElement("article");
      card.classList.add("producto-card", "carrito-item");
      card.innerHTML = `
        <img src="../img/${item.imagen}" alt="${item.nombre}" class="producto-img">
        <div class="carrito-info">
          <h3>${item.nombre}</h3>
          <p>${item.descripcion}</p>
          <p>Precio: ${item.precio.toFixed(2)} €</p>
          <p>Cantidad: ${item.cantidad}</p>
          <button class="btn-eliminar" data-id="${item.id}">🗑 Quitar</button>
        </div>
      `;
      contenedor.appendChild(card);
    });

    spanArticulos.textContent = totalArticulos;
    spanTotal.textContent = `${totalPrecio.toFixed(2)} €`;
  }

  // Delegación para botones "Quitar"
  contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = parseInt(e.target.dataset.id);
      let carrito = obtenerCarrito();
      carrito = carrito.filter(item => item.id !== id);
      guardarCarrito(carrito);
      lanzarEventoCambio();
      pintarCarrito();
    }
  });

  btnVaciar.addEventListener("click", () => {
    guardarCarrito([]);
    lanzarEventoCambio();
    pintarCarrito();
  });

  // Pintar al cargar
  pintarCarrito();
});