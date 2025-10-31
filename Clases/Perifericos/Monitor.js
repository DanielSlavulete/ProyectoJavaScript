class Monitor extends Periferico{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color,pulgadas,resolucion,relacionAspecto,curvatura,tipoPanel,tasaRefresco,tiempoRespuesta,puertos){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color)
        this.pulgadas = pulgadas;
        this.resolucion = resolucion;
        this.relacionAspecto = relacionAspecto;
        this.curvatura = curvatura;
        this.tipoPanel = tipoPanel;
        this.tasaRefresco = tasaRefresco;
        this.tiempoRespuesta = tiempoRespuesta;
        this.puertos = puertos;
        }
    }
