class Auricular extends Periferico{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color,tipoAuricular,conexion,inalambrico,microfono,cancelacionRuido,peso,rgb,compatibilidad){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color)
        this.tipoAuricular = tipoAuricular;
        this.conexion = conexion;
        this.inalambrico = inalambrico;
        this.microfono = microfono;
        this.cancelacionRuido = cancelacionRuido;
        this.peso = peso;
        this.rgb = rgb;
        this.compatibilidad = compatibilidad; 
        }
    }
