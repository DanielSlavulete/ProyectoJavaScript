const traducciones = {
  es: {
    "nav.login": "Iniciar sesión",
    "nav.register": "Registrarse",
    "nav.profile": "Mi perfil",
    "nav.cart": "Carrito",
    "nav.logout": "Cerrar sesión",

    "login.title": "Iniciar sesión",
    "login.email": "Correo electrónico",
    "login.password": "Contraseña",
    "login.forgot": "¿Has olvidado tu contraseña?",
    "login.button": "Iniciar sesión",
    "login.register": "Registrarse",

    "footer.contact": "Contacto",
    "footer.about": "Sobre nosotros"
  },

  en: {
    "nav.login": "Log in",
    "nav.register": "Register",
    "nav.profile": "My profile",
    "nav.cart": "Cart",
    "nav.logout": "Log out",

    "login.title": "Log in",
    "login.email": "Email",
    "login.password": "Password",
    "login.forgot": "Forgot your password?",
    "login.button": "Log in",
    "login.register": "Register",

    "footer.contact": "Contact",
    "footer.about": "About us"
  }
};

function detectarIdioma() {
  const idiomaGuardado = localStorage.getItem("idioma");

  if (idiomaGuardado) {
    return idiomaGuardado;
  }

  const idiomasNavegador = navigator.languages || [navigator.language];

  const idiomaEncontrado = idiomasNavegador.find(idioma =>
    idioma.startsWith("es") || idioma.startsWith("en")
  );

  if (!idiomaEncontrado) {
    return "es";
  }

  return idiomaEncontrado.startsWith("en") ? "en" : "es";
}

export function obtenerIdiomaActual() {
  return detectarIdioma();
}

export function cambiarIdioma(idioma) {
  localStorage.setItem("idioma", idioma);
  aplicarTraducciones();
}

export function traducir(clave) {
  const idioma = obtenerIdiomaActual();
  return traducciones[idioma]?.[clave] || traducciones.es[clave] || clave;
}

export function aplicarTraducciones() {
  const idioma = obtenerIdiomaActual();

  document.documentElement.lang = idioma;

  document.querySelectorAll("[data-i18n]").forEach(elemento => {
    const clave = elemento.dataset.i18n;
    elemento.textContent = traducciones[idioma]?.[clave] || clave;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(elemento => {
    const clave = elemento.dataset.i18nPlaceholder;
    elemento.placeholder = traducciones[idioma]?.[clave] || clave;
  });
}

document.addEventListener("DOMContentLoaded", aplicarTraducciones);