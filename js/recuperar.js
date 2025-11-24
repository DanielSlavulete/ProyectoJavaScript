document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRecuperar");
    const inputEmail = document.getElementById("correoRecuperarContrasena");
    const mensaje = document.getElementById("mensajeRecuperar");
    const reenviar = document.getElementById("reenviarCorreo");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        limpiarMensaje();

        const email = inputEmail.value.trim();

        // Comprueba el campo vacío
        if (!email) {
            return mostrarError("Debes introducir tu correo electrónico.");
        }

        // Valida el formato de email
        if (!regexEmail.test(email)) {
            return mostrarError("El correo electrónico no es válido.");
        }

        // Comprueba si el correo está en la lista de usuarios (localStorage)
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const existe = usuarios.some(u => u.email === email);

        if (!existe) {
            // Muestra un mensaje genérico para no dar pistas
            mostrarOk("Si el correo está registrado, se enviará un enlace de recuperación.");
        } else {
            mostrarOk("Hemos enviado un enlace de recuperación a tu correo (simulado).");
        }

        // Borra el mensaje pasado un tiempo (setTimeout cumple requisito del profe)
        setTimeout(() => {
            limpiarMensaje();
        }, 4000);
    });

    // Enlace para Volver a enviar el correo
    reenviar.addEventListener("click", (e) => {
        e.preventDefault();
        limpiarMensaje();

        const email = inputEmail.value.trim();

        if (!email) {
            return mostrarError("Escribe primero tu correo para reenviar el enlace.");
        }

        if (!regexEmail.test(email)) {
            return mostrarError("El correo electrónico no es válido.");
        }

        mostrarOk("Hemos vuelto a enviar el enlace de recuperación (simulado).");

        setTimeout(() => {
            limpiarMensaje();
        }, 4000);
    });

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
