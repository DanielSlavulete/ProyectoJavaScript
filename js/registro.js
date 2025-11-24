document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("formRegistro");
    const inputNombre = document.getElementById("nombreCrearCuenta");
    const inputEmail = document.getElementById("correoCrearCuenta");
    const inputPassword = document.getElementById("contrasenaCrearCuenta");
    const inputPassword2 = document.getElementById("repetirContrasena");
    const radioPolitica = document.getElementById("radioAceptarPolitica");
    const mensaje = document.getElementById("mensajeRegistro");

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        limpiarMensaje();

        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();
        const password2 = inputPassword2.value.trim();
        const aceptaPolitica = radioPolitica.checked;

        // Se comprueban los campos vacíos
        if (!nombre || !email || !password || !password2) {
        return mostrarError("Debes rellenar todos los campos.");
        }

        const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,}$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!regexNombre.test(nombre)) {
            return mostrarError("El nombre debe tener al menos 2 letras y solo letras/espacios.");
        }

        if (!regexEmail.test(email)) {
            return mostrarError("El correo electrónico no es válido.");
        }

        if (!regexPassword.test(password)) {
            return mostrarError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.");
        }

        if (password !== password2) {
            return mostrarError("Las contraseñas no coinciden.");
        }

        if (!aceptaPolitica) {
            return mostrarError("Debes aceptar la política de privacidad.");
        }

        // Si todo es correcto, guardamos el usuario en localStorage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Comprobar que el correo no exista ya
        const yaExiste = usuarios.some(u => u.email === email);
        if (yaExiste) {
            return mostrarError("Ya existe un usuario registrado con ese correo.");
        }

        const nuevoUsuario = {
            id: Date.now(),
            nombre,
            email,
            password
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mostrarOk("Cuenta creada correctamente ✅ Redirigiendo al login...");

        setTimeout(() => {
            window.location.href = "./login.html";
        }, 1500);
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
