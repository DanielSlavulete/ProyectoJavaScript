import { setCookie } from "./cookies.js";

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    const inputEmail = document.getElementById("correoIniciarSesion");
    const inputPassword = document.getElementById("contrasenaIniciarSesion");
    const mensaje = document.getElementById("mensajeLogin");
    const botonRegistrarse = document.getElementById("botonRegistrarse");

    // Al hacer submit del formulario
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recargar la página

        limpiarMensaje();

        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        // Expresiones regulares
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        // Debe tener Mín. 8 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número

        if (!regexEmail.test(email)) {
            mostrarError("El correo electrónico no es válido");
            inputEmail.focus();
            return;
        }

        if (!regexPassword.test(password)) {
            mostrarError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
            inputPassword.focus();
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (!usuario) {
            return mostrarError("Correo o contraseña incorrectos.");
        }

        // 🟢 Guardamos el usuario logueado en sessionStorage
        sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

        // Aquí guardamos una cookie con el último usuario.
        setCookie("ultimoUsuario", usuario.nombre, 7);


        // Mostramos que es correcto.
        mostrarOk("Inicio de sesión correcto ✅");
        // Redirigir después de 1 segundo
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 500);
    });

    // Botón "Registrarse" que lleva a la página de registro
    botonRegistrarse.addEventListener("click", () => {
        window.location.href = "../html/registro.html";
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
