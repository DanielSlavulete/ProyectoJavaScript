 export class Producto{
    constructor(id,nombre,descripcion,imagen,precio,tipo,especificaciones={}){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.tipo = tipo;
        this.especificaciones = especificaciones
    }
}