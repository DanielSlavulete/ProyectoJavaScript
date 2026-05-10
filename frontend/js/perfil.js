import { Cliente } from "./cliente.js";
import { deleteCookie } from "./cookies.js";

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

  // Crear instancia del cliente
  const cliente = new Cliente(
    usuario.id,
    usuario.nombre,
    usuario.email,
    usuario.telefono,
    usuario.password
  );

  // Imprimir la información en los spans existentes
  const infoHTML = cliente.mostrarInfo();

  // Creamos un contenedor temporal para leer los valores
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = infoHTML;

  // Asignamos valores al DOM actual (manteniendo tu estructura)
  document.getElementById("perfil-nombre").textContent = cliente.nombre;
  document.getElementById("perfil-email").textContent = cliente.email;
  document.getElementById("perfil-telefono").textContent = cliente.telefono;

  // Botón ir al carrito
  const btnIrCarrito = document.getElementById("btn-ir-carrito");
  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  btnIrCarrito.addEventListener("click", () => {
    window.location.href = "./carrito.html";
  });

  // Botón cerrar sesión
  btnCerrarSesion.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres cerrar sesión?")) {
      sessionStorage.removeItem("usuarioLogueado");
      deleteCookie("ultimoUsuario");
      window.location.href = "./index.html";
    }
  });
});
