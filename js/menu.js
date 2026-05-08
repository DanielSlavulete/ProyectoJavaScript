import { deleteCookie } from "./cookies.js";

// Componente Web para el encabezado principal(logo, buscador y zona de usuario).
class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); //Encapsula estilos y estructura.
    }
    // Con el modo open, podemos acceder a su contenido desde fuera
    // Podemos hacer por ejemplo: document.querySelecto("main-header").shadowRoot

    connectedCallback() {     // Metodo para ejecutar automaticamente cuando <main-header> se añade al DOM
        this.render();                  // Renderiza el HTML del header
        this.inicializarBuscador();     // Activa el buscador
        this.actualizarUsuario();       // Muestra el estado del usuario
        this.initCarrito();             // Inicializa el contador del carrito
    }

    // Estructura y estilos del header
    render() { // Es importante usar shadowRoot para aislar el comportamiento y que ciertos estilos no afecten a toda la pagina
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
                flex-shrink: 0;
            }

            .logo-img-box {
                width: 90px;
                height: 55px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .logo img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .logo h1 {
                margin: 0;
                font-size: 1.6rem;
                white-space: nowrap;
            }

            .buscador {
                position: relative;
                flex: 1;
                max-width: 450px;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            #input-busqueda {
                width: 100%;
                padding: 8px 10px;
                border-radius: 6px;
                border: none;
                font-family: Inter, Arial, sans-serif;
            }

            #btn-buscar {
                padding: 8px 12px;
                border: none;
                background: white;
                color: black;
                cursor: pointer;
                border-radius: 6px;
            }

            #btn-buscar:hover {
                background: #e8e8e8;
            }

            .usuario {
                display: flex;
                align-items: center;
                gap: 10px;
                white-space: nowrap;
                font-size: 0.9rem;
            }

            .usuario > span {
                background: rgba(255, 255, 255, 0.14);
                padding: 7px 10px;
                border-radius: 8px;
            }

            #carrito-contador {
                background: none;
                padding: 0;
                border-radius: 0;
            }

            .usuario a {
                color: white;
                text-decoration: none;
                background: rgba(255, 255, 255, 0.12);
                padding: 7px 10px;
                border-radius: 8px;
                transition: background 0.2s ease, transform 0.2s ease;
            }

            .usuario a:hover {
                background: rgba(255, 255, 255, 0.25);
                transform: translateY(-1px);
            }

            .logo:focus-visible,
            .usuario a:focus-visible,
            #input-busqueda:focus-visible,
            #btn-buscar:focus-visible {
                outline: 3px solid #ffcc00;
                outline-offset: 4px;
            }

            .resultados-busqueda {
                position: absolute;
                top: 42px;
                left: 0;
                right: 0;
                background: white;
                color: black;
                border: 1px solid #ccc;
                border-radius: 6px;
                max-height: 250px;
                overflow-y: auto;
                z-index: 100;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
                font-family: Inter, Arial, sans-serif;
            }

            .resultado-item {
                padding: 10px;
                cursor: pointer;
            }

            .resultado-item:hover {
                background: #f0f0f0;
            }

            @media (max-width: 900px) {
                .header {
                    flex-wrap: wrap;
                    justify-content: center;
                    text-align: center;
                }

                .buscador {
                    order: 3;
                    flex-basis: 100%;
                    max-width: 100%;
                }

                .usuario {
                    flex-wrap: wrap;
                    justify-content: center;
                }
            }

            @media (max-width: 500px) {
                .header {
                    padding: 12px 16px;
                }

                .logo h1 {
                    font-size: 1.2rem;
                }

                .usuario {
                    gap: 6px;
                }

                .usuario a,
                .usuario span {
                    font-size: 0.8rem;
                    padding: 6px 8px;
                }
            }

        </style>

        <header class="header">
            <a href="./index.html" class="logo">
                <span class="logo-img-box">
                    <img src="../img/Logo.png" alt="Logo de MGS Components">
                </span>
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

        // Carga los productos del módulo de datos
        let productos = [];
        try {
            const modulo = await import("./datos_iniciales.js"); // Con await carga el JS y espera hasta que esté listo para usarlo
            productos = modulo.productos;
        } catch (e) {
            console.error("Error al cargar productos:", e);
            return;
        }

        // Limpia los resultados si se borra el texto de busqueda o se escribe algo nuevo
        const limpiar = () => contenedorResultados.innerHTML = "";

        // Muestra la lista de productos encontrados
        const mostrarResultados = (lista) => {
            limpiar();
            if (lista.length === 0) {
                contenedorResultados.innerHTML = `<div class="resultado-item">No se encontraron productos</div>`;
                return;
            }

            // Crea un div clickable por cada producto
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

        // Filtro en tiempo real mientras se escribe
        input.addEventListener("input", () => {
            const texto = input.value.toLowerCase().trim();
            if (!texto) return limpiar();

            const filtrados = productos.filter(p =>
                p.nombre.toLowerCase().includes(texto) ||
                p.descripcion.toLowerCase().includes(texto) ||
                p.esDeCategoria(texto)
            );

            mostrarResultados(filtrados);
        });

        // Botón de buscar (toma el primer resultado si hay)
        btnBuscar.addEventListener("click", () => {
            const texto = input.value.toLowerCase().trim();
            if (!texto) return;

            const filtrados = productos.filter(p =>
                p.nombre.toLowerCase().includes(texto) ||
                p.descripcion.toLowerCase().includes(texto) ||
                p.esDeCategoria(texto)
            );

            if (filtrados.length > 0) {
                window.location.href = `./producto-detalle.html?id=${filtrados[0].id}`;
            } else {
                alert("No se encontraron productos que coincidan con tu búsqueda.");
            }
        });

    }

    // Muestra la cantidad total de productos en el carrito
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
            const totalUnidades = carrito.reduce( // reduce recorre el array carrito y va sumando y acumulando
                (acc, item) => acc + (item.cantidad || 1),
                0 // el acumuulador se incia en 0
            );

            span.textContent = totalUnidades;
        };

        // Primera carga, inicializa el contador al cargar
        actualizar();

        // Escuchar cambios del carrito (evento lanzado en storage.js)
        window.addEventListener("carrito-cambiado", actualizar);
    }

    // Actualiza los enlaces del usuario según su estado
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

        // Acción de cerrar sesión
        this.shadowRoot.querySelector("#cerrar-sesion").onclick = (e) => {
            e.preventDefault();
            sessionStorage.removeItem("usuarioLogueado");
            deleteCookie("ultimoUsuario");
            window.location.reload();
        };
    }
}

// Se registra el componente web <main-header>
customElements.define("main-header", MainHeader);
