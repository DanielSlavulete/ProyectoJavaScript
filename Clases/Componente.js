class Componente extends Producto{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,tipo,especificaciones,consumoW){
        super(id,nombre,descripcion,imagen,precio)
        this.marca = marca;
        this.modelo = modelo;
        this.tipo = tipo;
        this.especificaciones = especificaciones;
        this.consumoW = consumoW;
    }
}