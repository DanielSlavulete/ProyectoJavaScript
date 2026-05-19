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
    "login.no-account": "¿No tienes cuenta?",
    "login.register-link": "Registrarse",

    "register.title": "Crear cuenta",
    "register.name": "Nombre completo",
    "register.email": "Correo electrónico",
    "register.phone": "Teléfono",
    "register.password": "Contraseña",
    "register.repeat-password": "Repetir contraseña",
    "register.policy": "He leído y acepto la política de privacidad",
    "register.button": "Crear cuenta",
    "register.have-account": "¿Ya tienes cuenta?",
    "register.login-link": "Inicia sesión",

    "index.featured": "Productos destacados",

    "cart.title": "Tu carrito",
    "cart.summary": "Resumen",
    "cart.total-items": "Total artículos:",
    "cart.total-price": "Total a pagar:",
    "cart.empty-btn": "Vaciar carrito",
    "cart.price": "Precio",
    "cart.amount": "Cantidad",
    "cart.remove": "🗑 Quitar",

    "profile.title": "Mi perfil",
    "profile.subtitle": "Consulta tus datos de usuario y accede rápidamente a tu carrito.",
    "profile.cart-btn": "Ir al carrito",
    "profile.logout-btn": "Cerrar sesión",
    "profile.edit-btn": "Editar perfil",
    "profile.delete-btn": "Eliminar cuenta",
    "profile.save-btn": "Guardar cambios",
    "profile.cancel-btn": "Cancelar",
    "profile.name-label": "Nombre",
    "profile.email-label": "Email",
    "profile.phone-label": "Teléfono",

    "admin.title": "Panel de administración",
    "admin.create": "Crear producto",
    "admin.name": "Nombre",
    "admin.description": "Descripción",
    "admin.image": "Imagen",
    "admin.image-placeholder": "Nombre de imagen (ej: rtx4060.jpg)",
    "admin.price": "Precio",
    "admin.type": "Tipo",
    "admin.type-placeholder": "Tipo (GPU, CPU, RAM...)",
    "admin.specs": "Especificaciones",
    "admin.specs-placeholder": "Especificaciones (ej:\nnucleos: 8\nfrecuencia: 4.2 GHz\nsocket: AM5)",
    "admin.discount": "Descuento (%)",
    "admin.discount-table": "Descuento",
    "admin.video": "URL del vídeo",
    "admin.save-btn": "Guardar producto",
    "admin.cancel-btn": "Cancelar",
    "admin.products": "Productos",
    "admin.edit-btn": "Editar",
    "admin.delete-btn": "Borrar",
    "admin.actions": "Acciones",

    "contact.title": "Contacto",
    "contact.text": "Si necesitas información sobre compatibilidad de componentes, seguimiento de pedidos, recomendaciones técnicas o asistencia general, el equipo de MGS Components está disponible para ayudarte. Puedes contactar con nosotros a través de los siguientes canales:",
    "contact.text2": "Nuestro objetivo es ofrecer una atención rápida y clara, garantizando que recibas la información necesaria para sacar el máximo rendimiento a tus configuraciones y compras. No dudes en consultarnos cualquier duda.",
    "contact.email-title": "📧 Email",
    "contact.phone-title": "📞 Teléfono",
    "contact.address-title": "🏢 Dirección",
    "contact.address": "Servicios Online – España",

    "about.title": "Sobre nosotros",
    "about.team": "El equipo",
    "about.dani": "Especialista en diseño, usabilidad y estructura visual. Encargado de la experiencia del usuario y la arquitectura de la interfaz.",
    "about.fran": "Responsable de integración de datos, lógica funcional y optimización del rendimiento. Centrado en mantener la estabilidad del sistema.",
    "about.sergio": "Desarrollador principal del núcleo del proyecto, gestión de componentes y comunicación entre módulos. Coordinador técnico del equipo.",

    "footer.copyright": "© 2025 Tienda de Componentes. Todos los derechos reservados.",
    "footer.contact": "Contacto",
    "footer.about": "Sobre nosotros",

    // Detalle del producto
    "product.name-Procesador": "Procesador",
    "product.name-Grafica": "Tarjeta Gráfica",
    "product.name-Placa Base": "Placa Base",
    "product.name-Memoria RAM": "Memoria RAM",
    "product.name-Disco Duro": "Disco Duro",
    "product.name-Teclado": "Teclado",
    "product.name-Raton": "Ratón",
    "product.name-Auriculares": "Auriculares",

    "product.video": "Vídeo del producto",
    "product.add-cart": "🛒 Añadir al carrito",
    "product.back": "⬅ Volver",
    "product.specs": "Especificaciones",

    // Descripciones de productos
    "desc.ryzen7800x3d": "Procesador de alto rendimiento para gaming con tecnología 3D V-Cache.",
    "desc.i7_13700k": "Potente CPU híbrida para tareas exigentes y juegos de última generación.",
    "desc.ryzen5600": "Procesador de 6 núcleos ideal para gaming y productividad diaria.",
    "desc.rtx4070ti": "Tarjeta gráfica de última generación con DLSS 3 y trazado de rayos.",
    "desc.rx7900xt": "GPU de alto rendimiento para resoluciones 4K y tareas de IA.",
    "desc.rtx4060": "Tarjeta gráfica eficiente ideal para 1080p y 1440p.",
    "desc.asus_b650e_f": "Placa base para procesadores AMD Ryzen 7000 con soporte PCIe 5.0.",
    "desc.msi_z790_tomahawk": "Placa base Intel con soporte DDR5 y conectividad avanzada.",
    "desc.b550_aorus_elite": "Excelente placa base para equipos AMD de gama media.",
    "desc.corsair_ddr5": "Memoria RAM de alto rendimiento con iluminación RGB.",
    "desc.kingston_fury": "RAM confiable y rápida para equipos de gama media.",
    "desc.trident_z5": "Kit de RAM ideal para creadores y jugadores exigentes.",
    "desc.samsung_990pro": "SSD ultrarrápido para gaming y productividad extrema.",
    "desc.crucial_mx500": "SSD SATA confiable y de gran capacidad.",
    "desc.seagate_barracuda": "Disco duro mecánico para almacenamiento masivo.",
    "desc.corsair_k70": "Teclado mecánico profesional con switches Cherry MX Red.",
    "desc.razer_cynosa_v2": "Teclado gaming de membrana con iluminación personalizable.",
    "desc.razer_deathadder_v3pro": "Ratón inalámbrico ultraligero para eSports.",
    "desc.steelseries_rival5": "Ratón versátil con 9 botones y sensor TrueMove Air.",
    "desc.hyperx_cloud2": "Auriculares con sonido envolvente 7.1 y gran comodidad.",
    "desc.razer_blackshark_v2pro": "Auriculares inalámbricos con sonido THX y micrófono extraíble.",

    // Especificaciones comunes
    "spec.nucleos": "Núcleos",
    "spec.hilos": "Hilos",
    "spec.frecuencia_base": "Frecuencia base",
    "spec.frecuencia_turbo": "Frecuencia turbo",
    "spec.cache": "Caché",
    "spec.socket": "Socket",
    "spec.tdp": "TDP",
    "spec.vram": "VRAM",
    "spec.bus": "Bus",
    "spec.frecuencia": "Frecuencia",
    "spec.consumo": "Consumo",
    "spec.chipset": "Chipset",
    "spec.memoria": "Memoria",
    "spec.formato": "Formato",
    "spec.capacidad": "Capacidad",
    "spec.velocidad": "Velocidad",
    "spec.latencia": "Latencia",
    "spec.tipo": "Tipo",
    "spec.velocidad_lectura": "Velocidad lectura",
    "spec.interfaz": "Interfaz",
    "spec.conectividad": "Conectividad",
    "spec.switches": "Switches",
    "spec.retroiluminacion": "Retroiluminación",
    "spec.dpi": "DPI",
    "spec.peso": "Peso",
    "spec.botones": "Botones",
    "spec.microfono": "Micrófono",
    "spec.sonido": "Sonido",
    "spec.autonomia": "Autonomía",
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
    "login.no-account": "Don't have an account?",
    "login.register-link": "Register",

    "register.title": "Create account",
    "register.name": "Full name",
    "register.email": "Email",
    "register.phone": "Phone",
    "register.password": "Password",
    "register.repeat-password": "Repeat password",
    "register.policy": "I have read and accept the privacy policy",
    "register.button": "Create account",
    "register.have-account": "Already have an account?",
    "register.login-link": "Log in",

    "index.featured": "Featured products",

    "cart.title": "Your cart",
    "cart.summary": "Summary",
    "cart.total-items": "Total items:",
    "cart.total-price": "Total to pay:",
    "cart.empty-btn": "Empty cart",
    "cart.price": "Price",
    "cart.amount": "Amount",
    "cart.remove": "🗑 Remove",

    "profile.title": "My profile",
    "profile.subtitle": "Check your user data and quickly access your cart.",
    "profile.cart-btn": "Go to cart",
    "profile.logout-btn": "Log out",
    "profile.edit-btn": "Edit profile",
    "profile.delete-btn": "Delete account",
    "profile.save-btn": "Save changes",
    "profile.cancel-btn": "Cancel",
    "profile.name-label": "Name",
    "profile.email-label": "Email",
    "profile.phone-label": "Phone",

    "admin.title": "Admin panel",
    "admin.create": "Create product",
    "admin.name": "Name",
    "admin.description": "Description",
    "admin.image": "Image",
    "admin.image-placeholder": "Image name (e.g., rtx4060.jpg)",
    "admin.price": "Price",
    "admin.type": "Type",
    "admin.type-placeholder": "Type (GPU, CPU, RAM...)",
    "admin.specs": "Specifications",
    "admin.specs-placeholder": "Specifications (e.g.,\ncores: 8\nfrequency: 4.2 GHz\nsocket: AM5)",
    "admin.discount": "Discount (%)",
    "admin.discount-table": "Discount",
    "admin.video": "Video URL",
    "admin.save-btn": "Save product",
    "admin.cancel-btn": "Cancel",
    "admin.products": "Products",
    "admin.edit-btn": "Edit",
    "admin.delete-btn": "Delete",
    "admin.actions": "Actions",

    "contact.title": "Contact",
    "contact.text": "If you need information on component compatibility, order tracking, technical recommendations, or general support, the MGS Components team is available to help. You can contact us through the following channels:",
    "contact.text2": "Our goal is to provide fast and clear support, ensuring you receive the information you need to get the most out of your setups and purchases. Don't hesitate to contact us with any questions.",
    "contact.email-title": "📧 Email",
    "contact.phone-title": "📞 Phone",
    "contact.address-title": "🏢 Address",
    "contact.address": "Online Services – Spain",

    "about.title": "About us",
    "about.team": "The team",
    "about.dani": "Specialist in design, usability, and visual structure. Responsible for user experience and interface architecture.",
    "about.fran": "Responsible for data integration, functional logic, and performance optimization. Focused on maintaining system stability.",
    "about.sergio": "Lead developer of the project core, component management, and inter-module communication. Technical coordinator of the team.",

    "footer.copyright": "© 2025 Components Store. All rights reserved.",
    "footer.contact": "Contact",
    "footer.about": "About us",

    // Detalle del producto
    "product.name-Procesador": "Processor",
    "product.name-Grafica": "Graphics Card",
    "product.name-Placa Base": "Motherboard",
    "product.name-Memoria RAM": "RAM Memory",
    "product.name-Disco Duro": "Hard Drive",
    "product.name-Teclado": "Keyboard",
    "product.name-Raton": "Mouse",
    "product.name-Auriculares": "Headphones",

    "product.video": "Product video",
    "product.add-cart": "🛒 Add to cart",
    "product.back": "⬅ Back",
    "product.specs": "Specifications",

    // Descripciones de productos
    "desc.ryzen7800x3d": "High-performance gaming processor with 3D V-Cache technology.",
    "desc.i7_13700k": "Powerful hybrid CPU for demanding tasks and next-gen gaming.",
    "desc.ryzen5600": "6-core processor ideal for gaming and daily productivity.",
    "desc.rtx4070ti": "Latest generation graphics card with DLSS 3 and ray tracing.",
    "desc.rx7900xt": "High-performance GPU for 4K resolutions and AI tasks.",
    "desc.rtx4060": "Efficient graphics card ideal for 1080p and 1440p.",
    "desc.asus_b650e_f": "Motherboard for AMD Ryzen 7000 processors with PCIe 5.0 support.",
    "desc.msi_z790_tomahawk": "Intel motherboard with DDR5 support and advanced connectivity.",
    "desc.b550_aorus_elite": "Excellent motherboard for mid-range AMD builds.",
    "desc.corsair_ddr5": "High-performance RAM with RGB lighting.",
    "desc.kingston_fury": "Reliable and fast RAM for mid-range builds.",
    "desc.trident_z5": "RAM kit ideal for creators and demanding gamers.",
    "desc.samsung_990pro": "Ultra-fast SSD for gaming and extreme productivity.",
    "desc.crucial_mx500": "Reliable SATA SSD with large capacity.",
    "desc.seagate_barracuda": "Mechanical hard drive for mass storage.",
    "desc.corsair_k70": "Professional mechanical keyboard with Cherry MX Red switches.",
    "desc.razer_cynosa_v2": "Gaming membrane keyboard with customizable lighting.",
    "desc.razer_deathadder_v3pro": "Ultra-light wireless mouse for eSports.",
    "desc.steelseries_rival5": "Versatile mouse with 9 buttons and TrueMove Air sensor.",
    "desc.hyperx_cloud2": "Headset with 7.1 surround sound and great comfort.",
    "desc.razer_blackshark_v2pro": "Wireless headset with THX sound and detachable microphone.",

    // Especificaciones comunes
    "spec.nucleos": "Cores",
    "spec.hilos": "Threads",
    "spec.frecuencia_base": "Base frequency",
    "spec.frecuencia_turbo": "Turbo frequency",
    "spec.cache": "Cache",
    "spec.socket": "Socket",
    "spec.tdp": "TDP",
    "spec.vram": "VRAM",
    "spec.bus": "Bus",
    "spec.frecuencia": "Frequency",
    "spec.consumo": "Power consumption",
    "spec.chipset": "Chipset",
    "spec.memoria": "Memory",
    "spec.formato": "Form factor",
    "spec.capacidad": "Capacity",
    "spec.velocidad": "Speed",
    "spec.latencia": "Latency",
    "spec.tipo": "Type",
    "spec.velocidad_lectura": "Read speed",
    "spec.interfaz": "Interface",
    "spec.conectividad": "Connectivity",
    "spec.switches": "Switches",
    "spec.retroiluminacion": "Backlight",
    "spec.dpi": "DPI",
    "spec.peso": "Weight",
    "spec.botones": "Buttons",
    "spec.microfono": "Microphone",
    "spec.sonido": "Sound",
    "spec.autonomia": "Battery life",
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

window.addEventListener("idioma-cambiado", () => {
  aplicarTraducciones();
});