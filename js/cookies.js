/**
 * cookies.js
 * Funciones auxiliares para gestionar cookies del navegador
 * (crear, leer y eliminar).
 */

// Crear una cookie
export function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
  const expira = "expires=" + fecha.toUTCString();
  document.cookie = `${nombre}=${valor}; ${expira}; path=/`;
}

// Leer una cookie
export function getCookie(nombre) {
  const nameEQ = nombre + "=";
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

// Borrar una cookie
export function deleteCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
