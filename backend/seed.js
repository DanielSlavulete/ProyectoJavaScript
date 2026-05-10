const mongoose = require('mongoose');
const Producto = require('./models/Producto');

const MONGO_URI = 'mongodb://admin:admin123@localhost:27018/tiendaPC?authSource=admin';

const productos = [
  { nombre: "Procesador AMD Ryzen 7 7800X3D", descripcion: "Procesador de alto rendimiento para gaming con tecnología 3D V-Cache.", imagen: "ryzen7800x3d.jpg", precio: 439.99, tipo: "Procesador", especificaciones: { nucleos: 8, hilos: 16, frecuencia_base: "4.2 GHz", frecuencia_turbo: "5.0 GHz", cache: "96 MB", socket: "AM5", tdp: "120W" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/flBDY241b_E" },
  { nombre: "Procesador Intel Core i7-13700K", descripcion: "Potente CPU híbrida para tareas exigentes y juegos de última generación.", imagen: "i7_13700k.jpg", precio: 419.99, tipo: "Procesador", especificaciones: { nucleos: 16, hilos: 24, frecuencia_base: "3.4 GHz", frecuencia_turbo: "5.4 GHz", cache: "30 MB", socket: "LGA1700", tdp: "125W" }, descuento: 15, urlVideo: "https://www.youtube.com/embed/6Tm9_i4LiQo" },
  { nombre: "Procesador AMD Ryzen 5 5600", descripcion: "Procesador de 6 núcleos ideal para gaming y productividad diaria.", imagen: "ryzen5600.jpg", precio: 179.99, tipo: "Procesador", especificaciones: { nucleos: 6, hilos: 12, frecuencia_base: "3.5 GHz", frecuencia_turbo: "4.4 GHz", cache: "35 MB", socket: "AM4", tdp: "65W" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/wkH_FbB8_58" },
  { nombre: "Tarjeta Gráfica ASUS ROG Strix GeForce RTX 4070 Ti", descripcion: "Tarjeta gráfica de última generación con DLSS 3 y trazado de rayos.", imagen: "rtx4070ti.jpg", precio: 829.99, tipo: "Grafica", especificaciones: { vram: "12 GB GDDR6X", bus: "192-bit", frecuencia: "2.6 GHz", consumo: "285W" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/4AS7Ojry4-U" },
  { nombre: "Tarjeta Gráfica Sapphire Pulse AMD Radeon RX 7900 XT", descripcion: "GPU de alto rendimiento para resoluciones 4K y tareas de IA.", imagen: "rx7900xt.jpg", precio: 899.99, tipo: "Grafica", especificaciones: { vram: "20 GB GDDR6", bus: "320-bit", frecuencia: "2.5 GHz", consumo: "300W" }, descuento: 5, urlVideo: "https://www.youtube.com/embed/UZtyBFHtiDA" },
  { nombre: "Tarjeta Gráfica ASUS TUF Gaming GeForce RTX 4060 Ti", descripcion: "Tarjeta gráfica eficiente ideal para 1080p y 1440p.", imagen: "rtx4060.jpg", precio: 349.99, tipo: "Grafica", especificaciones: { vram: "8 GB GDDR6", bus: "128-bit", frecuencia: "2.5 GHz", consumo: "160W" }, descuento: 20, urlVideo: "https://www.youtube.com/embed/1b3b0qJ_KHI" },
  { nombre: "Placa Base ASUS ROG STRIX B650E-F", descripcion: "Placa base para procesadores AMD Ryzen 7000 con soporte PCIe 5.0.", imagen: "asus_b650e_f.jpg", precio: 259.99, tipo: "Placa Base", especificaciones: { socket: "AM5", chipset: "B650E", memoria: "DDR5 hasta 128 GB", formato: "ATX" }, descuento: 45, urlVideo: "https://www.youtube.com/embed/E-xTjuDqsr4" },
  { nombre: "Placa Base MSI MAG Z790 TOMAHAWK MAX WIFI", descripcion: "Placa base Intel con soporte DDR5 y conectividad avanzada.", imagen: "msi_z790_tomahawk.jpg", precio: 299.99, tipo: "Placa Base", especificaciones: { socket: "LGA1700", chipset: "Z790", memoria: "DDR5 hasta 192 GB", formato: "ATX" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/WQsNIGpJ2Us" },
  { nombre: "Placa Base Gigabyte B550 AORUS ELITE V2", descripcion: "Excelente placa base para equipos AMD de gama media.", imagen: "b550_aorus_elite.jpg", precio: 139.99, tipo: "Placa Base", especificaciones: { socket: "AM4", chipset: "B550", memoria: "DDR4 hasta 128 GB", formato: "ATX" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/Qh8BbvED2Fc" },
  { nombre: "Memoria RAM Corsair Vengeance RGB 32GB DDR5 6000MHz", descripcion: "Memoria RAM de alto rendimiento con iluminación RGB.", imagen: "corsair_ddr5.jpg", precio: 169.99, tipo: "Memoria RAM", especificaciones: { capacidad: "32 GB", velocidad: "6000 MHz", tipo: "DDR5", latencia: "CL36" }, descuento: 15, urlVideo: "https://www.youtube.com/embed/epKYZrish5E" },
  { nombre: "Memoria RAM Kingston FURY Beast RGB DDR4 16GB", descripcion: "RAM confiable y rápida para equipos de gama media.", imagen: "kingston_fury.jpg", precio: 54.99, tipo: "Memoria RAM", especificaciones: { capacidad: "16 GB", velocidad: "3200 MHz", tipo: "DDR4", latencia: "CL16" }, descuento: 18, urlVideo: "https://www.youtube.com/embed/7cD33E6FiT8" },
  { nombre: "Memoria RAM G.Skill Trident Z5 RGB 64GB DDR5", descripcion: "Kit de RAM ideal para creadores y jugadores exigentes.", imagen: "trident_z5.jpg", precio: 319.99, tipo: "Memoria RAM", especificaciones: { capacidad: "64 GB", velocidad: "6400 MHz", tipo: "DDR5", latencia: "CL32" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/yUeE4NmMj48" },
  { nombre: "SSD Samsung 990 PRO 1TB NVMe", descripcion: "SSD ultrarrápido para gaming y productividad extrema.", imagen: "samsung_990pro.jpg", precio: 149.99, tipo: "Disco Duro", especificaciones: { tipo: "SSD NVMe", capacidad: "1 TB", velocidad_lectura: "7450 MB/s", interfaz: "PCIe 4.0" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/k1D30x_0EO8" },
  { nombre: "SSD Crucial MX500 1TB", descripcion: "SSD SATA confiable y de gran capacidad.", imagen: "crucial_mx500.jpg", precio: 69.99, tipo: "Disco Duro", especificaciones: { tipo: "SSD SATA", capacidad: "1 TB", velocidad_lectura: "560 MB/s", interfaz: "SATA III" }, descuento: 10, urlVideo: "https://www.youtube.com/embed/RGVxHV5AkQI" },
  { nombre: "Disco Duro Seagate Barracuda 2TB", descripcion: "Disco duro mecánico para almacenamiento masivo.", imagen: "seagate_barracuda.jpg", precio: 59.99, tipo: "Disco Duro", especificaciones: { tipo: "HDD", capacidad: "2 TB", velocidad: "7200 rpm", interfaz: "SATA III" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/kgLdQ4FL2oQ" },
  { nombre: "Teclado Corsair K70 RGB MK.2", descripcion: "Teclado mecánico profesional con switches Cherry MX Red.", imagen: "corsair_k70.jpg", precio: 149.99, tipo: "Teclado", especificaciones: { tipo: "Mecánico", conectividad: "USB", switches: "Cherry MX Red", formato: "Full-size" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/zYjyXKj6yP8" },
  { nombre: "Teclado Razer Cynosa V2", descripcion: "Teclado gaming de membrana con iluminación personalizable.", imagen: "razer_cynosa_v2.jpg", precio: 69.99, tipo: "Teclado", especificaciones: { tipo: "Membrana", conectividad: "USB", retroiluminacion: "RGB", formato: "Full-size" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/yy-S71PMeDg" },
  { nombre: "Ratón Razer DeathAdder V3 Pro", descripcion: "Ratón inalámbrico ultraligero para eSports.", imagen: "razer_deathadder_v3pro.jpg", precio: 159.99, tipo: "Raton", especificaciones: { tipo: "Óptico", dpi: "30,000", conectividad: "Inalámbrico", peso: "63g" }, descuento: 33, urlVideo: "https://www.youtube.com/embed/75c5z5jcMaI" },
  { nombre: "Ratón SteelSeries Rival 5", descripcion: "Ratón versátil con 9 botones y sensor TrueMove Air.", imagen: "steelseries_rival5.jpg", precio: 69.99, tipo: "Raton", especificaciones: { tipo: "Óptico", dpi: "18,000", conectividad: "Cable USB", botones: 9 }, descuento: 0, urlVideo: "https://www.youtube.com/embed/8rUbKL29Ujg" },
  { nombre: "Auriculares HyperX Cloud II", descripcion: "Auriculares con sonido envolvente 7.1 y gran comodidad.", imagen: "hyperx_cloud2.jpg", precio: 99.99, tipo: "Auriculares", especificaciones: { tipo: "Circumaural", microfono: "Desmontable", sonido: "7.1 virtual", peso: "320g" }, descuento: 0, urlVideo: "https://www.youtube.com/embed/LqZ54ZW__FU" },
  { nombre: "Auriculares Razer BlackShark V2 Pro", descripcion: "Auriculares inalámbricos con sonido THX y micrófono extraíble.", imagen: "razer_blackshark_v2pro.jpg", precio: 199.99, tipo: "Auriculares", especificaciones: { tipo: "Inalámbrico", microfono: "Extraíble", sonido: "THX Spatial Audio", autonomia: "24h" }, descuento: 25, urlVideo: "https://www.youtube.com/embed/PZHKnAqqmi8" }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Conectado a MongoDB');

  await Producto.deleteMany({});
  console.log('Colección limpiada');

  await Producto.insertMany(productos);
  console.log(`${productos.length} productos insertados`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
