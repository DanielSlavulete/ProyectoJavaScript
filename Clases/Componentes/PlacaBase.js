class PlacaBase extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW,socket,chipset,factorForma,ramSoportada,numeroRanurasRam,ranurasPcie,wifi,bluetooth,tarjetaSonido){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.socket = socket;
        this.chipset = chipset;
        this.factorForma = factorForma;
        this.ramSoportada = ramSoportada;
        this.numeroRanurasRam = numeroRanurasRam;
        this.ranurasPcie = ranurasPcie;
        this.wifi = wifi;
        this.bluetooth = bluetooth;
        this.tarjetaSonido = tarjetaSonido;
    }
}