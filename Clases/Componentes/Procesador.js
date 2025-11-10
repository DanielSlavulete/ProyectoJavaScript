class Procesador extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW,socket,nucleos,hilos,frecuenciaBase,frecuenciaTurbo,cache){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.socket = socket;
        this.nucleos = nucleos;
        this.hilos = hilos;
        this.frecuenciaBase = frecuenciaBase;
        this.frecuenciaTurbo = frecuenciaTurbo;
        this.cache = cache;
    }
}