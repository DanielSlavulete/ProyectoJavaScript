class Caja extends Componente{
    constructor(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW,forma,material,color,dimensiones,peso,ventiladoresIncluidos,gestionCables,rgb){
        super(id,nombre,descripcion,imagen,precio,marca,modelo,especificaciones,consumoW)
        this.forma = forma;
        this.material = material;
        this.color = color;
        this.dimensiones = dimensiones;
        this.peso = peso;
        this.ventiladoresIncluidos = ventiladoresIncluidos;
        this.gestionCables = gestionCables;
        this.rgb = rgb;
    }
}