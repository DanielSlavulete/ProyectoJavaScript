class Almacenamiento extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW,tipo,capacidad,velocidadLectura,velocidadEscritura,interfaz,peso,temperaturaMax){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.velocidadLectura = velocidadLectura;
        this.velocidadEscritura = velocidadEscritura;
        this.interfaz = interfaz;
        this.peso = peso;
        this.temperaturaMax = temperaturaMax;
    }
}