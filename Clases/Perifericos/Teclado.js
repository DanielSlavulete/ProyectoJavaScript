class Teclado extends Periferico{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color,tipoSwitch, switchMarca,idioma,tamano,inalambrico,rbg,reposamunecas){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color)
        this.tipoSwitch = tipoSwitch;
        this.switchMarca = switchMarca;
        this.idioma = idioma;
        this.tamano = tamano;
        this.inalambrico = inalambrico;
        this.rgb = rgb;
        this.reposamunecas = reposamunecas;
        }
    }
