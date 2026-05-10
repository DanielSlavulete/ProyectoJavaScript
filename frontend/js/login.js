import { Cliente } from "./cliente.js";
import { setCookie } from "./cookies.js";

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  const inputEmail = document.getElementById("correoIniciarSesion");
  const inputPassword = document.getElementById("contrasenaIniciarSesion");
  const mensaje = document.getElementById("mensajeLogin");
  const botonRegistrarse = document.getElementById("botonRegistrarse");

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarMensaje();

    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    // Validaciones básicas
    if (!email || !password) {
      return mostrarError("Debes rellenar todos los campos.");
    }

    if (!Cliente.validarEmail(email)) {
      return mostrarError("El correo electrónico no es válido.");
    }

    if (!Cliente.validarPassword(password)) {
      return mostrarError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.");
    }

    // Recuperar usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar el cliente que coincide con el email y contraseña
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
      return mostrarError("Correo o contraseña incorrectos.");
    }

    // Crear instancia del cliente
    const clienteLogueado = new Cliente(
      usuario.id,
      usuario.nombre,
      usuario.email,
      usuario.telefono,
      usuario.password
    );

    // Guardar en sessionStorage
    sessionStorage.setItem("usuarioLogueado", JSON.stringify(clienteLogueado));

    // Guardar cookie de bienvenida (nombre visible)
    setCookie("ultimoUsuario", clienteLogueado.nombre, 3);

    mostrarOk(`Inicio de sesión correcto. Bienvenido ${clienteLogueado.nombre}`);

    // Redirigir después de un momento
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1500);
  });

  // Botón "Registrarse"
  botonRegistrarse.addEventListener("click", () => {
    window.location.href = "./registro.html";
  });

  // -------------------- FUNCIONES AUXILIARES --------------------

  function mostrarError(texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "red";
  }

  function mostrarOk(texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "green";
  }

  function limpiarMensaje() {
    mensaje.textContent = "";
  }
});
