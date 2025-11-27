//Funciones auxiliares para gestionar cookies del navegador(crear, leer y eliminar).

// Crear una cookie
export function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
  const expira = "expires=" + fecha.toUTCString();
  document.cookie = `${nombre}=${valor}; ${expira}; path=/`;
}
// path=/ nos indica que las cookies son validas para todas las rutas

/* Leer una cookie (Se busca retornar el nombre del usuario, con indexOf comprobamos si
 hay coincidencia con "ultimoUsuario=" y despues se retorna lo restante a partir del = ,
 es decir el nombre.
*/
export function getCookie(nombre) {
  const nombreConIgual = nombre + "=";
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(nombreConIgual) === 0) return c.substring(nombreConIgual.length);
  }
  return null;
}

// Borrar una cookie (Reescribe la cookie con el mismo nombre con valor
//  vacio y una fecha ya pasada para que el navegador la elimine automaticamente)
export function deleteCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
