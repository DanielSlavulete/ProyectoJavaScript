const productos = [

    // PROCESADORES
    new Producto(
        1,
        "AMD Ryzen 7 7800X3D",
        "Procesador de alto rendimiento para gaming con tecnología 3D V-Cache.",
        "ryzen7800x3d.jpg",
        439.99,
        "Procesador",
        { nucleos: 8, hilos: 16, frecuencia_base: "4.2 GHz", frecuencia_turbo: "5.0 GHz", cache: "96 MB", socket: "AM5", tdp: "120W" }
    ),
    new Producto(
        2,
        "Intel Core i7-13700K",
        "Potente CPU híbrida para tareas exigentes y juegos de última generación.",
        "i7_13700k.jpg",
        419.99,
        "Procesador",
        { nucleos: 16, hilos: 24, frecuencia_base: "3.4 GHz", frecuencia_turbo: "5.4 GHz", cache: "30 MB", socket: "LGA1700", tdp: "125W" }
    ),
    new Producto(
        3,
        "AMD Ryzen 5 5600",
        "Procesador de 6 núcleos ideal para gaming y productividad diaria.",
        "ryzen5600.jpg",
        179.99,
        "Procesador",
        { nucleos: 6, hilos: 12, frecuencia_base: "3.5 GHz", frecuencia_turbo: "4.4 GHz", cache: "35 MB", socket: "AM4", tdp: "65W" }
    ),

    // TARJETAS GRÁFICAS
    new Producto(
        4,
        "NVIDIA GeForce RTX 4070 Ti",
        "Tarjeta gráfica de última generación con DLSS 3 y trazado de rayos.",
        "rtx4070ti.jpg",
        829.99,
        "Gráfica",
        { vram: "12 GB GDDR6X", bus: "192-bit", frecuencia: "2.6 GHz", conectores: "1x HDMI, 3x DisplayPort", consumo: "285W" }
    ),
    new Producto(
        5,
        "AMD Radeon RX 7900 XT",
        "GPU de alto rendimiento para resoluciones 4K y tareas de IA.",
        "rx7900xt.jpg",
        899.99,
        "Gráfica",
        { vram: "20 GB GDDR6", bus: "320-bit", frecuencia: "2.5 GHz", conectores: "2x HDMI, 2x DisplayPort", consumo: "300W" }
    ),
    new Producto(
        6,
        "NVIDIA GeForce RTX 4060",
        "Tarjeta gráfica eficiente y moderna ideal para 1080p y 1440p.",
        "rtx4060.jpg",
        349.99,
        "Gráfica",
        { vram: "8 GB GDDR6", bus: "128-bit", frecuencia: "2.5 GHz", conectores: "1x HDMI, 3x DisplayPort", consumo: "160W" }
    ),

    // PLACAS BASE
    new Producto(
        7,
        "ASUS ROG STRIX B650E-F",
        "Placa base para procesadores AMD Ryzen 7000 con soporte PCIe 5.0.",
        "asus_b650e_f.jpg",
        259.99,
        "Placa Base",
        { socket: "AM5", chipset: "B650E", memoria: "DDR5 hasta 128 GB", puertos: "PCIe 5.0, USB-C, WiFi 6E", formato: "ATX" }
    ),
    new Producto(
        8,
        "MSI MAG Z790 TOMAHAWK WIFI",
        "Placa base Intel con soporte DDR5 y conectividad avanzada.",
        "msi_z790_tomahawk.jpg",
        299.99,
        "Placa Base",
        { socket: "LGA1700", chipset: "Z790", memoria: "DDR5 hasta 192 GB", puertos: "PCIe 5.0, 2.5G LAN, WiFi 6E", formato: "ATX" }
    ),
    new Producto(
        9,
        "Gigabyte B550 AORUS ELITE V2",
        "Excelente placa base para equipos AMD de gama media.",
        "b550_aorus_elite.jpg",
        139.99,
        "Placa Base",
        { socket: "AM4", chipset: "B550", memoria: "DDR4 hasta 128 GB", puertos: "PCIe 4.0, M.2, HDMI", formato: "ATX" }
    ),

    // MEMORIAS RAM
    new Producto(
        10,
        "Corsair Vengeance RGB 32GB DDR5",
        "Memoria RAM de alto rendimiento con iluminación RGB.",
        "corsair_ddr5.jpg",
        169.99,
        "Memoria RAM",
        { capacidad: "32 GB (2x16GB)", velocidad: "6000 MHz", tipo: "DDR5", latencia: "CL36", voltaje: "1.35V" }
    ),
    new Producto(
        11,
        "Kingston Fury Beast 16GB DDR4",
        "RAM confiable y rápida para equipos de gama media.",
        "kingston_fury.jpg",
        54.99,
        "Memoria RAM",
        { capacidad: "16 GB (2x8GB)", velocidad: "3200 MHz", tipo: "DDR4", latencia: "CL16", voltaje: "1.35V" }
    ),
    new Producto(
        12,
        "G.Skill Trident Z5 RGB 64GB DDR5",
        "Kit de RAM de alto rendimiento ideal para creadores y jugadores exigentes.",
        "trident_z5.jpg",
        319.99,
        "Memoria RAM",
        { capacidad: "64 GB (2x32GB)", velocidad: "6400 MHz", tipo: "DDR5", latencia: "CL32", voltaje: "1.4V" }
    ),

    // DISCOS DUROS / SSD
    new Producto(
        13,
        "Samsung 990 PRO 1TB NVMe",
        "SSD ultrarrápido para gaming y productividad extrema.",
        "samsung_990pro.jpg",
        149.99,
        "Disco Duro",
        { tipo: "SSD NVMe", capacidad: "1 TB", velocidad_lectura: "7450 MB/s", velocidad_escritura: "6900 MB/s", interfaz: "PCIe 4.0" }
    ),
    new Producto(
        14,
        "Crucial MX500 1TB",
        "SSD SATA confiable y de gran capacidad.",
        "crucial_mx500.jpg",
        69.99,
        "Disco Duro",
        { tipo: "SSD SATA", capacidad: "1 TB", velocidad_lectura: "560 MB/s", velocidad_escritura: "510 MB/s", interfaz: "SATA III" }
    ),
    new Producto(
        15,
        "Seagate Barracuda 2TB",
        "Disco duro mecánico de alto rendimiento para almacenamiento masivo.",
        "seagate_barracuda.jpg",
        59.99,
        "Disco Duro",
        { tipo: "HDD", capacidad: "2 TB", velocidad: "7200 rpm", cache: "256 MB", interfaz: "SATA III" }
    ),

    // ⌨TECLADOS
    new Producto(
        16,
        "Logitech G915 TKL",
        "Teclado mecánico inalámbrico con switches de perfil bajo.",
        "logitech_g915.jpg",
        219.99,
        "Teclado",
        { tipo: "Mecánico", conectividad: "Bluetooth / Lightspeed", retroiluminacion: "RGB", switches: "GL Tactile", formato: "TKL" }
    ),
    new Producto(
        17,
        "Corsair K70 RGB MK.2",
        "Teclado mecánico profesional con switches Cherry MX Red.",
        "corsair_k70.jpg",
        149.99,
        "Teclado",
        { tipo: "Mecánico", conectividad: "USB", retroiluminacion: "RGB", switches: "Cherry MX Red", formato: "Full-size" }
    ),
    new Producto(
        18,
        "Razer Cynosa V2",
        "Teclado gaming de membrana con iluminación personalizable.",
        "razer_cynosa_v2.jpg",
        69.99,
        "Teclado",
        { tipo: "Membrana", conectividad: "USB", retroiluminacion: "RGB", macros: "Programables", formato: "Full-size" }
    ),

    // RATONES
    new Producto(
        19,
        "Logitech G502 HERO",
        "Ratón ergonómico con sensor HERO 25K y 11 botones programables.",
        "logitech_g502.jpg",
        69.99,
        "Ratón",
        { tipo: "Óptico", dpi: "25,600", conectividad: "Cable USB", botones: 11, peso_ajustable: true }
    ),
    new Producto(
        20,
        "Razer DeathAdder V3 Pro",
        "Ratón inalámbrico ultraligero para eSports.",
        "razer_deathadder_v3pro.jpg",
        159.99,
        "Ratón",
        { tipo: "Óptico", dpi: "30,000", conectividad: "Inalámbrico", peso: "63 g", bateria: "90h" }
    ),
    new Producto(
        21,
        "SteelSeries Rival 5",
        "Ratón versátil con 9 botones y sensor TrueMove Air.",
        "steelseries_rival5.jpg",
        69.99,
        "Ratón",
        { tipo: "Óptico", dpi: "18,000", conectividad: "Cable USB", botones: 9, retroiluminacion: "RGB" }
    ),

    // AURICULARES
    new Producto(
        22,
        "HyperX Cloud II",
        "Auriculares con sonido envolvente 7.1 y gran comodidad.",
        "hyperx_cloud2.jpg",
        99.99,
        "Auriculares",
        { tipo: "Circumaural", microfono: "Desmontable", conectividad: "Jack 3.5mm / USB", sonido: "7.1 virtual", peso: "320g" }
    ),
    new Producto(
        23,
        "Razer BlackShark V2 Pro",
        "Auriculares inalámbricos con sonido THX y micrófono extraíble.",
        "razer_blackshark_v2pro.jpg",
        199.99,
        "Auriculares",
        { tipo: "Inalámbrico", microfono: "Extraíble", sonido: "THX Spatial Audio", autonomia: "24h", conectividad: "2.4GHz USB" }
    ),
    new Producto(
        24,
        "Logitech G435 Lightspeed",
        "Auriculares ligeros y sostenibles con conectividad dual.",
        "logitech_g435.jpg",
        79.99,
        "Auriculares",
        { tipo: "Inalámbrico / Bluetooth", peso: "165g", autonomia: "18h", microfono: "Integrado", sonido: "Estéreo" }
    )
];