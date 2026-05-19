import { agregarAlCarrito } from "./storage.js";
import { Producto } from "./producto.js";
import { traducir } from "./idioma.js";

const API_URL = "http://localhost:3000/api";

onload = async () => {
    const contenedor = document.querySelector(".detalle-container");
    const producto = await cargarProducto(contenedor);
    const precioFinal = producto.aplicarDescuento(producto.descuento);
    pintarProducto(producto, contenedor, precioFinal);
    pintarBotones(producto, contenedor, precioFinal);
}

async function cargarProducto(contenedor) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    try {
        const res = await fetch(`${API_URL}/productos/${id}`);
        const datos = await res.json();
        const producto = new Producto(
            datos._id, datos.nombre, datos.descripcion, datos.imagen, datos.precio,
            datos.tipo, datos.especificaciones, datos.descuento, datos.urlVideo
        );
        return producto;
    } catch (err) {
        console.error('Error cargando producto:', err)
        contenedor.innerHTML = `<p style="text-align:center; margin-top:50px;">❌ Producto no encontrado.</p>`;
    }

}

function pintarProducto(producto, contenedor, precioFinal) {
    contenedor.innerHTML = `
        <section class="detalle-producto">
            <div class="detalle-imagen">
                <img src="../img/${producto.imagen}" alt="${producto.nombre}">

                ${
                    producto.urlVideo
                    ? `
                    
                    <section class="detalle-video" aria-labelledby="titulo-video-producto">
                        <h3 id="titulo-video-producto" data-i18n="product.video">${traducir('product.video')}</h3>

                        <div class="video-wrapper">
                            <iframe
                                src="${producto.urlVideo}"
                                title="Vídeo sobre ${producto.nombre}"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </section>
                    
                    `
                    : ""

                }

            </div>

        <div class="detalle-info">
            <h2>
                <span data-i18n="product.name-${producto.tipo}">${traducir('product.name-' + producto.tipo)}</span>
                ${producto.nombre}
            </h2>
            <p class="detalle-descripcion" data-i18n="desc.${producto.imagen.replace('.jpg', '')}">${traducir('desc.' + producto.imagen.replace('.jpg', ''))}</p>

            ${
            producto.descuento > 0
                ? `<p class="detalle-precio">
                    <span class="precio-original"><s>${producto.precio.toFixed(2)} €</s></span>
                    <span class="precio-final">${precioFinal.toFixed(2)} €</span>
                    <span class="descuento">(-${producto.descuento}%)</span>
                </p>`
                : `<p class="detalle-precio">${producto.precio.toFixed(2)} €</p>`
            }

            <h3 data-i18n="product.specs">${traducir('product.specs')}</h3>
            <ul class="detalle-especificaciones">
                ${Object.entries(producto.especificaciones) // Transforma el objeto producto.especificaciones en un array de arrys
                    .map(([clave, valor]) => `<li><strong data-i18n="spec.${clave}">${traducir('spec.' + clave)}</strong>: ${valor}</li>`)
                    .join("")}
            </ul>
                
            <button class="btn-carrito" data-i18n="product.add-cart">${traducir('product.add-cart')}</button>
            <button class="btn-volver" data-i18n="product.back">${traducir('product.back')}</button>
        
            </div>
        </section>
    `;
}

function pintarBotones(producto, contenedor, precioFinal) {
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
                _id: producto._id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                imagen: producto.imagen,
                precio: precioFinal,
                tipo: producto.tipo,
                cantidad: 1,
            });
            alert("Producto añadido al carrito ✅");
        });
    }
}