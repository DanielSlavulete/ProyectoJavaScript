import { obtenerCarrito, guardarCarrito } from "./storage.js";

// Lanza un evento personalizado para actualizar el contador del carrito
function lanzarEventoCambio() {
  window.dispatchEvent(new CustomEvent("carrito-cambiado"));
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-lista");
  const spanArticulos = document.getElementById("carrito-articulos");
  const spanTotal = document.getElementById("carrito-total");
  const btnVaciar = document.getElementById("carrito-vaciar");

  // Muestra los productos del carrito en pantalla
  function pintarCarrito() {
    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    // Si el carrito está vacío, muestra mensaje y reinicia contadores
    if (carrito.length === 0) {
      contenedor.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
      spanArticulos.textContent = "0";
      spanTotal.textContent = "0.00 €";
      return;
    }

    let totalArticulos = 0;
    let totalPrecio = 0;

    // Recorre los productos y calcula totales
    carrito.forEach(item => {
      totalArticulos += item.cantidad;
      totalPrecio += item.precio * item.cantidad;

      // Crea el elemento visual del producto en el carrito
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
      // data-id: atributo personalizado, siempre empieza por data- y despues se puede poner id, precio, nombre...,  se accede con dataset.
      contenedor.appendChild(card);
    });

    // Actualiza los totales en la interfaz
    spanArticulos.textContent = totalArticulos;
    spanTotal.textContent = `${totalPrecio.toFixed(2)} €`;
  }

  // Escucha clics en los botones "Quitar" mediante delegación
  contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = parseInt(e.target.dataset.id); // Se usa dataset.id para acceder al atributo personalizado del boton de quitar un producto del carrito(data-id)
      let carrito = obtenerCarrito();
      carrito = carrito.filter(item => item.id !== id); // Crea un nuevo carrito excluyendo el producto que se quiere borrar
      guardarCarrito(carrito);
      lanzarEventoCambio();
      pintarCarrito();
    }
  });

  // Vacía completamente el carrito
  btnVaciar.addEventListener("click", () => {
    guardarCarrito([]);
    lanzarEventoCambio();
    pintarCarrito();
  });

  // Pintar el carrito al cargar la pagina
  pintarCarrito();
});