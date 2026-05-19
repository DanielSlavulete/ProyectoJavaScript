import { Producto } from "./producto.js";
import { aplicarTraducciones } from "./idioma.js";

const API_URL = "http://localhost:3000/api";

onload = async () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    if (!usuario || usuario.rol !== 'admin') {
        alert("Acceso denegado. No tienes permisos para acceder a esta página.");
        window.location.href = "./index.html";
        return;
    }

    const inputs = {
        id: document.querySelector('#producto-id'),
        nombre: document.querySelector('#prod-nombre'),
        descripcion: document.querySelector('#prod-descripcion'),
        imagen: document.querySelector('#prod-imagen'),
        precio: document.querySelector('#prod-precio'),
        tipo: document.querySelector('#prod-tipo'),
        especificaciones: document.querySelector('#prod-especificaciones'),
        descuento: document.querySelector('#prod-descuento'),
        urlVideo: document.querySelector('#prod-urlVideo'),
    };

    const productosContenedor = document.querySelector('#lista-productos-admin');
    const mensajeContenedor = document.querySelector('.mensaje-formulario');
    const productos = await cargarProductos(productosContenedor);
    pintarProductos(productos, productosContenedor);
    añadirEventos(inputs, mensajeContenedor);
    aplicarTraducciones();
};

async function cargarProductos(contenedor) {
    try {
        const res = await fetch(`${API_URL}/productos`);
        const datos = await res.json();
        const productos = datos.map(p => new Producto(
        p._id, p.nombre, p.descripcion, p.imagen, p.precio,
        p.tipo, p.especificaciones, p.descuento, p.urlVideo
        ));
        return productos;
    } catch (err) {
        console.error('Error cargando productos:', err);
        contenedor.innerHTML = '<p>Error al cargar los productos. Inténtalo más tarde.</p>';
    }
}

function pintarProductos(productos, productosContenedor) {

    // WRAPPER RESPONSIVE
    const wrapper = document.createElement("div");
    wrapper.classList.add("admin-tabla-wrapper");

    // TABLA
    const tabla = document.createElement("table");
    tabla.classList.add("tabla-productos-admin");

    // METEMOS TABLA DENTRO DEL WRAPPER
    wrapper.appendChild(tabla);

    // METEMOS WRAPPER EN EL CONTENEDOR
    productosContenedor.appendChild(wrapper);

    // CABECERA
    const tr = document.createElement("tr");

    tabla.appendChild(tr);

    tr.innerHTML = `
        <th>ID</th>
        <th data-i18n="admin.name">Nombre</th>
        <th data-i18n="admin.description">Descripción</th>
        <th data-i18n="admin.image">Imagen</th>
        <th data-i18n="admin.price">Precio</th>
        <th data-i18n="admin.type">Tipo</th>
        <th data-i18n="admin.specs">Especificaciones</th>
        <th data-i18n="admin.discount-table">Descuento</th>
        <th data-i18n="admin.video">Url Video</th>
        <th data-i18n="admin.actions">Acciones</th>
    `;

    productos.forEach(p => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p._id}</td>
            <td>${p.nombre}</td>
            <td data-i18n="desc.${p.imagen.replace('.jpg', '')}">
                ${p.descripcion}
            </td>
            <td>
                <img src="../img/${p.imagen}" 
                     alt="${p.nombre}" 
                     class="producto-img">
            </td>
            <td>${p.precio} €</td>
            <td data-i18n="product.name-${p.tipo}">
                ${p.tipo}
            </td>
            <td>${especificacionesATexto(p.especificaciones)}</td>
            <td>${p.descuento} %</td>
            <td>${p.urlVideo}</td>

            <td class="acciones">
                <button
                    type="button"
                    class="btn-borrar-producto"
                    data-id="${p._id}"
                    data-i18n="admin.delete-btn"
                >
                    Borrar
                </button>

                <button
                    type="submit"
                    class="btn-editar-producto"
                    data-id="${p._id}"
                    data-i18n="admin.edit-btn"
                >
                    Editar
                </button>
            </td>
        `;

        tabla.appendChild(tr);
    });
}

function añadirEventos(inputs, mensajeContenedor) {
    const tabla = document.querySelector('.tabla-productos-admin');
    const form = document.querySelector('#form-producto');
    const botonCancelar = document.querySelector('.btn-cancelar-producto');

    tabla.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-editar-producto')) {
            const id = e.target.dataset.id;
            editarProducto(id, inputs, mensajeContenedor);
        }
        if (e.target.classList.contains('btn-borrar-producto')) {
            const id = e.target.dataset.id;
            if (confirm("¿Seguro que quieres eliminar este producto?")) {
                borrarProducto(id, mensajeContenedor);
            }
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const botonGuardar = document.querySelector('.btn-guardar-producto');
        if (botonGuardar.classList.contains('modo-edicion')) {
            guardarEdicion(inputs, mensajeContenedor);
        } else {
            crearProducto(inputs, mensajeContenedor);
        }
    })

    botonCancelar.addEventListener('click', () => {
        const botonGuardar = document.querySelector('.btn-guardar-producto');
        if (botonGuardar.classList.contains('modo-edicion')) {
            botonGuardar.classList.remove('modo-edicion');
            botonGuardar.textContent = 'Guardar producto';
            document.querySelector('#form-titulo').textContent = 'Crear producto';
        }
        form.reset();
    })
}

async function crearProducto(inputs, mensajeContenedor) {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    const datosEnvio = {
        nombre: inputs.nombre.value,
        descripcion: inputs.descripcion.value,
        imagen: inputs.imagen.value,
        precio: inputs.precio.value,
        tipo: inputs.tipo.value,
        especificaciones: textoAEspecificaciones(inputs.especificaciones.value),
        descuento: inputs.descuento.value,
        urlVideo: inputs.urlVideo.value,
    };

    try {
        const res = await fetch(`${API_URL}/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cliente-id": usuario._id
            },
            body: JSON.stringify(datosEnvio)
        });
        const data = await res.json();
        
        if (res.ok) {
            console.log(data.mensaje);
            mostrarOk(mensajeContenedor, data.mensaje);
            setTimeout(() => location.reload(), 1000);
        } else {
            mostrarError(mensajeContenedor, data.error);
        }
    } catch (err) {
        console.error('Error al crear producto:', err);
        alert('Error al crear el producto');
    }
}

async function editarProducto(id, inputs, mensajeContenedor) {
    try {
        const res = await fetch(`${API_URL}/productos/${id}`);
        const producto = await res.json();

        if (!res.ok) {
            mostrarError(mensajeContenedor, producto.error);
            return;
        };

        const titulo = document.querySelector('#form-titulo');
        const botonGuardar = document.querySelector('.btn-guardar-producto');

        titulo.textContent = 'Editar producto';
        botonGuardar.textContent = 'Guardar edición';
        botonGuardar.classList.add('modo-edicion');
        inputs.id.value = producto._id;
        inputs.nombre.value = producto.nombre;
        inputs.descripcion.value = producto.descripcion;
        inputs.imagen.value = producto.imagen;
        inputs.precio.value = producto.precio;
        inputs.tipo.value = producto.tipo;
        inputs.especificaciones.value = especificacionesATexto(producto.especificaciones);
        inputs.descuento.value = producto.descuento;
        inputs.urlVideo.value = producto.urlVideo;
        document.querySelector('#form-producto').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    } catch (err) {
        console.error('Error cargando producto:', err);
        alert('Error al cargar el producto.');
    }
}

async function guardarEdicion(inputs, mensajeContenedor) {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    const datosEnvio = {
        nombre: inputs.nombre.value,
        descripcion: inputs.descripcion.value,
        imagen: inputs.imagen.value,
        precio: inputs.precio.value,
        tipo: inputs.tipo.value,
        especificaciones: textoAEspecificaciones(inputs.especificaciones.value),
        descuento: inputs.descuento.value,
        urlVideo: inputs.urlVideo.value,
    };

    try {
        const res = await fetch(`${API_URL}/productos/${inputs.id.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "cliente-id": usuario._id
            },
            body: JSON.stringify(datosEnvio)
        });
        const data = await res.json();
        
        if (res.ok) {
            mostrarOk(mensajeContenedor, data.mensaje);
            setTimeout(() => location.reload(), 1000);
        } else {
            mostrarError(mensajeContenedor, data.error);
        }
    } catch (err) {
        console.error('Error al editar producto:', err);
        alert('Error al editar el producto');
    }
}

async function borrarProducto(id, mensajeContenedor) {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

    try {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            method: "DELETE",
            headers: {
                "cliente-id": usuario._id
            }
        });
        const data = await res.json();
        if (res.ok) {
            mostrarOk(mensajeContenedor, data.mensaje);
            setTimeout(() => location.reload(), 2000);
        } else {
            mostrarError(mensajeContenedor, data.error);
        }
        document.querySelector('#form-producto').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        alert('Error al eliminar el producto');
    }
}

// -------------------- FUNCIONES AUXILIARES --------------------

function mostrarError(mensaje, texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "red";
}

function mostrarOk(mensaje, texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "green";
}

function especificacionesATexto(especificaciones) {
    return Object.entries(especificaciones)
        .map(([clave, valor]) => `<p><span data-i18n="spec.${clave}">${clave}</span>: ${valor}</p>`)
        .join('\n');
}

function textoAEspecificaciones(texto) {
    const especificaciones = {};
    texto.split('\n').forEach(linea => {
        const [clave, ...valor] = linea.split(':');
        if (clave && valor.length) {
            especificaciones[clave.trim()] = valor.join(':').trim();
        };
    });
    return especificaciones;
}