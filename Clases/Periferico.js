class Periferico extends Producto{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,conexion,color){
        super(id,nombre,descripcion,imagen,precio)
        this.marca = marca;
        this.modelo = modelo;
        this.tipo = tipo;
        this.conexion = conexion;
        this.color = color;
    }
}