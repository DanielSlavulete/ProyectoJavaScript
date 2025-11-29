import { productos } from "./datos_iniciales.js";
import { agregarAlCarrito } from "./storage.js";

// URLSerachParams lee los parametros de la URL
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

   // Busca el producto con ese id dentro del array de productos
  const producto = productos.find(p => p.id === id);
  const contenedor = document.querySelector(".detalle-container");

    // Si no existe el producto, se muestra un mensaje de error
  if (!producto) {
    contenedor.innerHTML = `<p style="text-align:center; margin-top:50px;">❌ Producto no encontrado.</p>`;
    return;
  }

    // Calcula el precio final aplicando el descuento (si lo tiene)
  const precioFinal = producto.aplicarDescuento(producto.descuento);

    // Muestra la información del producto seleccionado
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
          ${Object.entries(producto.especificaciones) // Transforma el objeto producto.especificaciones en un array de arrys
            .map(([clave, valor]) => `<li><strong>${clave}:</strong> ${valor}</li>`)
            .join("")}
        </ul>
            
        <button class="btn-carrito">🛒 Añadir al carrito</button>
        <button class="btn-volver">⬅ Volver</button>
      </div>
    </section>
  `;
  // .map recorre el array y separa los datos en clave valor

  // Botón "Volver"
  const btnVolver = contenedor.querySelector(".btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => window.history.back());
  }
  // window.history.back() lleva al usuario a la pagina que visito justo antes 

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
      alert("Producto añadido al carrito ✅");
    });
  }
});
