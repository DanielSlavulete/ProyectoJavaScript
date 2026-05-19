import { Cliente } from "./cliente.js";
import { inicializarTema } from "./tema.js";
import { aplicarTraducciones } from "./idioma.js";

const API_URL = "http://localhost:3000/api";
const mensaje = document.getElementById("mensajeRegistro");

onload = () => {
    const formRegistro = document.getElementById("formRegistro");
    const botonTema = document.querySelector("#btn-tema");

    if (!formRegistro) return;
    inicializarTema(botonTema);
    cambiarIdioma();
    formRegistro?.addEventListener("submit", async (e) => {
        e.preventDefault();
        limpiarMensaje();
        const datos = obtenerDatosFormulario();
        if (!validarFormulario(datos)) return;
        await registrarCliente(datos);
    })
}

function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById("nombreCrearCuenta").value.trim(),
        email: document.getElementById("correoCrearCuenta").value.trim(),
        telefono: document.getElementById("telefonoCrearCuenta").value.trim(),
        password: document.getElementById("contrasenaCrearCuenta").value.trim(),
        password2: document.getElementById("repetirContrasena").value.trim(),
        aceptaPolitica: document.getElementById("radioAceptarPolitica").checked,
    }
}

function validarFormulario(datos) {
    const { nombre, email, telefono, password, password2, aceptaPolitica } = datos;

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

    return true;
}

async function registrarCliente(datos) {
    const { nombre, email, telefono, password } = datos;
    const datosEnvio = {
        nombre,
        email,
        telefono,
        password
    };

    try {
        const res = await fetch(`${API_URL}/auth/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosEnvio)
        });
        const data = await res.json();

        if (res.ok) {
            mostrarOk(data.mensaje);
            setTimeout(() => window.location.href = "../html/login.html", 1500);
        } else {
            mostrarError(data.error);
        }
    } catch (err) {
        console.error('Error al registrar usuario:' , err);
        mostrarError("Error de conexión. Inténtalo más tarde.");
    }
}

function cambiarIdioma() {
    const selectorIdioma = document.getElementById("selector-idioma");
    const idiomaGuardado = localStorage.getItem("idioma") || "es";
    selectorIdioma.value = idiomaGuardado;

    selectorIdioma.addEventListener("change", () => {
        localStorage.setItem("idioma", selectorIdioma.value);
        document.documentElement.lang = selectorIdioma.value;
        aplicarTraducciones();
    });
}

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