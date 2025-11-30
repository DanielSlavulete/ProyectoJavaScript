const CLAVE_CARRITO = "carrito";

// Leer carrito de localStorage
export function obtenerCarrito() {
    try {
        const datos = localStorage.getItem(CLAVE_CARRITO);
        return datos ? JSON.parse(datos) : [];
    } catch (e) {
        console.error("Error leyendo carrito", e);
        return [];
    }
}

// Guardar carrito en localStorage
export function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Añadir un producto al carrito
export function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
        existente.cantidad += producto.cantidad || 1;
    } else {
        carrito.push({ ...producto, cantidad: producto.cantidad || 1 });
    }

    guardarCarrito(carrito);

    // Avisar al header para actualizar el numerito
    // Acciona el evento para que desde el menu lo sepa y lo actualice
    window.dispatchEvent(new CustomEvent("carrito-cambiado"));
}