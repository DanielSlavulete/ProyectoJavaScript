class Refrigeracion extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,especificaciones,consumoW,tipo,numeroVentiladores,nivelRuido,socketCompatible,materialBloque,rgb){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.tipo = tipo;
        this.numeroVentiladores = numeroVentiladores;
        this.nivelRuido = nivelRuido;
        this.socketCompatible = socketCompatible;
        this.materialBloque = materialBloque;
        this.rgb = rgb;
    }
}