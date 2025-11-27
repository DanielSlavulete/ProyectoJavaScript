document.addEventListener("DOMContentLoaded", () => {
  // Recuperamos usuario logueado
  const usuarioJSON = sessionStorage.getItem("usuarioLogueado");
  const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;

  // Si no hay usuario -> enviamos a login
  if (!usuario) {
    alert("Debes iniciar sesión para acceder a tu perfil.");
    window.location.href = "./login.html";
    return;
  }

  // Referencias a elementos del DOM
  const spanNombre = document.getElementById("perfil-nombre");
  const spanEmail = document.getElementById("perfil-email");
  const spanFechaRegistro = document.getElementById("perfil-fecha-registro");
  const spanRol = document.getElementById("perfil-rol");

  const btnIrCarrito = document.getElementById("btn-ir-carrito");
  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

  // Rellenar datos del usuario
  // Ajusta los campos a los que tengas en el objeto `usuario` de tu registro
  spanNombre.textContent = usuario.nombre || "(Sin nombre)";
  spanEmail.textContent = usuario.email || "(Sin email)";


  // Rol opcional (por si luego haces admin/usuario)
  spanRol.textContent = usuario.rol || "Cliente";

  // Botón ir al carrito
  btnIrCarrito.addEventListener("click", () => {
    window.location.href = "./carrito.html";
  });

  // Botón cerrar sesión
  btnCerrarSesion.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres cerrar sesión?")) {
      sessionStorage.removeItem("usuarioLogueado");
      // Podrías también limpiar cookies si quieres, pero tu cookie `ultimoUsuario`
      // la estás usando solo como "recuerdo", así que la puedes dejar.
      window.location.href = "./index.html";
    }
  });
});
