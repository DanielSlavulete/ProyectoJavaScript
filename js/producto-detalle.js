// js/producto-detalle.js
import { productos } from "./datos_iniciales.js";
import { agregarAlCarrito } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  // Busca el producto por id
  const producto = productos.find((p) => p.id === id);

  // Contenedor donde se pinta la ficha
  const contenedor = document.querySelector(".detalle-container");

  if (!contenedor) {
    console.error("No se ha encontrado el contenedor .detalle-container");
    return;
  }

  if (!producto) {
    contenedor.innerHTML = `
      <p style="text-align:center; margin-top:50px;">
        ❌ Producto no encontrado.
      </p>`;
    return;
  }

  // Calculamos el precio final (con descuento si lo hay)
  const precioFinal =
    typeof producto.aplicarDescuento === "function"
      ? producto.aplicarDescuento(producto.descuento)
      : producto.precio * (1 - (producto.descuento || 0) / 100);

  // Pintar ficha de producto
  contenedor.innerHTML = `
    <section class="detalle-producto">
      <div class="detalle-imagen">
        <img src="../img/${producto.imagen}" alt="${producto.nombre}">
      </div>

      <div class="detalle-info">
        <h2>${producto.nombre}</h2>
        <p class="detalle-descripcion">${producto.descripcion}</p>

        ${
          producto.descuento > 0
            ? `<p class="detalle-precio">
                <span class="precio-original">
                  <s>${producto.precio.toFixed(2)} €</s>
                </span>
                <span class="precio-final">
                  ${precioFinal.toFixed(2)} €
                </span>
                <span class="descuento">(-${producto.descuento}%)</span>
              </p>`
            : `<p class="detalle-precio">
                ${producto.precio.toFixed(2)} €
              </p>`
        }

        <h3>Especificaciones</h3>
        <ul class="detalle-especificaciones">
          ${Object.entries(producto.especificaciones)
            .map(
              ([clave, valor]) =>
                `<li><strong>${clave}:</strong> ${valor}</li>`
            )
            .join("")}
        </ul>

        <div class="detalle-botones">
          <button class="btn-carrito">🛒 Añadir al carrito</button>
          <button class="btn-volver">⬅ Volver</button>
        </div>
      </div>
    </section>
  `;

  // Botón "Volver"
  const btnVolver = contenedor.querySelector(".btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => window.history.back());
  }

  // Botón "Añadir al carrito"
  const btnCarrito = contenedor.querySelector(".btn-carrito");
  if (btnCarrito) {
    btnCarrito.addEventListener("click", () => {
      // Guardar el producto en el carrito
      agregarAlCarrito({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        precio: precioFinal,
        cantidad: 1,
      });

      // Mensaje sencillo
      alert("Producto añadido al carrito ✅");

    });
  }
});
