class Grafica extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW,memoriaVram,tipoMemoria,nucleosCuda,fabricante,tamano,rayTracing,dlss,libreriasCompatibles){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.memoriaVram = memoriaVram;
        this.tipoMemoria = tipoMemoria;
        this.nucleosCuda = nucleosCuda;
        this.fabricante = fabricante;
        this.tamano = tamano;
        this.rayTracing = rayTracing;
        this.dlss = dlss;
        this.libreriasCompatibles = libreriasCompatibles;
    }
}