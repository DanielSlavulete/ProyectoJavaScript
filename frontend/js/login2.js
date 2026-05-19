import { Cliente } from "./cliente.js";
import { setCookie } from "./cookies.js";
import { inicializarTema } from "./tema.js";
import { aplicarTraducciones } from "./idioma.js";

const API_URL = "http://localhost:3000/api";
const mensaje = document.getElementById("mensajeLogin");

onload = () => {
    const formLogin = document.getElementById("formLogin");
    const botonRegistrarse = document.getElementById("botonRegistrarse");
    const botonTema = document.querySelector("#btn-tema");

    if (!formLogin) return;
    inicializarTema(botonTema);
    cambiarIdioma();
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        limpiarMensaje();
        const datos = obtenerDatosFormulario();
        if (!validarFormulario(datos)) return;
        await autenticarUsuario(datos);
    })

    botonRegistrarse.addEventListener("click", () => {
        window.location.href = "./registro.html";
    });
}

function obtenerDatosFormulario() {
    return {
        email: document.getElementById("correoIniciarSesion").value.trim(),
        password: document.getElementById("contrasenaIniciarSesion").value.trim(),
    }
}

function validarFormulario(datos) {
    const { email, password } = datos;

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

    return true;
}

async function autenticarUsuario(datos) {
    const { email, password } = datos;
    const datosEnvio = {
        email,
        password
    };

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosEnvio)
        });
        const data = await res.json();

        if (res.ok) {
            mostrarOk(data.mensaje);
            guardarSessionStorageYCookies(data);
            setTimeout(() => {
                window.location.href = "./index.html";
            }, 1500);
        } else {
            mostrarError(data.error);
        }
    } catch (err) {
        console.error('Error al logear usuario:' , err);
        mostrarError("Error de conexión. Inténtalo más tarde.");
    }
}

function guardarSessionStorageYCookies(dataRespuesta) {
    const clienteLogueado = new Cliente (
        dataRespuesta.clienteId,
        dataRespuesta.nombre,
        dataRespuesta.email,
        dataRespuesta.telefono,
        null,
        dataRespuesta.rol
    );

    // Guardar en sessionStorage
    sessionStorage.setItem("usuarioLogueado", JSON.stringify(clienteLogueado));
    sessionStorage.setItem("mostrarBienvenida", "true");

    // Guardar cookie de bienvenida (nombre visible)
    setCookie("ultimoUsuario", clienteLogueado.nombre, 3);

    mostrarOk(`Inicio de sesión correcto. Bienvenido ${clienteLogueado.nombre}.`);
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