export class Cliente {
  constructor(id, nombre, email, telefono, password) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
  }

  // Creamos metodos estaticos para que no se tenga que crear una instacia de cliente antes de validar.

  /*
   *   Valida que el nombre:
   * - Contenga solo letras (mayúsculas/minúsculas) y espacios
   * - Permita caracteres con tilde o diéresis (Á, é, ü, ñ, etc.)
   * - Tenga al menos 2 caracteres
   */
  static validarNombre(nombre) {
    const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,}$/;
    return regex.test(nombre);
  }

  /*
   *   Valida que el email tenga formato correcto:
   * - Debe tener texto antes del @ (sin espacios)
   * - Debe incluir un dominio y una extensión (por ejemplo .com, .es)
   */
  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /*
   *   Valida que la contraseña cumpla los requisitos mínimos de seguridad:
   * - Al menos 8 caracteres
   * - Debe incluir una letra minúscula
   * - Debe incluir una letra mayúscula
   * - Debe incluir al menos un número
   */
  static validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  /*
   * Devuelve la información del cliente en formato HTML.
   * Puede usarse, por ejemplo, en la página de perfil.
   */
  mostrarInfo() {
    return `
      Nombre: ${this.nombre}<br>
      Email: ${this.email}<br>
      Teléfono: ${this.telefono}<br>
    `;
  }
}
