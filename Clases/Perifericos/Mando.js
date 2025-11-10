class Mando extends Periferico{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color,inalambrico, analogico, vibracion, bateriaHoras, recargable, compatibilidad){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color)
        this.inalambrico = inalambrico;
        this.analogico = analogico;
        this.vibracion = vibracion;
        this.bateriaHoras = bateriaHoras
        this.recargable = recargable;
        this.compatibilidad = compatibilidad;
        }
    }
