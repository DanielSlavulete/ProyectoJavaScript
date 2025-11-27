// menu.js

class MainHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.initBuscador();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .header {
          background: #0048aa;
          color: #fff;
          padding: 10px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
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
        .logo h1 {
          font-size: 1.4rem;
          margin: 0;
        }

        .buscador {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          max-width: 500px;
        }
        #input-busqueda {
          flex: 1;
          padding: 6px 10px;
          border-radius: 4px;
          border: none;
          outline: none;
        }
        #btn-buscar {
          padding: 6px 10px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .usuario {
          font-size: 0.9rem;
          white-space: nowrap;
        }
        .usuario a {
          color: #fff;
          text-decoration: none;
        }

        .resultados-busqueda {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #fff;
          color: #000;
          border: 1px solid #ccc;
          border-radius: 4px;
          max-height: 250px;
          overflow-y: auto;
          z-index: 100;
          font-size: 0.9rem;
        }
        .resultado-item {
          padding: 6px 8px;
          cursor: pointer;
        }
        .resultado-item:hover {
          background: #f0f0f0;
        }
        .resultado-nombre {
          font-weight: 600;
        }
        .resultado-categoria {
          font-size: 0.8rem;
          color: #666;
        }
      </style>

      <header class="header">
        <a href="./index.html" class="logo">
          <img src="../img/Logo.png" alt="Logo Tienda" />
          <h1>MGS COMPONENTS</h1>
        </a>

        <!-- 🔹 Barra de búsqueda -->
        <div class="buscador">
          <input type="text" id="input-busqueda" placeholder="Buscar productos..." />
          <button id="btn-buscar">🔍</button>
          <div id="resultados-busqueda" class="resultados-busqueda"></div>
        </div>

        <!-- 🔹 Enlaces de usuario -->
        <div class="usuario">
          <a href="./login.html">Iniciar sesión</a> |
          <a href="./registro.html">Registrarse</a> |
          <a href="./carrito.html" id="carrito-link">
            🛒 Carrito (<span id="carrito-contador">0</span>)
          </a>
        </div>
      </header>
    `;
  }

  async initBuscador() {
    const input = this.shadowRoot.querySelector("#input-busqueda");
    const btnBuscar = this.shadowRoot.querySelector("#btn-buscar");
    const contResultados = this.shadowRoot.querySelector("#resultados-busqueda");

    if (!input || !btnBuscar || !contResultados) return;

    // 🔹 Cargar productos dinámicamente
    let productos = [];
    try {
      // menu.js está en /js, datos_iniciales.js también -> ruta relativa ./datos_iniciales.js
      const modulo = await import("./datos_iniciales.js");
      productos = modulo.productos;
    } catch (err) {
      console.error("Error cargando productos para el buscador:", err);
      return; // El header se ve igual, pero sin búsqueda
    }

    const limpiar = () => {
      contResultados.innerHTML = "";
    };

    const mostrarResultados = (lista) => {
      limpiar();

      if (lista.length === 0) {
        const item = document.createElement("div");
        item.classList.add("resultado-item");
        item.textContent = "No se encontraron productos";
        contResultados.appendChild(item);
        return;
      }

      lista.forEach((producto) => {
        const item = document.createElement("div");
        item.classList.add("resultado-item");
        item.innerHTML = `
          <div class="resultado-nombre">${producto.nombre}</div>
          <div class="resultado-categoria">
            ${producto.categoria || producto.tipo || ""}
          </div>
        `;
        item.addEventListener("click", () => {
          // ⬇️ Cambia el nombre del HTML si tu detalle se llama distinto
          window.location.href = `./producto-detalle.html?id=${producto.id}`;
        });
        contResultados.appendChild(item);
      });
    };

    const ejecutarBusqueda = (irAlPrimero = false) => {
      const texto = input.value.toLowerCase().trim();
      if (texto === "") {
        limpiar();
        return;
      }

      const filtrados = productos.filter((prod) => {
        const nombre = prod.nombre.toLowerCase();
        const descripcion = prod.descripcion.toLowerCase();
        const categoria = (prod.categoria || prod.tipo || "").toLowerCase();
        return (
          nombre.includes(texto) ||
          descripcion.includes(texto) ||
          categoria.includes(texto)
        );
      });

      if (irAlPrimero && filtrados.length > 0) {
        window.location.href = `./detalles-producto.html?id=${filtrados[0].id}`;
        return;
      }

      mostrarResultados(filtrados);
    };

    input.addEventListener("input", () => ejecutarBusqueda(false));
    btnBuscar.addEventListener("click", () => ejecutarBusqueda(true));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") ejecutarBusqueda(true);
    });

    this.shadowRoot.addEventListener("click", (e) => {
      const buscador = this.shadowRoot.querySelector(".buscador");
      if (!buscador.contains(e.target)) limpiar();
    });
  }
}

customElements.define("main-header", MainHeader);
