// menu.js

import { deleteCookie } from "./cookies.js";

class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.inicializarBuscador();
        this.actualizarUsuario();
        this.initCarrito();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .header {
                background: #0048aa;
                color: white;
                padding: 12px 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                font-family: Orbitron, Arial, sans-serif;
            }

            .logo {
                display: flex;
                align-items: center;
                gap: 10px;
                text-decoration: none;
                color: inherit;
            }

            .logo img {
                height: 40px;
            }

            .buscador {
                position: relative;
                flex: 1;
                max-width: 450px;
                display: flex;
                align-items: center;
                gap: 5px;
            }

            #input-busqueda {
                width: 100%;
                padding: 6px 10px;
                border-radius: 4px;
                border: none;
            }

            #btn-buscar {
                padding: 6px 10px;
                border: none;
                background: white;
                color: black;
                cursor: pointer;
                border-radius: 4px;
            }

            .usuario a {
                color: white;
                text-decoration: none;
            }

            .resultados-busqueda {
                position: absolute;
                top: 38px;
                left: 0;
                right: 0;
                background: white;
                color: black;
                border: 1px solid #ccc;
                border-radius: 4px;
                max-height: 250px;
                overflow-y: auto;
                z-index: 100;
            }

            .resultado-item {
                padding: 8px;
                cursor: pointer;
            }

            .resultado-item:hover {
                background: #f0f0f0;
            }
        </style>

        <header class="header">
            <a href="./index.html" class="logo">
              <img src="../img/Logo.png" alt="Logo Tienda">
              <h1>MGS COMPONENTS</h1>
            </a>

            <div class="buscador">
                <input type="text" id="input-busqueda" placeholder="Buscar productos...">
                <button id="btn-buscar">🔍</button>
                <div id="resultados-busqueda" class="resultados-busqueda"></div>
            </div>

            <div class="usuario" id="zona-usuario">
                <!-- Aquí se insertarán dinámicamente los enlaces -->
            </div>
        </header>
        `;
    }

    async inicializarBuscador() {
        const input = this.shadowRoot.querySelector("#input-busqueda");
        const btnBuscar = this.shadowRoot.querySelector("#btn-buscar");
        const contenedorResultados = this.shadowRoot.querySelector("#resultados-busqueda");

        let productos = [];
        try {
            const modulo = await import("./datos_iniciales.js");
            productos = modulo.productos;
        } catch (e) {
            console.error("Error al cargar productos:", e);
            return;
        }

        const limpiar = () => contenedorResultados.innerHTML = "";

        const mostrarResultados = (lista) => {
            limpiar();
            if (lista.length === 0) {
                contenedorResultados.innerHTML = `<div class="resultado-item">No se encontraron productos</div>`;
                return;
            }

            lista.forEach(p => {
                const item = document.createElement("div");
                item.classList.add("resultado-item");
                item.textContent = p.nombre;
                item.addEventListener("click", () => {
                    window.location.href = `./producto-detalle.html?id=${p.id}`;
                });
                contenedorResultados.appendChild(item);
            });
        };

        input.addEventListener("input", () => {
            const texto = input.value.toLowerCase().trim();
            if (!texto) return limpiar();

            const filtrados = productos.filter(p =>
                p.nombre.toLowerCase().includes(texto) ||
                p.descripcion.toLowerCase().includes(texto)
            );

            mostrarResultados(filtrados);
        });

        btnBuscar.addEventListener("click", () => {
            if (input.value.trim() !== "") {
                const texto = input.value.toLowerCase().trim();
                const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
                if (filtrados.length > 0) {
                    window.location.href = `./producto-detalle.html?id=${filtrados[0].id}`;
                }
            }
        });
    }

    initCarrito() {
        const span = this.shadowRoot.querySelector("#carrito-contador");
        if (!span) return;

        const actualizar = () => {
            let carrito = [];
            try {
                const datos = localStorage.getItem("carrito");
                carrito = datos ? JSON.parse(datos) : [];
            } catch {
                carrito = [];
            }

            // Sumamos todas las cantidades
            const totalUnidades = carrito.reduce(
                (acc, item) => acc + (item.cantidad || 1),
                0
            );

            span.textContent = totalUnidades;
        };

        // Primera carga
        actualizar();

        // Escuchar cambios del carrito (evento lanzado en storage.js)
        window.addEventListener("carrito-cambiado", actualizar);
    }

    actualizarUsuario() {
        const zonaUsuario = this.shadowRoot.querySelector("#zona-usuario");
        const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

        // NO logueado
        if (!usuario) {
            zonaUsuario.innerHTML = `
                <a href="./login.html">Iniciar sesión</a> |
                <a href="./registro.html">Registrarse</a> |
                <a href="./carrito.html">🛒 Carrito (<span id="carrito-contador">0</span>)</a>
            `;
            return;
        }

        // SÍ logueado
        zonaUsuario.innerHTML = `
            <span>👋 Hola, ${usuario.nombre}</span> |
            <a href="./perfil.html">Mi perfil</a> |
            <a href="./carrito.html">🛒 Carrito (<span id="carrito-contador">0</span>)</a> |
            <a href="#" id="cerrar-sesion">Cerrar sesión</a>
        `;

        this.shadowRoot.querySelector("#cerrar-sesion").onclick = (e) => {
            e.preventDefault();
            sessionStorage.removeItem("usuarioLogueado");
            deleteCookie("ultimoUsuario");
            window.location.reload();
        };
    }
}

customElements.define("main-header", MainHeader);
