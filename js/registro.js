import { Cliente } from "./cliente.js";

document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("formRegistro");
  const inputNombre = document.getElementById("nombreCrearCuenta");
  const inputEmail = document.getElementById("correoCrearCuenta");
  const inputTelefono = document.getElementById("telefonoCrearCuenta");
  const inputPassword = document.getElementById("contrasenaCrearCuenta");
  const inputPassword2 = document.getElementById("repetirContrasena");
  const radioPolitica = document.getElementById("radioAceptarPolitica");
  const mensaje = document.getElementById("mensajeRegistro");

  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarMensaje();

    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const telefono = inputTelefono.value.trim();
    const password = inputPassword.value.trim();
    const password2 = inputPassword2.value.trim();
    const aceptaPolitica = radioPolitica.checked;

    // Validaciones básicas
    if (!nombre || !email || !telefono || !password || !password2) {
      return mostrarError("Debes rellenar todos los campos.");
    }

    if (!Cliente.validarNombre(nombre)) {
      return mostrarError("El nombre debe tener al menos 2 letras y solo letras/espacios.");
    }

    if (!Cliente.validarEmail(email)) {
      return mostrarError("El correo electrónico no es válido.");
    }

    // Validación simple del teléfono (mínimo 9 dígitos, permite +34)
    const regexTelefono = /^(\+?\d{1,3}[\s-]?)?\d{9}$/;
    if (!regexTelefono.test(telefono)) {
      return mostrarError("Introduce un número de teléfono válido (por ejemplo: +34 612345678).");
    }

    if (!Cliente.validarPassword(password)) {
      return mostrarError(
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número."
      );
    }

    if (password !== password2) {
      return mostrarError("Las contraseñas no coinciden.");
    }

    if (!aceptaPolitica) {
      return mostrarError("Debes aceptar la política de privacidad.");
    }

    // Recuperar usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Evitar duplicados
    const yaExiste = usuarios.some(u => u.email === email);
    if (yaExiste) {
      return mostrarError("Ya existe un usuario registrado con ese correo.");
    }

    // Crear nuevo cliente con los 5 campos
    const nuevoCliente = new Cliente(Date.now(), nombre, email, telefono, password);

    // Guardar en localStorage
    usuarios.push(nuevoCliente);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarOk("Cuenta creada correctamente. Redirigiendo al login...");

    setTimeout(() => {
      window.location.href = "../html/login.html";
    }, 1500);
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
