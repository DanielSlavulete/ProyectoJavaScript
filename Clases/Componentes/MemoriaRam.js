class MemoriaRam extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW,tipo,memoriaInterna,frecuencia,latencia,rgb){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.tipo = tipo;
        this.memoriaInterna = memoriaInterna;
        this.frecuencia = frecuencia;
        this.latencia = latencia;
        this.rgb = rgb;
    }
}