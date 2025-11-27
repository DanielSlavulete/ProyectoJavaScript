import { productos } from "./datos_iniciales.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const producto = productos.find(p => p.id === id);
  const contenedor = document.querySelector(".detalle-container");

  if (!producto) {
    contenedor.innerHTML = `<p style="text-align:center; margin-top:50px;">❌ Producto no encontrado.</p>`;
    return;
  }

  const precioFinal = producto.aplicarDescuento(producto.descuento);

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
                <span class="precio-original"><s>${producto.precio.toFixed(2)} €</s></span>
                <span class="precio-final">${precioFinal.toFixed(2)} €</span>
                <span class="descuento">(-${producto.descuento}%)</span>
              </p>`
            : `<p class="detalle-precio">${producto.precio.toFixed(2)} €</p>`
        }

        <h3>Especificaciones</h3>
        <ul class="detalle-especificaciones">
          ${Object.entries(producto.especificaciones)
            .map(([clave, valor]) => `<li><strong>${clave}:</strong> ${valor}</li>`)
            .join("")}
        </ul>

        <button class="btn-carrito">🛒 Añadir al carrito</button>
        <button class="btn-volver" onclick="window.history.back()">⬅ Volver</button>
      </div>
    </section>
  `;
});
