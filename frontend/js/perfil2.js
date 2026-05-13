import { Cliente } from "./cliente.js";
import { deleteCookie, setCookie } from "./cookies.js";

const API_URL = "http://localhost:3000/api";

$(document).ready(function() {
    const mensaje = document.getElementById("mensajeEdit");
    // Recuperamos usuario logueado
    const usuarioJSON = sessionStorage.getItem("usuarioLogueado");
    const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;

    comprobarUsuarioLogueado(usuario);
    mostrarDatosUsuario(usuario);
    asignarEventosBotones(usuario, mensaje);
});

function comprobarUsuarioLogueado(usuario) {
    // Si no hay usuario -> enviamos a login
    if (!usuario) {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "./login.html";
        return;
    }
}

function mostrarDatosUsuario(usuario) {
    // Crear instancia del cliente
    const cliente = new Cliente(
        usuario._id,
        usuario.nombre,
        usuario.email,
        usuario.telefono,
        null
    );

    // Imprimir la información
    $('.perfil-datos').html(cliente.mostrarInfo());
}

function asignarEventosBotones(usuario, mensaje) {
    // Botón ir al carrito
    $('#btn-ir-carrito').on('click', function() {
        window.location.href = "./index.html";
    })

    // Botón cerrar sesión
    $('#btn-cerrar-sesion').on('click', function() {
        if (confirm("¿Seguro que quieres cerrar sesión?")) {
            sessionStorage.removeItem("usuarioLogueado");
            deleteCookie("ultimoUsuario");
            window.location.href = "./index.html";
        }
    })

    // Botón editar perfil
    $('#btn-editar-perfil').on('click', function() {
        const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
        $('#edit-nombre').val(usuarioActual.nombre);
        $('#edit-email').val(usuarioActual.email);
        $('#edit-telefono').val(usuarioActual.telefono);
        $('#form-editar-perfil').show();
    })

    // Botón cancelar editar
    $('#btn-cancelar-edicion').on('click', function() {
        $('#form-editar-perfil').hide();
    })

    // Botón guardar cambios
    $('#btn-guardar-cambios').on('click', function(e) {
        e.preventDefault();
        actualizarPerfil(mensaje);
    })

    // Botón eliminar cuenta
    $('#btn-eliminar-cuenta').on('click', function() {
        if (confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
            eliminarCuenta(usuario, mensaje);
        }
    })
}

async function actualizarPerfil(mensaje) {
    console.log('actualizarPerfil ejecutado');
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    console.log(usuario._id);
    const nombre = $('#edit-nombre').val();
    const email = $('#edit-email').val();
    const telefono = $('#edit-telefono').val();
    const datosEnvio = {
        nombre,
        email,
        telefono
    };

    try {
        const res = await fetch(`${API_URL}/clientes/${usuario._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosEnvio)
        });
        const data = await res.json();

        if (res.ok) {
            mostrarOk(mensaje, data.mensaje);
            actualizarSesion(datosEnvio);
            const usuarioActualizado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
            mostrarDatosUsuario(usuarioActualizado);
            $('#form-editar-perfil').hide();
        } else {
            mostrarError(mensaje, data.error);
        }
    } catch (err) {
        console.error('Error al actualizar usuario:' , err);
        mostrarError(mensaje, "Error de conexión. Inténtalo más tarde.");
    }
}

function actualizarSesion(datosNuevos) {
  const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
  const usuarioActualizado = { ...usuarioActual, ...datosNuevos };
  sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));
  if (datosNuevos.nombre) {
    setCookie("ultimoUsuario", datosNuevos.nombre, 3);
  }
}

async function eliminarCuenta(usuario, mensaje) {
    try {
        const res = await fetch(`${API_URL}/clientes/${usuario._id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (res.ok) {
            sessionStorage.removeItem("usuarioLogueado");
            deleteCookie("ultimoUsuario");
            window.location.href = "./login.html";
        } else {
            mostrarError(mensaje, data.error);
        }
    } catch (err) {
        console.error('Error al eliminar cuenta:' , err);
        mostrarError(mensaje, "Error de conexión. Inténtalo más tarde.");
    }
}

// -------------------- FUNCIONES AUXILIARES --------------------

function mostrarError(mensaje, texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "red";
}

function mostrarOk(mensaje, texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "green";
}

function limpiarMensaje() {
    mensaje.textContent = "";
}