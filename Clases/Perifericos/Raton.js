class Raton extends Periferico{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color,sensor, dpiMax, botones, peso, inalambrico, rgb){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color)
        this.sensor = sensor;
        this.dpiMax = dpiMax;
        this.botones = botones;
        this.peso = peso;
        this.inalambrico = inalambrico;
        this.rgb = rgb;
        }
    }
