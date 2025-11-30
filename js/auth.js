function getUsuarioLogueado() {
    const usuarioJSON = sessionStorage.getItem("usuarioLogueado");
    if (!usuarioJSON) return null;
    try {
        return JSON.parse(usuarioJSON);
    } catch {
        return null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const usuario = getUsuarioLogueado();

    // Actualiza el área .usuario del header (si existe en esa página)
    const contenedorUsuario = document.querySelector(".usuario");
    if (contenedorUsuario) {
        if (usuario) {
            contenedorUsuario.innerHTML = `
                Hola, <strong>${usuario.nombre}</strong> |
                <a href="./perfil.html">Mi perfil</a> |
                <a href="./carrito.html" id="carrito-link">🛒 Carrito (<span id="carrito-contador">0</span>)</a> |
                <a href="#" id="link-logout">Cerrar sesión</a>
            `;
        } else {
            contenedorUsuario.innerHTML = `
                <a href="./login.html">Iniciar sesión</a> |
                <a href="./registro.html">Registrarse</a> |
                <a href="./carrito.html" id="carrito-link">🛒 Carrito (<span id="carrito-contador">0</span>)</a>
            `;
        }
    }

    // Protege páginas privadas (solo usuarios logueados)
    const esPrivada = document.body.dataset.privada === "true";
    if (esPrivada && !usuario) {
        // No hay usuario logueado -> lo mandamos al login
        window.location.href = "./login.html";
        return;
    }

    // Páginas solo para invitados (login, registro)
    const soloInvitados = document.body.dataset.soloInvitados === "true";
    if (soloInvitados && usuario) {
        // Ya está logueado -> no debería ver login/registro
        window.location.href = "./index.html";
        return;
    }

    // Cerrar sesión (si hay enlace)
    const linkLogout = document.getElementById("link-logout");
    if (linkLogout) {
        linkLogout.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.removeItem("usuarioLogueado");
            window.location.href = "./index.html";
        });
    }
});
