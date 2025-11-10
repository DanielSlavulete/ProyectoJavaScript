class FuenteAlimentacion extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW,potenciaW,certificacion,modularidad,formato,conectores,rgb){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.potenciaW = potenciaW;
        this.certificacion = certificacion;
        this.modularidad = modularidad;
        this.formato = formato;
        this.conectores = conectores;
        this.rbg = rbg;
    }
}